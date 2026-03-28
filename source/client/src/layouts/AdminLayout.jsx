import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { getStoredAdminUser, logoutAdmin } from '../services/admin/adminAuthService.js';
import { getAdminAuthEventName } from '../services/admin/adminAuthStorage.js';
import { applyTheme, DARK_THEME, getInitialTheme, LIGHT_THEME, saveTheme } from '../services/shared/themeService.js';

const pageTitles = {
  '/admin': {
    title: 'Dashboard quản trị',
    description: 'Tổng hợp nhanh số liệu người dùng và các mục cần xử lý trong giai đoạn 2 frontend.',
  },
  '/admin/users': {
    title: 'Danh sách người dùng',
    description: 'Tìm kiếm, lọc và đi vào trang chi tiết để chỉnh sửa tài khoản.',
  },
};

/**
 * Layout riêng cho admin, tách biệt với giao diện user để luồng điều hướng rõ ràng hơn.
 */
function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(getInitialTheme);
  const [currentAdmin, setCurrentAdmin] = useState(getStoredAdminUser());
  const isDarkMode = themeMode === DARK_THEME;

  useEffect(() => {
    // Dùng chung hệ thống theme với phần user để toàn app giữ một cơ chế nhất quán.
    applyTheme(themeMode);
    saveTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    /**
     * Đồng bộ thông tin admin khi localStorage thay đổi sau đăng nhập hoặc đăng xuất.
     */
    function syncAdminSession() {
      setCurrentAdmin(getStoredAdminUser());
    }

    const adminAuthEventName = getAdminAuthEventName();
    window.addEventListener('storage', syncAdminSession);
    window.addEventListener(adminAuthEventName, syncAdminSession);

    return () => {
      window.removeEventListener('storage', syncAdminSession);
      window.removeEventListener(adminAuthEventName, syncAdminSession);
    };
  }, []);

  /**
   * Chuyển qua lại chế độ sáng tối cho cả giao diện admin.
   */
  function handleToggleTheme() {
    setThemeMode((currentTheme) => (currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  }

  /**
   * Đăng xuất khỏi khu vực admin và đưa người dùng về trang login admin.
   */
  function handleLogout() {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  }

  // Đổi title theo route hiện tại để topbar luôn giải thích admin đang ở màn hình nào.
  const currentPageMeta = useMemo(() => {
    if (location.pathname.startsWith('/admin/users/')) {
      return {
        title: 'Chi tiết người dùng',
        description: 'Cập nhật hồ sơ, vai trò, trạng thái và ghi chú nội bộ của tài khoản.',
      };
    }

    return (
      pageTitles[location.pathname] ?? {
        title: 'Quản trị hệ thống',
        description: 'Màn hình điều hướng cho phần quản lý.',
      }
    );
  }, [location.pathname]);

  return (
    <div className="admin-shell">
      <AdminSidebar currentAdmin={currentAdmin} />

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="section-eyebrow">Khu vực quản lý</p>
            <h1>{currentPageMeta.title}</h1>
            <p>{currentPageMeta.description}</p>
          </div>

          <div className="admin-topbar-actions">
            <Link className="button button-secondary" to="/">
              Về trang người dùng
            </Link>
            <button
              aria-label={isDarkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              className="theme-toggle"
              type="button"
              onClick={handleToggleTheme}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {isDarkMode ? '☀' : '☾'}
              </span>
            </button>
            <button className="button button-dark" type="button" onClick={handleLogout}>
              Đăng xuất admin
            </button>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
