import { getCurrentUser, loginUser, registerUser } from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Xử lý đăng ký tài khoản người dùng.
 */
export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, result, 'Dang ky tai khoan thanh cong.', 201);
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
    return sendSuccess(res, result, 'Dang nhap thanh cong.');
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
    return sendSuccess(res, result, 'Lay thong tin tai khoan thanh cong.');
  } catch (error) {
    return next(error);
  }
}
