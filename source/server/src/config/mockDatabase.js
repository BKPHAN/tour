import { hashSync } from 'bcryptjs';
import {
  bookingHistory as seedBookings,
  testimonials as seedTestimonials,
  tours as seedTours,
} from '../../../client/src/data/mockData.js';

/**
 * Clone object để các thao tác backend không mutate trực tiếp dữ liệu seed từ frontend.
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const defaultUserId = 'USR-001';

const users = [
  {
    id: defaultUserId,
    fullName: 'Nguyen Demo',
    email: 'demo@tourflow.local',
    phone: '0900000000',
    username: 'demo',
    passwordHash: hashSync('123456', 10),
    createdAt: '2026-03-23T09:00:00.000Z',
  },
];

const tours = clone(seedTours);
const bookings = clone(seedBookings).map((booking) => ({
  ...booking,
  userId: defaultUserId,
}));
const payments = bookings.map((booking, index) => ({
  id: `PAY-2026-${String(index + 1).padStart(3, '0')}`,
  bookingId: booking.id,
  userId: booking.userId,
  amount: booking.totalPrice,
  method: booking.paymentMethod,
  status: booking.paymentStatus,
  paidAt: booking.paymentStatus === 'paid' ? `${booking.bookedAt}T09:30:00.000Z` : null,
}));
const testimonials = clone(seedTestimonials);

let userCounter = users.length + 1;
let bookingCounter = bookings.length + 1;
let paymentCounter = payments.length + 1;

/**
 * Sinh id mới cho user để mô phỏng auto increment ở tầng database.
 */
export function generateUserId() {
  return `USR-${String(userCounter++).padStart(3, '0')}`;
}

/**
 * Sinh mã booking mới theo cùng pattern với dữ liệu seed hiện có.
 */
export function generateBookingId() {
  return `BK-2026-${String(bookingCounter++).padStart(3, '0')}`;
}

/**
 * Sinh mã payment mới cho bản ghi thanh toán.
 */
export function generatePaymentId() {
  return `PAY-2026-${String(paymentCounter++).padStart(3, '0')}`;
}

/**
 * Dữ liệu mock đóng vai trò như một in-memory database trong giai đoạn backend đầu tiên.
 */
export const mockDatabase = {
  bookings,
  payments,
  testimonials,
  tours,
  users,
};
