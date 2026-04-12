import { apiRequest } from '../user/apiClient.js';
import { clearStoredAuth, setStoredAuth } from '../user/authStorage.js';
import { clearStoredAdminAuth, getStoredAdminAuth, setStoredAdminAuth } from './adminAuthStorage.js';

const ADMIN_PORTAL_ROLES = ['admin', 'staff'];

/**
 * Auth admin dùng chung payload login với khu user,
 * nhưng giữ thêm một lớp session riêng cho route `/admin`
 * để UI quản trị có thể kiểm soát guard và layout độc lập.
 */

/**
 * Chuẩn hóa role cũ về bộ role mới để các session lưu từ bản trước không làm lệch route guard.
 */
function normalizeRole(role) {
  if (role === 'customer') {
    return 'user';
  }

  if (role === 'admin' || role === 'staff' || role === 'user') {
    return role;
  }

  return 'user';
}

/**
 * Kiểm tra một role có được phép đi vào khu vực quản trị hay không.
 */
export function isAdminPortalRole(role) {
  return ADMIN_PORTAL_ROLES.includes(normalizeRole(role));
}

/**
 * Đồng bộ session admin từ auth payload thật của backend để route `/admin` dùng chung đúng token hiện tại.
 */
export function syncAdminSession(authData) {
  const currentRole = normalizeRole(authData?.user?.role);

  if (!authData?.token || !isAdminPortalRole(currentRole)) {
    clearStoredAdminAuth();
    return null;
  }

  setStoredAdminAuth({
    refreshToken: authData.refreshToken,
    token: authData.token,
    user: {
      ...authData.user,
      role: currentRole,
      title: currentRole === 'admin' ? 'Quản trị hệ thống' : 'Nhân viên vận hành',
    },
  });

  return authData;
}

/**
 * Đăng nhập admin bằng tài khoản thật từ backend, sau đó đồng bộ cả phiên user và phiên admin.
 */
export async function loginAdmin(payload) {
  const authData = await apiRequest('/auth/login', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  setStoredAuth(authData);
  syncAdminSession(authData);
  return authData;
}

/**
 * Kiểm tra admin đã có session đăng nhập trên frontend hay chưa.
 */
export function isAdminAuthenticated() {
  const authData = getStoredAdminAuth();
  const currentRole = normalizeRole(authData?.user?.role);
  return Boolean(authData?.token) && isAdminPortalRole(currentRole);
}

/**
 * Trả về thông tin admin đang đăng nhập để hiển thị ở layout.
 */
export function getStoredAdminUser() {
  const storedUser = getStoredAdminAuth()?.user;

  if (!storedUser) {
    return null;
  }

  return {
    ...storedUser,
    role: normalizeRole(storedUser.role),
  };
}

/**
 * Xóa cả session admin và session auth chung khi đăng xuất khỏi khu vực quản trị.
 */
export function logoutAdmin() {
  clearStoredAdminAuth();
  clearStoredAuth();
}
