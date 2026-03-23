import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { findUserById } from '../models/userModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Xác thực JWT và gắn user hiện tại vào request cho các route cần đăng nhập.
 */
export function authenticate(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Bạn cần đăng nhập để sử dụng tính năng này.'));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = findUserById(payload.userId);

    if (!user) {
      return next(new ApiError(401, 'Tài khoản không tồn tại hoặc đã hết hiệu lực.'));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Token không hợp lệ hoặc đã hết hạn.'));
  }
}
