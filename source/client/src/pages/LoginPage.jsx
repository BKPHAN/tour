import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';

/**
 * Trang đăng nhập mock để chốt bố cục form trước khi nối xác thực thật bằng backend.
 */
function LoginPage() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  /**
   * Cập nhật giá trị các ô nhập trong form đăng nhập.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  /**
   * Mock thao tác submit để kiểm tra luồng giao diện và thông báo phản hồi.
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-shell container">
      <section className="auth-panel auth-intro">
        <p className="section-eyebrow">Trang đăng nhập</p>
        <h1>Quay lại tài khoản để tiếp tục chuyến đi đang dở.</h1>
        <p>
          Luồng đăng nhập được bố trí gọn gàng để sau này chèn validate, xử lý JWT và điều hướng sang booking history.
        </p>
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
          <FormField label="Mật khẩu" name="password" onChange={handleChange} placeholder="Nhập mật khẩu" type="password" value={formData.password} />
          <button className="button button-primary full-width" type="submit">
            Đăng nhập
          </button>
          {submitted ? <p className="success-message">Mock login thành công. Sau này sẽ thay bằng xử lý JWT thật.</p> : null}
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
