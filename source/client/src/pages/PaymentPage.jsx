import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookingStatusPill from '../components/BookingStatusPill.jsx';
import FormField from '../components/FormField.jsx';
import { logout } from '../services/authService.js';
import { getPaymentDetail, payBooking } from '../services/paymentService.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

/**
 * Trang thanh toán, lấy dữ liệu booking thật từ backend và xác nhận thanh toán qua API.
 */
function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [payment, setPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    method: 'Thẻ nội địa',
  });

  useEffect(() => {
    /**
     * Nạp dữ liệu thanh toán thật theo booking id, đồng thời xử lý token hết hạn nếu backend trả 401.
     */
    async function loadPaymentData() {
      try {
        const result = await getPaymentDetail(bookingId);
        setBooking(result.booking);
        setTour(result.tour);
        setPayment(result.payment);
        setErrorMessage('');

        if (result.booking?.paymentMethod && result.booking.paymentMethod !== 'Chưa thanh toán') {
          setPaymentData((current) => ({
            ...current,
            method: result.booking.paymentMethod,
          }));
        }
      } catch (error) {
        if (error.status === 401) {
          logout();
          navigate('/login', { replace: true, state: { redirectTo: `/payment/${bookingId}` } });
          return;
        }

        setErrorMessage(error.message);
      }
    }

    loadPaymentData();
  }, [bookingId, navigate]);

  // Tạo object summary thống nhất để sidebar luôn dựa trên dữ liệu booking mới nhất.
  const draftSummary = useMemo(() => {
    return {
      customerName: booking?.customerName || 'Đang cập nhật',
      departureDate: booking?.departureDate || '',
      paymentStatus: booking?.paymentStatus || 'waiting',
      status: booking?.status || 'pending',
      totalPrice: booking?.totalPrice || 0,
      travelers: booking?.travelers || 0,
    };
  }, [booking]);

  /**
   * Cập nhật dữ liệu form thanh toán mỗi khi người dùng đổi thông tin thẻ hoặc phương thức.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setPaymentData((current) => ({ ...current, [name]: value }));
  }

  /**
   * Gọi backend xác nhận thanh toán rồi cập nhật lại booking và payment trên giao diện.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await payBooking({
        bookingId,
        cardName: paymentData.cardName,
        cardNumber: paymentData.cardNumber,
        method: paymentData.method,
      });

      setBooking(result.booking);
      setPayment(result.payment);
      setTour(result.tour);
      setSuccessMessage('Thanh toán thành công. Booking của bạn đã được xác nhận.');
    } catch (error) {
      if (error.status === 401) {
        logout();
        navigate('/login', { replace: true, state: { redirectTo: `/payment/${bookingId}` } });
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!booking || !tour) {
    return (
      <div className="container empty-panel">
        <h2>{errorMessage || 'Đang tải thông tin thanh toán'}</h2>
        <Link className="button button-primary" to="/bookings">
          Quay lại lịch sử booking
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <p className="section-eyebrow">Trang thanh toán</p>
        <h1>Hoàn tất thanh toán cho đơn đặt tour của bạn.</h1>
      </section>

      <div className="booking-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField label="Tên chủ thẻ" name="cardName" onChange={handleChange} placeholder="NGUYEN VAN A" value={paymentData.cardName} />
          <FormField label="Số thẻ / mã ví" name="cardNumber" onChange={handleChange} placeholder="9704 xxxx xxxx xxxx" value={paymentData.cardNumber} />
          <FormField
            as="select"
            label="Phương thức thanh toán"
            name="method"
            onChange={handleChange}
            options={[
              { value: 'Thẻ nội địa', label: 'Thẻ nội địa' },
              { value: 'Chuyển khoản ngân hàng', label: 'Chuyển khoản ngân hàng' },
              { value: 'Ví điện tử', label: 'Ví điện tử' },
            ]}
            value={paymentData.method}
          />
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Đang xử lý thanh toán...' : 'Xác nhận thanh toán'}
          </button>
          {successMessage ? <p className="success-message">{successMessage}</p> : null}
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        </form>

        <aside className="summary-card">
          <p className="section-eyebrow">Đơn hàng</p>
          <h2>{tour.title}</h2>
          <BookingStatusPill paymentStatus={draftSummary.paymentStatus} status={draftSummary.status} />
          <ul className="detail-list">
            <li>Mã booking: {booking.id}</li>
            <li>Khách hàng: {draftSummary.customerName}</li>
            <li>Số khách: {draftSummary.travelers}</li>
            <li>Ngày khởi hành: {draftSummary.departureDate ? formatDate(draftSummary.departureDate) : 'Đang cập nhật'}</li>
            <li>Phương thức gần nhất: {payment?.method || booking.paymentMethod}</li>
          </ul>
          <div className="summary-total">
            <span>Tổng thanh toán</span>
            <strong>{formatCurrency(draftSummary.totalPrice)}</strong>
          </div>
          <div className="inline-links">
            <Link to="/bookings">Xem lịch sử booking</Link>
            <Link to={`/tours/${tour.id}`}>Quay lại chi tiết tour</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PaymentPage;
