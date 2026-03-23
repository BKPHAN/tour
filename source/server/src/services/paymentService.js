import { findBookingByIdAndUserId, updateBooking } from '../models/bookingModel.js';
import { createPayment, findPaymentByBookingId, updatePayment } from '../models/paymentModel.js';
import { findTourById } from '../models/tourModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Lấy thông tin thanh toán của booking để hiển thị ở bước checkout.
 */
export function getPaymentDetail(userId, bookingId) {
  const booking = findBookingByIdAndUserId(bookingId, userId);

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  return {
    booking,
    payment: findPaymentByBookingId(bookingId),
    tour: findTourById(booking.tourId),
  };
}

/**
 * Xác nhận thanh toán cho booking và cập nhật cả payment lẫn booking.
 */
export function payForBooking(userId, payload) {
  const { bookingId, cardName, cardNumber, method } = payload;
  const booking = findBookingByIdAndUserId(bookingId, userId);

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  if (booking.paymentStatus === 'paid') {
    throw new ApiError(400, 'Booking này đã được thanh toán.');
  }

  if (!method || !cardName || !cardNumber) {
    throw new ApiError(400, 'Vui lòng nhập đầy đủ thông tin thanh toán.');
  }

  const paymentUpdates = {
    amount: booking.totalPrice,
    bookingId,
    cardName: cardName.trim(),
    cardNumber: cardNumber.trim().slice(-4),
    method,
    paidAt: new Date().toISOString(),
    status: 'paid',
    userId,
  };

  const payment = findPaymentByBookingId(bookingId)
    ? updatePayment(bookingId, paymentUpdates)
    : createPayment(paymentUpdates);

  const updatedBooking = updateBooking(bookingId, userId, {
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
  });

  return {
    booking: updatedBooking,
    payment,
    tour: findTourById(updatedBooking.tourId),
  };
}
