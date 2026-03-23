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
      detail: `He thong da tam giu cho cho ${travelers} hanh khach.`,
      time: now,
      title: 'Yeu cau dat tour da duoc tao',
    },
    {
      detail: 'Can hoan tat thanh toan de khoa cho chinh thuc.',
      time: now,
      title: 'Cho thanh toan',
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
    throw new ApiError(400, 'Vui long chon tour, lich khoi hanh va so luong hanh khach hop le.');
  }

  const tour = findTourById(tourId);
  const departure = findDepartureById(tourId, departureId);

  if (!tour || !departure) {
    throw new ApiError(404, 'Tour hoac lich khoi hanh khong ton tai.');
  }

  if (departure.slots < travelerCount) {
    throw new ApiError(400, 'So cho con lai khong du cho lua chon cua ban.');
  }

  reserveDepartureSlots(tourId, departureId, travelerCount);

  return createBooking({
    bookedAt: new Date().toISOString().slice(0, 10),
    customerEmail: (email || user.email).trim().toLowerCase(),
    customerName: (fullName || user.fullName).trim(),
    customerPhone: (phone || user.phone).trim(),
    departureDate: departure.date,
    departureId,
    notes: (note || '').trim() || 'Khong co ghi chu them.',
    paymentMethod: paymentMethod || 'Chua thanh toan',
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
    throw new ApiError(404, 'Khong tim thay booking.');
  }

  if (booking.status === 'cancelled' || booking.status === 'completed') {
    throw new ApiError(400, 'Booking nay khong the huy.');
  }

  releaseDepartureSlots(booking.tourId, booking.departureId, booking.travelers);

  return updateBooking(bookingId, userId, {
    paymentStatus: booking.paymentStatus === 'paid' ? 'refunded' : booking.paymentStatus,
    status: 'cancelled',
    timeline: [
      ...booking.timeline,
      {
        detail: 'Booking da duoc huy tu phia nguoi dung.',
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        title: 'Da huy booking',
      },
    ],
  });
}
