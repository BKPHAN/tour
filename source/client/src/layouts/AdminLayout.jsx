import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { getStoredAdminUser, logoutAdmin } from '../services/adminAuthService.js';
import { getAdminAuthEventName } from '../services/adminAuthStorage.js';
import { applyTheme, DARK_THEME, getInitialTheme, LIGHT_THEME, saveTheme } from '../services/themeService.js';

const pageTitles = {
  '/admin': {
    title: 'Dashboard quan tri',
    description: 'Tong hop nhanh so lieu nguoi dung va cac muc can xu ly trong giai doan 2 frontend.',
  },
  '/admin/users': {
    title: 'Danh sach nguoi dung',
    description: 'Tim kiem, loc va di vao trang chi tiet de chinh sua tai khoan.',
  },
};

/**
 * Layout rieng cho admin, tach biet voi giao dien user de luong dieu huong ro rang hon.
 */
function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(getInitialTheme);
  const [currentAdmin, setCurrentAdmin] = useState(getStoredAdminUser());
  const isDarkMode = themeMode === DARK_THEME;

  useEffect(() => {
    // Dung chung he thong theme voi phan user de toan app giu mot co che nhat quan.
    applyTheme(themeMode);
    saveTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    /**
     * Dong bo thong tin admin khi localStorage thay doi sau dang nhap hoac dang xuat.
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
   * Chuyen qua lai che do sang toi cho ca giao dien admin.
   */
  function handleToggleTheme() {
    setThemeMode((currentTheme) => (currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  }

  /**
   * Dang xuat khoi khu vuc admin va dua nguoi dung ve trang login admin.
   */
  function handleLogout() {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  }

  // Doi title theo route hien tai de topbar luon giai thich admin dang o man hinh nao.
  const currentPageMeta = useMemo(() => {
    if (location.pathname.startsWith('/admin/users/')) {
      return {
        title: 'Chi tiet nguoi dung',
        description: 'Cap nhat ho so, vai tro, trang thai va ghi chu noi bo cua tai khoan.',
      };
    }

    return (
      pageTitles[location.pathname] ?? {
        title: 'Quan tri he thong',
        description: 'Man hinh dieu huong cho phan quan ly.',
      }
    );
  }, [location.pathname]);

  return (
    <div className="admin-shell">
      <AdminSidebar currentAdmin={currentAdmin} />

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="section-eyebrow">Khu vuc quan ly</p>
            <h1>{currentPageMeta.title}</h1>
            <p>{currentPageMeta.description}</p>
          </div>

          <div className="admin-topbar-actions">
            <Link className="button button-secondary" to="/">
              Ve trang nguoi dung
            </Link>
            <button
              aria-label={isDarkMode ? 'Chuyen sang giao dien sang' : 'Chuyen sang giao dien toi'}
              className="theme-toggle"
              type="button"
              onClick={handleToggleTheme}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                {isDarkMode ? '☀' : '☾'}
              </span>
            </button>
            <button className="button button-dark" type="button" onClick={handleLogout}>
              Dang xuat admin
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
