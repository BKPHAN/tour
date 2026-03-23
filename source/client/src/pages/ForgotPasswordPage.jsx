import { useState } from 'react';
import FormField from '../components/FormField.jsx';

/**
 * Trang quên mật khẩu mock, giữ sẵn vị trí cho flow gửi email reset sau này.
 */
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /**
   * Mock thao tác gửi yêu cầu đặt lại mật khẩu để kiểm tra phản hồi trên giao diện.
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-shell container">
      <section className="auth-panel auth-intro">
        <p className="section-eyebrow">Trang quên mật khẩu</p>
        <h1>Gửi yêu cầu đặt lại mật khẩu cho người dùng.</h1>
        <p>Trang này hiện mô phỏng một form đơn giản, sẵn cho API gửi email reset trong giai đoạn sau.</p>
      </section>

      <section className="auth-panel">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField
            label="Email đăng ký"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
          <button className="button button-primary full-width" type="submit">
            Gửi link đặt lại mật khẩu
          </button>
          {submitted ? <p className="success-message">Mock request đã được tạo. Chờ bước backend gửi email thật.</p> : null}
        </form>
      </section>
    </div>
  );
}

export default ForgotPasswordPage;
