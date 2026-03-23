import { generateBookingId, mockDatabase } from '../config/mockDatabase.js';

/**
 * Lấy danh sách booking theo user id.
 */
export function findBookingsByUserId(userId) {
  return mockDatabase.bookings.filter((booking) => booking.userId === userId);
}

/**
 * Tìm booking theo id và user sở hữu booking đó.
 */
export function findBookingByIdAndUserId(bookingId, userId) {
  return (
    mockDatabase.bookings.find(
      (booking) => booking.id === bookingId && booking.userId === userId,
    ) || null
  );
}

/**
 * Tạo booking mới trong bộ nhớ tạm.
 */
export function createBooking(payload) {
  const booking = {
    id: generateBookingId(),
    ...payload,
  };

  mockDatabase.bookings.unshift(booking);
  return booking;
}

/**
 * Cập nhật dữ liệu booking đang có.
 */
export function updateBooking(bookingId, userId, updates) {
  const booking = findBookingByIdAndUserId(bookingId, userId);

  if (!booking) {
    return null;
  }

  Object.assign(booking, updates);
  return booking;
}
