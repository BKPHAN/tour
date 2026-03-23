import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tours', label: 'Danh sách tour' },
  { to: '/bookings', label: 'Booking của tôi' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link className="button button-ghost" to="/login">
            Đăng nhập
          </Link>
          <Link className="button button-primary" to="/register">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
