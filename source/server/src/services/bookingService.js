import { createBooking, findBookingByIdAndUserId, findBookingsByUserId, updateBooking } from '../models/bookingModel.js';
import { findDepartureById, findTourById, releaseDepartureSlots, reserveDepartureSlots } from '../models/tourModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Tạo timeline mặc định khi người dùng vừa đặt tour.
 */
function createInitialTimeline(travelers) {
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

  return [
    {
      detail: `Hệ thống đã tạm giữ chỗ cho ${travelers} hành khách.`,
      time: now,
      title: 'Yêu cầu đặt tour đã được tạo',
    },
    {
      detail: 'Cần hoàn tất thanh toán để khóa chỗ chính thức.',
      time: now,
      title: 'Chờ thanh toán',
    },
  ];
}

/**
 * Lấy toàn bộ booking của user hiện tại.
 */
export function getUserBookings(userId) {
  return findBookingsByUserId(userId);
}

/**
 * Lấy chi tiết booking thuộc về user hiện tại.
 */
export function getUserBookingDetail(userId, bookingId) {
  const booking = findBookingByIdAndUserId(bookingId, userId);

  if (!booking) {
    throw new ApiError(404, 'Khong tim thay booking.');
  }

  return booking;
}

/**
 * Tạo booking mới, kiểm tra lịch khởi hành và trừ số chỗ còn lại.
 */
export function createUserBooking(user, payload) {
  const { departureId, email, fullName, note, paymentMethod, phone, tourId, travelers } = payload;
  const travelerCount = Number(travelers);

  if (!tourId || !departureId || !travelerCount || travelerCount < 1) {
    throw new ApiError(400, 'Vui lòng chọn tour, lịch khởi hành và số lượng hành khách hợp lệ.');
  }

  const tour = findTourById(tourId);
  const departure = findDepartureById(tourId, departureId);

  if (!tour || !departure) {
    throw new ApiError(404, 'Tour hoặc lịch khởi hành không tồn tại.');
  }

  if (departure.slots < travelerCount) {
    throw new ApiError(400, 'Số chỗ còn lại không đủ cho lựa chọn của bạn.');
  }

  reserveDepartureSlots(tourId, departureId, travelerCount);

  return createBooking({
    bookedAt: new Date().toISOString().slice(0, 10),
    customerEmail: (email || user.email).trim().toLowerCase(),
    customerName: (fullName || user.fullName).trim(),
    customerPhone: (phone || user.phone).trim(),
    departureDate: departure.date,
    departureId,
    notes: (note || '').trim() || 'Không có ghi chú thêm.',
    paymentMethod: paymentMethod || 'Chưa thanh toán',
    paymentStatus: 'waiting',
    status: 'pending',
    timeline: createInitialTimeline(travelerCount),
    totalPrice: departure.price * travelerCount,
    tourId,
    travelers: travelerCount,
    userId: user.id,
  });
}

/**
 * Hủy booking nếu trạng thái hiện tại vẫn cho phép thay đổi.
 */
export function cancelUserBooking(userId, bookingId) {
  const booking = findBookingByIdAndUserId(bookingId, userId);

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  if (booking.status === 'cancelled' || booking.status === 'completed') {
    throw new ApiError(400, 'Booking này không thể hủy.');
  }

  releaseDepartureSlots(booking.tourId, booking.departureId, booking.travelers);

  return updateBooking(bookingId, userId, {
    paymentStatus: booking.paymentStatus === 'paid' ? 'refunded' : booking.paymentStatus,
    status: 'cancelled',
    timeline: [
      ...booking.timeline,
      {
        detail: 'Booking đã được hủy từ phía người dùng.',
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        title: 'Đã hủy booking',
      },
    ],
  });
}
