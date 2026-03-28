import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormField from '../../components/FormField.jsx';
import { editableUserRoleOptions, editableUserStatusOptions } from '../../data/adminMockData.js';
import { getAdminUserDetail, toggleAdminUserDeleteFlag, updateAdminUser } from '../../services/admin/adminUserService.js';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { formatDateTime, getAdminRoleLabel, getAdminUserStatusLabel } from '../../utils/adminFormatters.js';

function createFormState(user) {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    city: user.city,
    loyaltyLevel: user.loyaltyLevel,
    internalNote: user.internalNote,
  };
}

/**
 * Trang chi tiết user giúp admin xem tổng hợp thông tin và chỉnh sửa từng trường quan trọng.
 */
function AdminUserDetailPage() {
  const { userId } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    /**
     * Mỗi khi đổi userId thì tải lại chi tiết để form luôn đúng ngữ cảnh.
     */
    async function loadUserDetail() {
      try {
        const user = await getAdminUserDetail(userId);
        setUserDetail(user);
        setFormData(createFormState(user));
        setErrorMessage('');
        setSuccessMessage('');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadUserDetail();
  }, [userId]);

  /**
   * Cập nhật state cho form sửa user.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  /**
   * Lưu thông tin user đã sửa vào mock storage để quay lại list vẫn thấy dữ liệu mới.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const updatedUser = await updateAdminUser(userId, formData);
      setUserDetail(updatedUser);
      setFormData(createFormState(updatedUser));
      setSuccessMessage('Đã lưu cập nhật cho tài khoản này.');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Xóa mềm hoặc khôi phục user ngay tại trang detail để demo đủ luồng quản trị.
   */
  async function handleToggleDelete() {
    try {
      const updatedUser = await toggleAdminUserDeleteFlag(userId);
      setUserDetail(updatedUser);
      setFormData(createFormState(updatedUser));
      setSuccessMessage(updatedUser.deleteFlg ? 'Tài khoản đã được đánh dấu xóa mềm.' : 'Tài khoản đã được khôi phục.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (errorMessage && !userDetail) {
    return (
      <section className="content-card admin-empty-state">
        <h2>Không tìm thấy user</h2>
        <p>{errorMessage}</p>
        <Link className="button button-primary" to="/admin/users">
          Quay lại danh sách
        </Link>
      </section>
    );
  }

  if (!userDetail || !formData) {
    return <p className="helper-text">Đang tải chi tiết người dùng...</p>;
  }

  return (
    <div className="page-stack">
      <section className="content-card">
        <div className="section-heading-row">
          <div>
            <p className="booking-id">{userDetail.id}</p>
            <h2>{userDetail.fullName}</h2>
            <p>{userDetail.email}</p>
          </div>

          <div className="chip-row">
            <span className="chip">{getAdminRoleLabel(userDetail.role)}</span>
            <span
              className={`admin-badge ${
                userDetail.deleteFlg
                  ? 'admin-badge-muted'
                  : userDetail.status === 'blocked'
                    ? 'admin-badge-danger'
                    : userDetail.status === 'inactive'
                      ? 'admin-badge-warning'
                      : 'admin-badge-success'
              }`}
            >
              {userDetail.deleteFlg ? 'Đã xóa mềm' : getAdminUserStatusLabel(userDetail.status)}
            </span>
          </div>
        </div>
      </section>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {successMessage ? <p className="success-message">{successMessage}</p> : null}

      <div className="admin-detail-grid">
        <section className="content-card">
          <h2>Thông tin tổng quan</h2>
          <div className="admin-summary-grid">
            <article className="admin-mini-card">
              <span>Ngày tạo</span>
              <strong>{formatDate(userDetail.createdAt)}</strong>
            </article>
            <article className="admin-mini-card">
              <span>Lần đăng nhập gần nhất</span>
              <strong>{formatDateTime(userDetail.lastLoginAt)}</strong>
            </article>
            <article className="admin-mini-card">
              <span>Số booking</span>
              <strong>{userDetail.bookingCount}</strong>
            </article>
            <article className="admin-mini-card">
              <span>Tổng chi tiêu</span>
              <strong>{formatCurrency(userDetail.totalSpent)}</strong>
            </article>
          </div>

          <div className="admin-profile-summary">
            <p>
              <strong>Thành phố:</strong> {userDetail.city}
            </p>
            <p>
              <strong>Hạng thành viên:</strong> {userDetail.loyaltyLevel}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userDetail.phone}
            </p>
          </div>
        </section>

        <section className="content-card">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Cập nhật hồ sơ</h2>
            <div className="admin-form-grid">
              <FormField label="Họ và tên" name="fullName" onChange={handleChange} value={formData.fullName} />
              <FormField label="Email" name="email" onChange={handleChange} value={formData.email} />
              <FormField label="Số điện thoại" name="phone" onChange={handleChange} value={formData.phone} />
              <FormField label="Thành phố" name="city" onChange={handleChange} value={formData.city} />
              <FormField
                as="select"
                label="Vai trò"
                name="role"
                onChange={handleChange}
                options={editableUserRoleOptions}
                value={formData.role}
              />
              <FormField
                as="select"
                label="Trạng thái tài khoản"
                name="status"
                onChange={handleChange}
                options={editableUserStatusOptions}
                value={formData.status}
              />
              <FormField
                label="Hạng thành viên"
                name="loyaltyLevel"
                onChange={handleChange}
                value={formData.loyaltyLevel}
              />
            </div>
            <FormField
              as="textarea"
              label="Ghi chú nội bộ"
              name="internalNote"
              onChange={handleChange}
              placeholder="Mô tả lý do cần theo dõi tài khoản này"
              value={formData.internalNote}
            />
            <div className="admin-form-actions">
              <button className="button button-primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Đang lưu...' : 'Lưu cập nhật'}
              </button>
              <button className="button button-dark" type="button" onClick={handleToggleDelete}>
                {userDetail.deleteFlg ? 'Khôi phục tài khoản' : 'Đánh dấu xóa mềm'}
              </button>
              <Link className="button button-secondary" to="/admin/users">
                Về danh sách
              </Link>
            </div>
          </form>
        </section>
      </div>

      <section className="content-card">
        <h2>Lịch sử thao tác</h2>
        <div className="admin-activity-list">
          {userDetail.recentActivities.map((activity) => (
            <article className="admin-activity-card" key={`${activity.time}-${activity.title}`}>
              <div className="timeline-dot" />
              <div>
                <strong>{activity.title}</strong>
                <p>{activity.detail}</p>
                <span>{formatDateTime(activity.time)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminUserDetailPage;
