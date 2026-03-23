import { getAccessToken } from './authStorage.js';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Gọi API backend theo một format thống nhất và tự động gắn token nếu có.
 */
export async function apiRequest(path, options = {}) {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  const responseData = await response.json().catch(() => ({
    message: 'Khong doc duoc phan hoi tu server.',
    success: false,
  }));

  if (!response.ok || responseData.success === false) {
    const error = new Error(responseData.message || 'Yeu cau that bai.');
    error.status = response.status;
    error.details = responseData.details || null;
    throw error;
  }

  return responseData.data;
}
