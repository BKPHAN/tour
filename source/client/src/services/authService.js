import { apiRequest } from './apiClient.js';
import { clearStoredAuth, getStoredAuth, setStoredAuth } from './authStorage.js';

/**
 * Đăng nhập bằng email hoặc username và lưu phiên làm việc vào localStorage.
 */
export async function login(payload) {
  const authData = await apiRequest('/auth/login', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  setStoredAuth(authData);
  return authData;
}

/**
 * Đăng ký tài khoản mới rồi lưu luôn phiên đăng nhập vừa tạo.
 */
export async function register(payload) {
  const authData = await apiRequest('/auth/register', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  setStoredAuth(authData);
  return authData;
}

/**
 * Lấy thông tin user hiện tại từ backend để đồng bộ trạng thái phiên.
 */
export async function getCurrentUser() {
  return apiRequest('/auth/me');
}

/**
 * Kiểm tra frontend có token đăng nhập hay chưa.
 */
export function isAuthenticated() {
  return Boolean(getStoredAuth()?.token);
}

/**
 * Trả user hiện đang lưu ở localStorage.
 */
export function getStoredUser() {
  return getStoredAuth()?.user || null;
}

/**
 * Xóa phiên đăng nhập hiện tại.
 */
export function logout() {
  clearStoredAuth();
}
