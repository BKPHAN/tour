import { generatePaymentId, mockDatabase } from '../config/mockDatabase.js';

/**
 * Tìm payment theo booking id.
 */
export function findPaymentByBookingId(bookingId) {
  return mockDatabase.payments.find((payment) => payment.bookingId === bookingId) || null;
}

/**
 * Tạo payment record mới cho booking.
 */
export function createPayment(payload) {
  const payment = {
    id: generatePaymentId(),
    ...payload,
  };

  mockDatabase.payments.unshift(payment);
  return payment;
}

/**
 * Cập nhật trạng thái payment hiện có.
 */
export function updatePayment(bookingId, updates) {
  const payment = findPaymentByBookingId(bookingId);

  if (!payment) {
    return null;
  }

  Object.assign(payment, updates);
  return payment;
}
