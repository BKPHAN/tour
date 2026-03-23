import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../services/authService.js';
import { getAuthEventName } from '../services/authStorage.js';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tours', label: 'Danh sách tour' },
  { to: '/bookings', label: 'Booking của tôi' },
];

/**
 * Header điều hướng chính của khu vực người dùng, có hỗ trợ menu mobile và trạng thái đăng nhập.
 */
function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser());

  useEffect(() => {
    /**
     * Đồng bộ header khi localStorage hoặc token trong cùng tab thay đổi.
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
   * Đăng xuất khỏi frontend rồi chuyển người dùng về trang đăng nhập.
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

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          {/* Đóng menu sau khi chọn link để trải nghiệm mobile gọn hơn. */}
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
