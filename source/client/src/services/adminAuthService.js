import { adminLoginAccounts, adminPortalRoles, normalizeRole } from '../data/adminMockData.js';
import { clearStoredAdminAuth, getStoredAdminAuth, setStoredAdminAuth } from './adminAuthStorage.js';

/**
 * Tao do tre nho de form admin giong cam giac dang goi API that.
 */
function wait(ms = 180) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Dang nhap admin bang tai khoan mock cua giai doan 2 frontend.
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
    const error = new Error('Thong tin dang nhap khong hop le hoac tai khoan khong co quyen vao trang quan ly.');
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
 * Kiem tra admin da co session dang nhap tren frontend hay chua.
 */
export function isAdminAuthenticated() {
  const authData = getStoredAdminAuth();
  const currentRole = normalizeRole(authData?.user?.role);
  return Boolean(authData?.token) && adminPortalRoles.includes(currentRole);
}

/**
 * Tra ve thong tin admin dang dang nhap de hien thi o layout.
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
 * Xoa session admin hien tai.
 */
export function logoutAdmin() {
  clearStoredAdminAuth();
}
