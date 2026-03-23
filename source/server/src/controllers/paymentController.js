import { getPaymentDetail, payForBooking } from '../services/paymentService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Trả dữ liệu thanh toán của một booking.
 */
export function getPayment(req, res, next) {
  try {
    const result = getPaymentDetail(req.user.id, req.params.bookingId);
    return sendSuccess(res, result, 'Lấy thông tin thanh toán thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Xác nhận thanh toán và cập nhật booking.
 */
export function createPayment(req, res, next) {
  try {
    const result = payForBooking(req.user.id, req.body);
    return sendSuccess(res, result, 'Thanh toán booking thành công.', 201);
  } catch (error) {
    return next(error);
  }
}
