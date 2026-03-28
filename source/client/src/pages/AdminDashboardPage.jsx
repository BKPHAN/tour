import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import { getAdminDashboardSummary, getAdminUsers } from '../services/adminUserService.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';
import { formatDateTime, getAdminRoleLabel, getAdminUserStatusLabel } from '../utils/adminFormatters.js';

/**
 * Dashboard quan tri tong hop nhanh de admin thay tinh trang nguoi dung truoc khi di sau vao danh sach.
 */
function AdminDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    /**
     * Lay song song so lieu tong hop va danh sach gan day de dashboard co du thong tin.
     */
    async function loadDashboardData() {
      try {
        const [dashboardSummary, userList] = await Promise.all([getAdminDashboardSummary(), getAdminUsers()]);
        setSummary(dashboardSummary);
        setRecentUsers(userList.slice(0, 4));
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="page-stack">
      <section className="admin-hero-card">
        <SectionHeading
          eyebrow="Tong quan"
          title="Khu vuc admin da san sang cho luong quan ly nguoi dung"
          description="Frontend giai doan 2 hien dang tap trung vao user management: xem danh sach, loc, mo chi tiet, cap nhat va xoa mem tai khoan."
          action={
            <Link className="button button-primary" to="/admin/users">
              Mo danh sach nguoi dung
            </Link>
          }
        />
      </section>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Tong user</span>
          <strong>{summary?.totalUsers ?? '--'}</strong>
          <p>Toan bo tai khoan dang duoc dua vao mo hinh mock cho frontend admin.</p>
        </article>
        <article className="admin-stat-card">
          <span>Dang hoat dong</span>
          <strong>{summary?.activeUsers ?? '--'}</strong>
          <p>Day la nhom tai khoan co the tiep tuc dat tour va dang nhap binh thuong.</p>
        </article>
        <article className="admin-stat-card">
          <span>Can xu ly</span>
          <strong>{summary?.attentionUsers ?? '--'}</strong>
          <p>Gom tai khoan tam ngung, bi khoa hoac da danh dau xoa mem.</p>
        </article>
        <article className="admin-stat-card">
          <span>Doanh thu da ghi nhan</span>
          <strong>{summary ? formatCurrency(summary.totalRevenue) : '--'}</strong>
          <p>Chi so demo de dashboard co them boi canh khi quan sat nhom khach hang hien co.</p>
        </article>
      </section>

      <section className="content-card">
        <SectionHeading
          eyebrow="Tien do"
          title="Nhung gi da hoan thanh trong nhanh nay"
          description="Scope hien tai bam sat ke hoach: frontend admin truoc, mock data truoc, luong ro rang truoc khi noi backend that."
        />
        <div className="admin-check-grid">
          <article className="admin-check-card">
            <strong>1. Dang nhap quan tri rieng</strong>
            <p>Tach session admin khoi session user de tranh nham lan luong su dung.</p>
          </article>
          <article className="admin-check-card">
            <strong>2. Dashboard mo ta du lieu</strong>
            <p>Tom tat so luong user, tai khoan can xu ly va loi moi vao khu quan ly user.</p>
          </article>
          <article className="admin-check-card">
            <strong>3. Danh sach va chi tiet user</strong>
            <p>Co bo loc, thao tac cap nhat nhanh, sua chi tiet va xoa mem tai khoan.</p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <SectionHeading
          eyebrow="Nguoi dung gan day"
          title="4 tai khoan noi bat de kiem tra nhanh"
          description="Bang duoi day giup admin vao nhanh cac tai khoan moi hoac dang co thay doi trong he thong."
        />

        <div className="admin-quick-list">
          {recentUsers.map((user) => (
            <article className="admin-quick-card" key={user.id}>
              <div className="admin-quick-card-head">
                <div>
                  <p className="booking-id">{user.id}</p>
                  <h3>{user.fullName}</h3>
                </div>
                <span className={`admin-badge ${user.deleteFlg ? 'admin-badge-muted' : 'admin-badge-info'}`}>
                  {user.deleteFlg ? 'Da xoa mem' : getAdminUserStatusLabel(user.status)}
                </span>
              </div>
              <p>{user.email}</p>
              <div className="chip-row">
                <span className="chip">{getAdminRoleLabel(user.role)}</span>
                <span className="chip">{user.bookingCount} booking</span>
                <span className="chip">Tham gia {formatDate(user.createdAt)}</span>
              </div>
              <p className="helper-text">Lan truy cap gan nhat: {formatDateTime(user.lastLoginAt)}</p>
              <Link className="button button-secondary" to={`/admin/users/${user.id}`}>
                Xem chi tiet
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
