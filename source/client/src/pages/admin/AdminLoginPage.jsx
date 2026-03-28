import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField.jsx';
import { loginAdmin } from '../../services/admin/adminAuthService.js';

/**
 * Trang đăng nhập riêng cho admin để tách biệt với luồng đăng nhập người dùng.
 */
function AdminLoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Cập nhật state cho 2 trường đăng nhập và mật khẩu.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  /**
   * Đăng nhập admin xong thì quay lại trang đích, nếu không có thì về dashboard.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await loginAdmin(formData);
      navigate(location.state?.redirectTo || '/admin', { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="admin-login-shell">
      <section className="admin-login-panel admin-login-intro">
        <p className="section-eyebrow">Giai đoạn 2 frontend</p>
        <h1>Đăng nhập khu quản trị để demo luồng quản lý người dùng.</h1>
        <p>
          Trang này dùng session mock riêng cho admin. Sau khi đăng nhập, bạn có thể đi qua dashboard, danh
          sách user và trang chi tiết để xem toàn bộ flow quản trị.
        </p>
        <ul className="feature-list">
          <li>Admin demo: `admin` hoặc `admin@tourflow.vn` / `admin123`</li>
          <li>Staff demo: `staff` hoặc `linh.ops@tourflow.vn` / `staff123`</li>
          <li>Chỉ role `admin` và `staff` mới vào được trang quản lý, role `user` chỉ dùng cho khu vực người dùng</li>
        </ul>
      </section>

      <section className="admin-login-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField
            label="Tài khoản admin"
            name="loginId"
            onChange={handleChange}
            placeholder="Nhập username hoặc email quản trị"
            value={formData.loginId}
          />
          <FormField
            label="Mật khẩu"
            name="password"
            onChange={handleChange}
            placeholder="Nhập mật khẩu admin"
            type="password"
            value={formData.password}
          />
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Đang đăng nhập...' : 'Vào khu quản trị'}
          </button>
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
          <div className="inline-links">
            <Link to="/">Về website người dùng</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AdminLoginPage;
