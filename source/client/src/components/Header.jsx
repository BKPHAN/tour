import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../services/authService.js';
import { getAuthEventName } from '../services/authStorage.js';
import { DARK_THEME } from '../services/themeService.js';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tours', label: 'Danh sách tour' },
  { to: '/bookings', label: 'Booking của tôi' },
];

/**
 * Main header navigation for the user area, including auth state and the theme switch.
 */
function Header({ themeMode, onToggleTheme }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const isDarkMode = themeMode === DARK_THEME;

  useEffect(() => {
    /**
     * Keep the header in sync when auth data changes in storage or inside the same tab.
     */
    function syncAuthState() {
      setCurrentUser(getStoredUser());
    }

    const authEventName = getAuthEventName();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener(authEventName, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(authEventName, syncAuthState);
    };
  }, []);

  /**
   * Log the user out on the client and send them back to the login page.
   */
  function handleLogout() {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  }

  return (
    <header className="site-header">
      <div className="container header-shell">
        <Link className="brand-mark" to="/">
          <span className="brand-kicker">Giai đoạn 1</span>
          <strong>TourFlow</strong>
        </Link>

        <button className="menu-toggle" type="button" onClick={() => setIsMenuOpen((current) => !current)}>
          Menu
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          {/* Close the mobile navigation after a route is selected to keep the flow tidy. */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            aria-label={isDarkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDarkMode ? '☀' : '☾'}
            </span>
          </button>

          {currentUser ? (
            <>
              <span className="header-user">Xin chào, {currentUser.fullName}</span>
              <button className="button button-ghost" type="button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link className="button button-ghost" to="/login">
                Đăng nhập
              </Link>
              <Link className="button button-primary" to="/register">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
