import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-shell container">
      <section className="auth-panel auth-intro">
        <p className="section-eyebrow">Trang đăng ký</p>
        <h1>Tạo tài khoản để bắt đầu đặt tour.</h1>
        <p>
          Form này được dùng để chốt bố cục input, nút CTA và thông điệp phản hồi trước khi làm API đăng ký thật.
        </p>
        <ul className="feature-list">
          <li>Input rõ ràng cho họ tên, email, số điện thoại, mật khẩu</li>
          <li>Sẵn vị trí cho validate và thông báo lỗi backend sau này</li>
          <li>Có đường dẫn nhanh sang đăng nhập</li>
        </ul>
      </section>

      <section className="auth-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField label="Họ và tên" name="fullName" onChange={handleChange} placeholder="Nguyễn Văn A" value={formData.fullName} />
          <FormField label="Email" name="email" onChange={handleChange} placeholder="you@example.com" type="email" value={formData.email} />
          <FormField label="Số điện thoại" name="phone" onChange={handleChange} placeholder="09xxxxxxxx" value={formData.phone} />
          <FormField label="Mật khẩu" name="password" onChange={handleChange} placeholder="Nhập mật khẩu" type="password" value={formData.password} />
          <button className="button button-primary full-width" type="submit">
            Tạo tài khoản
          </button>
          {submitted ? <p className="success-message">Mock submit thành công. Có thể nối API đăng ký ở bước backend.</p> : null}
          <p className="helper-text">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default RegisterPage;
