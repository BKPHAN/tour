import { getPaymentDetail, payForBooking } from '../services/paymentService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * `GET /payments/:bookingId`
 */
export async function getPayment(req, res, next) {
  try {
    const result = await getPaymentDetail(req.user.id, req.params.bookingId);
    return sendSuccess(res, result, 'Lấy thông tin thanh toán thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * `POST /payments`
 */
export async function createPayment(req, res, next) {
  try {
    const result = await payForBooking(req.user.id, req.body);
    return sendSuccess(res, result, 'Thanh toán booking thành công.', 201);
  } catch (error) {
    return next(error);
  }
}
