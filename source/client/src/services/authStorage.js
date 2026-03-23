const AUTH_STORAGE_KEY = 'tourflow-auth';
const AUTH_EVENT_NAME = 'tourflow-auth-changed';

/**
 * Đọc thông tin đăng nhập hiện tại từ localStorage.
 */
export function getStoredAuth() {
  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

/**
 * Lấy token hiện tại để gắn vào header Authorization khi gọi API.
 */
export function getAccessToken() {
  return getStoredAuth()?.token || '';
}

/**
 * Lưu token và user sau khi đăng nhập hoặc đăng ký thành công.
 */
export function setStoredAuth(authData) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

/**
 * Xóa trạng thái đăng nhập hiện tại.
 */
export function clearStoredAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

/**
 * Tên event dùng để các component đồng bộ lại trạng thái auth trong cùng tab.
 */
export function getAuthEventName() {
  return AUTH_EVENT_NAME;
}
