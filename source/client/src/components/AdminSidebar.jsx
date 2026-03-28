import { Link, NavLink } from 'react-router-dom';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Quản lý người dùng' },
];

/**
 * Sidebar cố định cho khu vực admin, giữ menu ngắn gọn để người mới dễ theo dõi.
 */
function AdminSidebar({ currentAdmin }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand-block">
        <Link className="admin-brand-mark" to="/admin">
          <span className="admin-brand-icon">TF</span>
          <span>
            <strong>TourFlow Admin</strong>
            <span>Giai đoạn 2 frontend</span>
          </span>
        </Link>

        <div className="admin-profile-card">
          <p className="section-eyebrow">Tài khoản hiện tại</p>
          <strong>{currentAdmin?.fullName ?? 'Admin demo'}</strong>
          <span>{currentAdmin?.title ?? 'Quản trị hệ thống'}</span>
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
        <p className="section-eyebrow">Phạm vi hiện tại</p>
        <p>
          Nhánh này đang dùng mock data để demo luồng đăng nhập admin, dashboard và danh sách chi tiết
          người dùng theo kế hoạch.
        </p>
      </div>
    </aside>
  );
}

export default AdminSidebar;
