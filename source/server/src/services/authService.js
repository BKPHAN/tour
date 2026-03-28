import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByLoginId,
  findUserByUsername,
} from '../models/userModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Không trả password hash về frontend.
 */
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * Access token được dùng để gọi API user-facing.
 */
function createAccessToken(user) {
  return jwt.sign({ userId: user.id }, env.jwtSecret, {
    expiresIn: env.accessTokenExpiresIn,
  });
}

/**
 * Refresh token dùng để xin cấp lại access token khi phiên còn hiệu lực.
 */
function createRefreshToken(user) {
  return jwt.sign({ userId: user.id }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpiresIn,
  });
}

/**
 * Đồng bộ format auth response sau login/register/refresh.
 */
function buildAuthPayload(user) {
  return {
    refreshToken: createRefreshToken(user),
    token: createAccessToken(user),
    user: sanitizeUser(user),
  };
}

/**
 * Chuyển lỗi unique key từ MySQL thành message thân thiện hơn cho frontend.
 */
function mapUserWriteError(error) {
  if (error?.code !== 'ER_DUP_ENTRY') {
    throw error;
  }

  const message = String(error.sqlMessage || error.message || '');

  if (message.includes('uq_users_email')) {
    throw new ApiError(409, 'Email này đã được sử dụng.');
  }

  if (message.includes('uq_users_username')) {
    throw new ApiError(409, 'Tên đăng nhập này đã được sử dụng.');
  }

  if (message.includes('uq_users_phone')) {
    throw new ApiError(409, 'Số điện thoại này đã được sử dụng.');
  }

  throw new ApiError(409, 'Thông tin tài khoản đã tồn tại trong hệ thống.');
}

/**
 * Đăng ký user mới trong DB, validate duplicate trước và sau khi insert.
 */
export async function registerUser(payload) {
  const { email, fullName, password, phone, username } = payload;

  if (!fullName || !email || !phone || !password) {
    throw new ApiError(400, 'Vui lòng cung cấp đầy đủ họ tên, email, số điện thoại và mật khẩu.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = (username || normalizedEmail.split('@')[0]).trim().toLowerCase();

  if (await findUserByEmail(normalizedEmail)) {
    throw new ApiError(409, 'Email này đã được sử dụng.');
  }

  if (await findUserByUsername(normalizedUsername)) {
    throw new ApiError(409, 'Tên đăng nhập này đã được sử dụng.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await createUser({
      email: normalizedEmail,
      fullName: fullName.trim(),
      passwordHash,
      phone: phone.trim(),
      role: 'user',
      username: normalizedUsername,
    });

    return buildAuthPayload(user);
  } catch (error) {
    mapUserWriteError(error);
  }
}

/**
 * Đăng nhập bằng email hoặc username, sau đó trả về cặp token mới.
 */
export async function loginUser(payload) {
  const { loginId, password } = payload;

  if (!loginId || !password) {
    throw new ApiError(400, 'Vui lòng nhập tên đăng nhập/email và mật khẩu.');
  }

  const user = await findUserByLoginId(loginId);

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
 * Lấy profile user hiện tại từ DB để route `/auth/me` không phụ thuộc localStorage.
 */
export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, 'Không tìm thấy tài khoản.');
  }

  return sanitizeUser(user);
}

/**
 * Xác thực refresh token và cấp lại trọn bộ session token cho frontend.
 */
export async function refreshUserSession(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(400, 'Vui lòng cung cấp refresh token hợp lệ.');
  }

  try {
    const payload = jwt.verify(refreshToken, env.refreshTokenSecret);
    const user = await findUserById(payload.userId);

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
