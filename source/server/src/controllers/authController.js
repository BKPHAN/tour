import {
  getCurrentUser,
  loginUser,
  refreshUserSession,
  registerUser,
} from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Nhận request đăng ký và ủy quyền xử lý cho auth service.
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
 * Nhận request đăng nhập và trả về auth payload cho frontend.
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
 * Endpoint làm mới session khi access token hết hạn.
 */
export async function refreshToken(req, res, next) {
  try {
    const result = await refreshUserSession(req.body.refreshToken);
    return sendSuccess(res, result, 'Làm mới phiên đăng nhập thành công.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả profile user hiện tại dựa trên `req.user` đã được middleware xác thực.
 */
export async function getProfile(req, res, next) {
  try {
    const result = await getCurrentUser(req.user.id);
    return sendSuccess(res, result, 'Lấy thông tin tài khoản thành công.');
  } catch (error) {
    return next(error);
  }
}
