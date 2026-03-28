const ADMIN_AUTH_STORAGE_KEY = 'tourflow-admin-auth';
const ADMIN_AUTH_EVENT_NAME = 'tourflow-admin-auth-changed';

/**
 * Doc session dang nhap cua admin tu localStorage.
 */
export function getStoredAdminAuth() {
  const rawValue = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    return null;
  }
}

/**
 * Luu session admin va phat event de layout dong bo giao dien ngay lap tuc.
 */
export function setStoredAdminAuth(authData) {
  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(authData));
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT_NAME));
}

/**
 * Xoa session admin khi dang xuat khoi khu vuc quan tri.
 */
export function clearStoredAdminAuth() {
  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT_NAME));
}

/**
 * Ten event dung de cac component admin lang nghe thay doi session.
 */
export function getAdminAuthEventName() {
  return ADMIN_AUTH_EVENT_NAME;
}
