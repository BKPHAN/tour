import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { login } from '../services/authService.js';

/**
 * Trang đăng nhập, gọi API xác thực thật và lưu phiên người dùng sau khi thành công.
 */
function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Cập nhật giá trị các ô nhập trong form đăng nhập.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  /**
   * Gọi backend đăng nhập rồi chuyển người dùng về trang họ vừa định truy cập.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await login(formData);
      const redirectTo = location.state?.redirectTo || '/bookings';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-shell container">
      <section className="auth-panel auth-intro">
        <p className="section-eyebrow">Trang đăng nhập</p>
        <h1>Quay lại tài khoản để tiếp tục chuyến đi đang dở.</h1>
        <p>
          Đăng nhập bằng tên đăng nhập hoặc email để xem booking, thanh toán và tiếp tục các hành trình đã chọn.
        </p>
        <ul className="feature-list">
          <li>Tài khoản demo: `demo`</li>
          <li>Mật khẩu demo: `123456`</li>
        </ul>
      </section>

      <section className="auth-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField
            label="Tên đăng nhập hoặc email"
            name="loginId"
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập hoặc email"
            type="text"
            value={formData.loginId}
          />
          <FormField
            label="Mật khẩu"
            name="password"
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            type="password"
            value={formData.password}
          />
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
          <div className="inline-links">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
            <Link to="/register">Tạo tài khoản mới</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
