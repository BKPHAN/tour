import { mockDatabase, generateUserId } from '../config/mockDatabase.js';

/**
 * Tìm user theo id.
 */
export function findUserById(userId) {
  return mockDatabase.users.find((user) => user.id === userId) || null;
}

/**
 * Tìm user theo email hoặc username để phục vụ đăng nhập.
 */
export function findUserByLoginId(loginId) {
  const normalizedLoginId = String(loginId || '').toLowerCase();

  return (
    mockDatabase.users.find(
      (user) =>
        user.email.toLowerCase() === normalizedLoginId ||
        user.username.toLowerCase() === normalizedLoginId,
    ) || null
  );
}

/**
 * Kiểm tra email đã tồn tại hay chưa.
 */
export function findUserByEmail(email) {
  const normalizedEmail = String(email || '').toLowerCase();
  return mockDatabase.users.find((user) => user.email.toLowerCase() === normalizedEmail) || null;
}

/**
 * Tạo user mới trong bộ nhớ tạm.
 */
export function createUser(payload) {
  const user = {
    id: generateUserId(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  mockDatabase.users.push(user);
  return user;
}
