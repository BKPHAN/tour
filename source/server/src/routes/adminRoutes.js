import { Router } from 'express';
import {
  createAdminTour,
  getAdminMeta,
  getAdminBooking,
  getAdminPayment,
  getAdminTour,
  getAdminUser,
  listAdminBookings,
  listAdminPayments,
  listAdminTours,
  listAdminUsers,
  refundAdminPayment,
  removeAdminBooking,
  removeAdminTour,
  removeAdminUser,
  updateAdminBookingStatus,
  updateAdminPaymentStatus,
  updateAdminTour,
  updateAdminUser,
} from '../controllers/adminController.js';
import { authorizeAdmin } from '../middlewares/adminMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const adminRouter = Router();

/**
 * Toàn bộ route trong file này đều yêu cầu:
 * - người dùng đã đăng nhập hợp lệ
 * - role thuộc nhóm quản trị (`admin`, `staff`)
 */
adminRouter.use(authenticate, authorizeAdmin);

// Metadata dùng chung cho các select/filter của frontend admin.
adminRouter.get('/meta', getAdminMeta);

// Người dùng
adminRouter.get('/users', listAdminUsers);
adminRouter.get('/users/:userId', getAdminUser);
adminRouter.put('/users/:userId', updateAdminUser);
adminRouter.delete('/users/:userId', removeAdminUser);

// Tour
adminRouter.get('/tours', listAdminTours);
adminRouter.get('/tours/:tourId', getAdminTour);
adminRouter.post('/tours', createAdminTour);
adminRouter.put('/tours/:tourId', updateAdminTour);
adminRouter.delete('/tours/:tourId', removeAdminTour);

// Booking
adminRouter.get('/bookings', listAdminBookings);
adminRouter.get('/bookings/:bookingCode', getAdminBooking);
adminRouter.put('/bookings/:bookingCode/status', updateAdminBookingStatus);
adminRouter.delete('/bookings/:bookingCode', removeAdminBooking);

// Payment
adminRouter.get('/payments', listAdminPayments);
adminRouter.get('/payments/:paymentCode', getAdminPayment);
adminRouter.put('/payments/:paymentCode/status', updateAdminPaymentStatus);
adminRouter.post('/payments/refund/:paymentCode', refundAdminPayment);

export default adminRouter;
