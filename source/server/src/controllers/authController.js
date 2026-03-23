import { getCurrentUser, loginUser, registerUser } from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Xử lý đăng ký tài khoản người dùng.
 */
export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, result, 'Đăng ký tài khoản thành công.', 201);
  } catch (error) {
    return next(error);
  }
}

/**
 * Xử lý đăng nhập bằng email hoặc username.
 */
export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, result, 'Đăng nhập thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả về thông tin user hiện tại từ token.
 */
export function getProfile(req, res, next) {
  try {
    const result = getCurrentUser(req.user.id);
    return sendSuccess(res, result, 'Lấy thông tin tài khoản thành công.');
  } catch (error) {
    return next(error);
  }
}
