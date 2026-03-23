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
 * Tạo JWT cho user đã đăng nhập thành công.
 */
function createToken(user) {
  return jwt.sign({ userId: user.id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
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

  return {
    token: createToken(user),
    user: sanitizeUser(user),
  };
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

  return {
    token: createToken(user),
    user: sanitizeUser(user),
  };
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
