import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { adminPortalRoles } from '../data/adminMockData.js';
import { getStoredAdminUser, isAdminAuthenticated } from '../services/admin/adminAuthService.js';

/**
 * Chặn các route admin nếu chưa đăng nhập, đồng thời ghi nhớ trang đích cần quay lại.
 */
function RequireAdminAuth() {
  const location = useLocation();
  const currentAdmin = getStoredAdminUser();

  if (!isAdminAuthenticated()) {
    return (
      <Navigate
        replace
        state={{ redirectTo: `${location.pathname}${location.search}` }}
        to="/admin/login"
      />
    );
  }

  // Chốt thêm theo role để chỉ admin và staff mới đi được vào khu quản lý.
  if (!adminPortalRoles.includes(currentAdmin?.role)) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
}

export default RequireAdminAuth;
