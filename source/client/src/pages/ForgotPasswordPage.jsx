import { useState } from 'react';
import FormField from '../components/FormField.jsx';

/**
 * Trang quên mật khẩu.
 */
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /**
   * Ghi nhận yêu cầu đặt lại mật khẩu trên giao diện.
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-shell container">
      <section className="auth-panel auth-intro">
        <p className="section-eyebrow">Trang quên mật khẩu</p>
        <h1>Lấy lại quyền truy cập vào tài khoản của bạn.</h1>
        <p>Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu và tiếp tục quản lý các chuyến đi đang quan tâm.</p>
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
          {submitted ? <p className="success-message">Yêu cầu đã được ghi nhận. Vui lòng kiểm tra email để tiếp tục đặt lại mật khẩu.</p> : null}
        </form>
      </section>
    </div>
  );
}

export default ForgotPasswordPage;
