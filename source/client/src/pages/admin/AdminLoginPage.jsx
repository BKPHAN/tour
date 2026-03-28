import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField.jsx';
import { loginAdmin } from '../../services/adminAuthService.js';

/**
 * Trang dang nhap rieng cho admin de tach biet voi luong dang nhap nguoi dung.
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
   * Cap nhat state cho 2 truong dang nhap va mat khau.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  /**
   * Dang nhap admin xong thi quay lai trang dich, neu khong co thi ve dashboard.
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
        <p className="section-eyebrow">Giai doan 2 frontend</p>
        <h1>Dang nhap khu quan tri de demo luong quan ly nguoi dung.</h1>
        <p>
          Trang nay dung session mock rieng cho admin. Sau khi dang nhap, ban co the di qua dashboard, danh
          sach user va trang chi tiet de xem toan bo flow quan tri.
        </p>
        <ul className="feature-list">
          <li>Admin demo: `admin` hoac `admin@tourflow.vn` / `admin123`</li>
          <li>Staff demo: `staff` hoac `linh.ops@tourflow.vn` / `staff123`</li>
          <li>Chi role `admin` va `staff` moi vao duoc trang quan ly, role `user` chi dung cho khu vuc nguoi dung</li>
        </ul>
      </section>

      <section className="admin-login-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField
            label="Tai khoan admin"
            name="loginId"
            onChange={handleChange}
            placeholder="Nhap username hoac email quan tri"
            value={formData.loginId}
          />
          <FormField
            label="Mat khau"
            name="password"
            onChange={handleChange}
            placeholder="Nhap mat khau admin"
            type="password"
            value={formData.password}
          />
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Dang dang nhap...' : 'Vao khu quan tri'}
          </button>
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
          <div className="inline-links">
            <Link to="/">Ve website nguoi dung</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AdminLoginPage;
