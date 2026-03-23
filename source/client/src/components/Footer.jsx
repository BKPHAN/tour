import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-kicker">Frontend mock data</p>
          <h3>Hoàn thiện khung giao diện cho luồng người dùng.</h3>
          <p>
            Toàn bộ trang hiện đang dùng dữ liệu giả để chuẩn bị cho giai đoạn backend kết nối MySQL và API thật.
          </p>
        </div>

        <div>
          <h4>Điều hướng nhanh</h4>
          <div className="footer-links">
            <Link to="/tours">Xem tour</Link>
            <Link to="/booking/tour-sapa">Đặt tour</Link>
            <Link to="/payment/BK-2026-002">Thanh toán</Link>
            <Link to="/bookings">Lịch sử booking</Link>
          </div>
        </div>

        <div>
          <h4>Trang đã dựng</h4>
          <ul className="footer-list">
            <li>Trang chủ</li>
            <li>Chi tiết tour</li>
            <li>Đăng ký / Đăng nhập</li>
            <li>Booking / Payment</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
