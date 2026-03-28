import { withTransaction } from '../config/database.js';
import { findBookingByIdAndUserId, updateBooking } from '../models/bookingModel.js';
import {
  createPayment,
  findPaymentByBookingId,
  updatePayment,
} from '../models/paymentModel.js';
import { findTourById } from '../models/tourModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Loại bỏ các field nội bộ DB trước khi trả booking về frontend.
 */
function stripBookingInternals(booking) {
  if (!booking) {
    return booking;
  }

  const { _bookingDbId, _departureDbId, _userDbId, ...publicBooking } = booking;
  return publicBooking;
}

/**
 * Trang payment cần `booking + payment + tour` trong cùng một response.
 */
export async function getPaymentDetail(userId, bookingId) {
  const booking = await findBookingByIdAndUserId(bookingId, userId, { includeInternal: true });

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  return {
    booking: stripBookingInternals(booking),
    payment: await findPaymentByBookingId(booking._bookingDbId),
    tour: await findTourById(booking.tourId),
  };
}

/**
 * Luồng thanh toán:
 * 1. lock transaction
 * 2. đọc booking
 * 3. tạo hoặc cập nhật payment
 * 4. cập nhật booking và timeline
 * 5. trả về state mới nhất cho frontend
 */
export async function payForBooking(userId, payload) {
  const { bookingId, cardName, cardNumber, method } = payload;

  return withTransaction(async (connection) => {
    const booking = await findBookingByIdAndUserId(
      bookingId,
      userId,
      { includeInternal: true },
      connection,
    );

    if (!booking) {
      throw new ApiError(404, 'Không tìm thấy booking.');
    }

    if (booking.paymentStatus === 'paid') {
      throw new ApiError(400, 'Booking này đã được thanh toán.');
    }

    if (!method || !cardName || !cardNumber) {
      throw new ApiError(400, 'Vui lòng nhập đầy đủ thông tin thanh toán.');
    }

    const paymentData = {
      amount: booking.totalPrice,
      bookingId: booking._bookingDbId,
      cardLast4: cardNumber.trim().slice(-4),
      cardName: cardName.trim(),
      method,
      paidAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'paid',
      userId,
    };

    const currentPayment = await findPaymentByBookingId(booking._bookingDbId, connection, {
      includeInternal: true,
    });
    const payment = currentPayment
      ? await updatePayment(
          currentPayment._paymentDbId,
          {
            amount: paymentData.amount,
            cardLast4: paymentData.cardLast4,
            cardName: paymentData.cardName,
            method: paymentData.method,
            paidAt: paymentData.paidAt,
            status: paymentData.status,
          },
          connection,
        )
      : await createPayment(paymentData, connection);

    const updatedBooking = await updateBooking(
      booking._bookingDbId,
      {
        paymentMethod: method,
        paymentStatus: 'paid',
        status: 'confirmed',
        timeline: [
          ...booking.timeline,
          {
            detail: `Khách đã thanh toán bằng ${method}.`,
            time: new Date().toISOString().slice(0, 16).replace('T', ' '),
            title: 'Thanh toán hoàn tất',
          },
          {
            detail: 'Booking đã được chuyển sang trạng thái đã xác nhận.',
            time: new Date().toISOString().slice(0, 16).replace('T', ' '),
            title: 'Đã xác nhận lịch khởi hành',
          },
        ],
      },
      connection,
    );

    return {
      booking: updatedBooking,
      payment,
      tour: await findTourById(updatedBooking.tourId, connection),
    };
  });
}
