import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { createUser, findUserByEmail, findUserById, findUserByLoginId } from '../models/userModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Loại bỏ các trường nhạy cảm trước khi trả user cho frontend.
 */
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * Tạo access token cho user đã đăng nhập thành công.
 */
function createAccessToken(user) {
  return jwt.sign({ userId: user.id }, env.jwtSecret, {
    expiresIn: env.accessTokenExpiresIn,
  });
}

/**
 * Tạo refresh token để cấp lại access token khi phiên làm việc còn hiệu lực.
 */
function createRefreshToken(user) {
  return jwt.sign({ userId: user.id }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpiresIn,
  });
}

/**
 * Gói toàn bộ token và thông tin user về một format thống nhất cho frontend.
 */
function buildAuthPayload(user) {
  return {
    refreshToken: createRefreshToken(user),
    token: createAccessToken(user),
    user: sanitizeUser(user),
  };
}

/**
 * Đăng ký tài khoản mới và trả về thông tin user kèm token đăng nhập.
 */
export async function registerUser(payload) {
  const { email, fullName, password, phone, username } = payload;

  if (!fullName || !email || !phone || !password) {
    throw new ApiError(400, 'Vui lòng cung cấp đầy đủ họ tên, email, số điện thoại và mật khẩu.');
  }

  if (findUserByEmail(email)) {
    throw new ApiError(409, 'Email này đã được sử dụng.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);
  const fallbackUsername = normalizedEmail.split('@')[0];
  const user = createUser({
    email: normalizedEmail,
    fullName: fullName.trim(),
    passwordHash,
    phone: phone.trim(),
    username: (username || fallbackUsername).trim().toLowerCase(),
  });

  return buildAuthPayload(user);
}

/**
 * Xác thực tài khoản bằng email hoặc username, sau đó trả về token.
 */
export async function loginUser(payload) {
  const { loginId, password } = payload;

  if (!loginId || !password) {
    throw new ApiError(400, 'Vui lòng nhập tên đăng nhập/email và mật khẩu.');
  }

  const user = findUserByLoginId(loginId);

  if (!user) {
    throw new ApiError(401, 'Thông tin đăng nhập không chính xác.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Thông tin đăng nhập không chính xác.');
  }

  return buildAuthPayload(user);
}

/**
 * Lấy thông tin user hiện tại dựa trên token đã xác thực.
 */
export function getCurrentUser(userId) {
  const user = findUserById(userId);

  if (!user) {
    throw new ApiError(404, 'Không tìm thấy tài khoản.');
  }

  return sanitizeUser(user);
}

/**
 * Xác thực refresh token rồi cấp lại cặp token mới cho frontend.
 */
export function refreshUserSession(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(400, 'Vui lòng cung cấp refresh token hợp lệ.');
  }

  try {
    const payload = jwt.verify(refreshToken, env.refreshTokenSecret);
    const user = findUserById(payload.userId);

    if (!user) {
      throw new ApiError(401, 'Tài khoản không tồn tại hoặc đã hết hiệu lực.');
    }

    return buildAuthPayload(user);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, 'Refresh token không hợp lệ hoặc đã hết hạn.');
  }
}
