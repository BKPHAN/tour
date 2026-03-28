import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/user/authService.js';

/**
 * Chặn các route cần đăng nhập và chuyển người dùng về trang login nếu chưa có token.
 */
function RequireAuth() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate replace state={{ redirectTo: `${location.pathname}${location.search}` }} to="/login" />;
  }

  return <Outlet />;
}

export default RequireAuth;
