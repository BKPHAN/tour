import { ApiError } from '../utils/apiError.js';

const ADMIN_PORTAL_ROLES = ['admin', 'staff'];

/**
 * Middleware này là cổng cuối trước admin API.
 * Dù frontend đã có route guard, backend vẫn phải tự kiểm tra lại để đảm bảo an toàn.
 */

/**
 * Chặn người dùng thường truy cập khu vực admin, chỉ cho phép tài khoản quản trị hoặc vận hành đi tiếp.
 */
export function authorizeAdmin(req, res, next) {
  if (!req.user) {
    return next(new ApiError(401, 'Bạn cần đăng nhập để truy cập khu vực quản trị.'));
  }

  if (req.user.status !== 'active') {
    return next(new ApiError(403, 'Tài khoản hiện không ở trạng thái hoạt động để vào khu quản trị.'));
  }

  if (!ADMIN_PORTAL_ROLES.includes(req.user.role)) {
    return next(new ApiError(403, 'Bạn không có quyền truy cập khu vực quản trị.'));
  }

  return next();
}
