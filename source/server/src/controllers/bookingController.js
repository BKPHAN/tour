import { cancelUserBooking, createUserBooking, getUserBookingDetail, getUserBookings } from '../services/bookingService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Trả danh sách booking của user hiện tại.
 */
export function listBookings(req, res, next) {
  try {
    const bookings = getUserBookings(req.user.id);
    return sendSuccess(res, bookings, 'Lấy lịch sử booking thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả chi tiết một booking của user hiện tại.
 */
export function getBooking(req, res, next) {
  try {
    const booking = getUserBookingDetail(req.user.id, req.params.bookingId);
    return sendSuccess(res, booking, 'Lấy chi tiết booking thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Tạo booking mới từ thông tin đặt tour do frontend gửi lên.
 */
export function createBooking(req, res, next) {
  try {
    const booking = createUserBooking(req.user, req.body);
    return sendSuccess(res, booking, 'Tạo booking thành công.', 201);
  } catch (error) {
    return next(error);
  }
}

/**
 * Hủy booking nếu trạng thái hiện tại còn cho phép.
 */
export function cancelBooking(req, res, next) {
  try {
    const booking = cancelUserBooking(req.user.id, req.params.bookingId);
    return sendSuccess(res, booking, 'Hủy booking thành công.');
  } catch (error) {
    return next(error);
  }
}
