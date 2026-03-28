import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { adminPortalRoles } from '../data/adminMockData.js';
import { getStoredAdminUser, isAdminAuthenticated } from '../services/adminAuthService.js';

/**
 * Chan cac route admin neu chua dang nhap, dong thoi ghi nho trang dich can quay lai.
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

  // Chot them theo role de chi admin va staff moi di duoc vao khu quan ly.
  if (!adminPortalRoles.includes(currentAdmin?.role)) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
}

export default RequireAdminAuth;
