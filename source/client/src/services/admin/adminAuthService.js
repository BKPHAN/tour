import { adminLoginAccounts, adminPortalRoles, normalizeRole } from '../../data/adminMockData.js';
import { clearStoredAdminAuth, getStoredAdminAuth, setStoredAdminAuth } from './adminAuthStorage.js';

/**
 * Tạo độ trễ nhỏ để form admin giống cảm giác đang gọi API thật.
 */
function wait(ms = 180) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Đăng nhập admin bằng tài khoản mock của giai đoạn 2 frontend.
 */
export async function loginAdmin(payload) {
  await wait();

  const loginId = payload.loginId.trim().toLowerCase();
  const password = payload.password.trim();
  const matchedAccount = adminLoginAccounts.find((account) => {
    const isMatchedLogin = loginId === account.loginId.toLowerCase() || loginId === account.email.toLowerCase();
    return isMatchedLogin && password === account.password;
  });

  if (!matchedAccount) {
    const error = new Error('Thông tin đăng nhập không hợp lệ hoặc tài khoản không có quyền vào trang quản lý.');
    error.status = 401;
    throw error;
  }

  const authData = {
    token: `mock-${matchedAccount.role}-token`,
    user: {
      id: matchedAccount.id,
      fullName: matchedAccount.fullName,
      email: matchedAccount.email,
      role: normalizeRole(matchedAccount.role),
      title: matchedAccount.title,
    },
  };

  setStoredAdminAuth(authData);
  return authData;
}

/**
 * Kiểm tra admin đã có session đăng nhập trên frontend hay chưa.
 */
export function isAdminAuthenticated() {
  const authData = getStoredAdminAuth();
  const currentRole = normalizeRole(authData?.user?.role);
  return Boolean(authData?.token) && adminPortalRoles.includes(currentRole);
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
 * Xóa session admin hiện tại.
 */
export function logoutAdmin() {
  clearStoredAdminAuth();
}
