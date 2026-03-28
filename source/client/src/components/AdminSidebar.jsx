import { Link, NavLink } from 'react-router-dom';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Quan ly nguoi dung' },
];

/**
 * Sidebar co dinh cho khu vuc admin, giu menu ngan gon de nguoi moi de theo doi.
 */
function AdminSidebar({ currentAdmin }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand-block">
        <Link className="admin-brand-mark" to="/admin">
          <span className="admin-brand-icon">TF</span>
          <span>
            <strong>TourFlow Admin</strong>
            <span>Giai doan 2 frontend</span>
          </span>
        </Link>

        <div className="admin-profile-card">
          <p className="section-eyebrow">Tai khoan hien tai</p>
          <strong>{currentAdmin?.fullName ?? 'Admin demo'}</strong>
          <span>{currentAdmin?.title ?? 'Quan tri he thong'}</span>
        </div>
      </div>

      <nav className="admin-nav">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-note">
        <p className="section-eyebrow">Pham vi hien tai</p>
        <p>
          Nhanh nay dang dung mock data de demo luong dang nhap admin, dashboard va danh sach chi tiet
          nguoi dung theo ke hoach.
        </p>
      </div>
    </aside>
  );
}

export default AdminSidebar;
