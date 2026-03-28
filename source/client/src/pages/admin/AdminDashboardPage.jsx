import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading.jsx';
import { getAdminDashboardSummary, getAdminUsers } from '../../services/admin/adminUserService.js';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { formatDateTime, getAdminRoleLabel, getAdminUserStatusLabel } from '../../utils/adminFormatters.js';

/**
 * Dashboard quản trị tổng hợp nhanh để admin thấy tình trạng người dùng trước khi đi sâu vào danh sách.
 */
function AdminDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    /**
     * Lấy song song số liệu tổng hợp và danh sách gần đây để dashboard có đủ thông tin.
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
          eyebrow="Tổng quan"
          title="Khu vực admin đã sẵn sàng cho luồng quản lý người dùng"
          description="Frontend giai đoạn 2 hiện đang tập trung vào user management: xem danh sách, lọc, mở chi tiết, cập nhật và xóa mềm tài khoản."
          action={
            <Link className="button button-primary" to="/admin/users">
              Mở danh sách người dùng
            </Link>
          }
        />
      </section>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}

      <section className="admin-stat-grid">
        <article className="admin-stat-card">
          <span>Tổng user</span>
          <strong>{summary?.totalUsers ?? '--'}</strong>
          <p>Toàn bộ tài khoản đang được đưa vào mô hình mock cho frontend admin.</p>
        </article>
        <article className="admin-stat-card">
          <span>Đang hoạt động</span>
          <strong>{summary?.activeUsers ?? '--'}</strong>
          <p>Đây là nhóm tài khoản có thể tiếp tục đặt tour và đăng nhập bình thường.</p>
        </article>
        <article className="admin-stat-card">
          <span>Cần xử lý</span>
          <strong>{summary?.attentionUsers ?? '--'}</strong>
          <p>Gồm tài khoản tạm ngưng, bị khóa hoặc đã đánh dấu xóa mềm.</p>
        </article>
        <article className="admin-stat-card">
          <span>Doanh thu đã ghi nhận</span>
          <strong>{summary ? formatCurrency(summary.totalRevenue) : '--'}</strong>
          <p>Chỉ số demo để dashboard có thêm bối cảnh khi quan sát nhóm khách hàng hiện có.</p>
        </article>
      </section>

      <section className="content-card">
        <SectionHeading
          eyebrow="Tiến độ"
          title="Những gì đã hoàn thành trong nhánh này"
          description="Scope hiện tại bám sát kế hoạch: frontend admin trước, mock data trước, luồng rõ ràng trước khi nối backend thật."
        />
        <div className="admin-check-grid">
          <article className="admin-check-card">
            <strong>1. Đăng nhập quản trị riêng</strong>
            <p>Tách session admin khỏi session user để tránh nhầm lẫn luồng sử dụng.</p>
          </article>
          <article className="admin-check-card">
            <strong>2. Dashboard mô tả dữ liệu</strong>
            <p>Tóm tắt số lượng user, tài khoản cần xử lý và lối mở vào khu quản lý user.</p>
          </article>
          <article className="admin-check-card">
            <strong>3. Danh sách và chi tiết user</strong>
            <p>Có bộ lọc, thao tác cập nhật nhanh, sửa chi tiết và xóa mềm tài khoản.</p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <SectionHeading
          eyebrow="Người dùng gần đây"
          title="4 tài khoản nổi bật để kiểm tra nhanh"
          description="Bảng dưới đây giúp admin vào nhanh các tài khoản mới hoặc đang có thay đổi trong hệ thống."
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
                  {user.deleteFlg ? 'Đã xóa mềm' : getAdminUserStatusLabel(user.status)}
                </span>
              </div>
              <p>{user.email}</p>
              <div className="chip-row">
                <span className="chip">{getAdminRoleLabel(user.role)}</span>
                <span className="chip">{user.bookingCount} booking</span>
                <span className="chip">Tham gia {formatDate(user.createdAt)}</span>
              </div>
              <p className="helper-text">Lần truy cập gần nhất: {formatDateTime(user.lastLoginAt)}</p>
              <Link className="button button-secondary" to={`/admin/users/${user.id}`}>
                Xem chi tiết
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
