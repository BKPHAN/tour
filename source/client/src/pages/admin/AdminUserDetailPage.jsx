import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormField from '../../components/FormField.jsx';
import { editableUserRoleOptions, editableUserStatusOptions } from '../../data/adminMockData.js';
import { getAdminUserDetail, toggleAdminUserDeleteFlag, updateAdminUser } from '../../services/adminUserService.js';
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
 * Trang chi tiet user giup admin xem tong hop thong tin va chinh sua tung truong quan trong.
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
     * Moi khi doi userId thi tai lai chi tiet de form luon dung ngu canh.
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
   * Cap nhat state cho form sua user.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  /**
   * Luu thong tin user da sua vao mock storage de quay lai list van thay du lieu moi.
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
      setSuccessMessage('Da luu cap nhat cho tai khoan nay.');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Xoa mem hoac khoi phuc user ngay tai trang detail de demo du luong quan tri.
   */
  async function handleToggleDelete() {
    try {
      const updatedUser = await toggleAdminUserDeleteFlag(userId);
      setUserDetail(updatedUser);
      setFormData(createFormState(updatedUser));
      setSuccessMessage(updatedUser.deleteFlg ? 'Tai khoan da duoc danh dau xoa mem.' : 'Tai khoan da duoc khoi phuc.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (errorMessage && !userDetail) {
    return (
      <section className="content-card admin-empty-state">
        <h2>Khong tim thay user</h2>
        <p>{errorMessage}</p>
        <Link className="button button-primary" to="/admin/users">
          Quay lai danh sach
        </Link>
      </section>
    );
  }

  if (!userDetail || !formData) {
    return <p className="helper-text">Dang tai chi tiet nguoi dung...</p>;
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
              {userDetail.deleteFlg ? 'Da xoa mem' : getAdminUserStatusLabel(userDetail.status)}
            </span>
          </div>
        </div>
      </section>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {successMessage ? <p className="success-message">{successMessage}</p> : null}

      <div className="admin-detail-grid">
        <section className="content-card">
          <h2>Thong tin tong quan</h2>
          <div className="admin-summary-grid">
            <article className="admin-mini-card">
              <span>Ngay tao</span>
              <strong>{formatDate(userDetail.createdAt)}</strong>
            </article>
            <article className="admin-mini-card">
              <span>Lan dang nhap gan nhat</span>
              <strong>{formatDateTime(userDetail.lastLoginAt)}</strong>
            </article>
            <article className="admin-mini-card">
              <span>So booking</span>
              <strong>{userDetail.bookingCount}</strong>
            </article>
            <article className="admin-mini-card">
              <span>Tong chi tieu</span>
              <strong>{formatCurrency(userDetail.totalSpent)}</strong>
            </article>
          </div>

          <div className="admin-profile-summary">
            <p>
              <strong>Thanh pho:</strong> {userDetail.city}
            </p>
            <p>
              <strong>Hang thanh vien:</strong> {userDetail.loyaltyLevel}
            </p>
            <p>
              <strong>So dien thoai:</strong> {userDetail.phone}
            </p>
          </div>
        </section>

        <section className="content-card">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Cap nhat ho so</h2>
            <div className="admin-form-grid">
              <FormField label="Ho va ten" name="fullName" onChange={handleChange} value={formData.fullName} />
              <FormField label="Email" name="email" onChange={handleChange} value={formData.email} />
              <FormField label="So dien thoai" name="phone" onChange={handleChange} value={formData.phone} />
              <FormField label="Thanh pho" name="city" onChange={handleChange} value={formData.city} />
              <FormField
                as="select"
                label="Vai tro"
                name="role"
                onChange={handleChange}
                options={editableUserRoleOptions}
                value={formData.role}
              />
              <FormField
                as="select"
                label="Trang thai tai khoan"
                name="status"
                onChange={handleChange}
                options={editableUserStatusOptions}
                value={formData.status}
              />
              <FormField
                label="Hang thanh vien"
                name="loyaltyLevel"
                onChange={handleChange}
                value={formData.loyaltyLevel}
              />
            </div>
            <FormField
              as="textarea"
              label="Ghi chu noi bo"
              name="internalNote"
              onChange={handleChange}
              placeholder="Mo ta ly do can theo doi tai khoan nay"
              value={formData.internalNote}
            />
            <div className="admin-form-actions">
              <button className="button button-primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Dang luu...' : 'Luu cap nhat'}
              </button>
              <button className="button button-dark" type="button" onClick={handleToggleDelete}>
                {userDetail.deleteFlg ? 'Khoi phuc tai khoan' : 'Danh dau xoa mem'}
              </button>
              <Link className="button button-secondary" to="/admin/users">
                Ve danh sach
              </Link>
            </div>
          </form>
        </section>
      </div>

      <section className="content-card">
        <h2>Lich su thao tac</h2>
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
