import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import BookingStatusPill from '../components/BookingStatusPill.jsx';
import FormField from '../components/FormField.jsx';
import { getBookingDetail, getTourDetail } from '../services/mockApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

function PaymentPage() {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    method: 'Thẻ nội địa',
  });

  useEffect(() => {
    async function loadPaymentData() {
      const bookingData = await getBookingDetail(bookingId);
      setBooking(bookingData);

      if (bookingData) {
        const tourData = await getTourDetail(bookingData.tourId);
        setTour(tourData);
        return;
      }

      const tourId = searchParams.get('tourId');
      if (tourId) {
        const tourData = await getTourDetail(tourId);
        setTour(tourData);
      }
    }

    loadPaymentData();
  }, [bookingId, searchParams]);

  const draftSummary = useMemo(() => {
    if (booking) {
      return {
        customerName: booking.customerName,
        totalPrice: booking.totalPrice,
        travelers: booking.travelers,
        departureDate: booking.departureDate,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
      };
    }

    return {
      customerName: searchParams.get('fullName') || 'Khách hàng mới',
      totalPrice: Number(searchParams.get('totalPrice') || 0),
      travelers: Number(searchParams.get('travelers') || 1),
      departureDate:
        tour?.departures.find((item) => item.id === searchParams.get('departureId'))?.date ?? tour?.departures[0]?.date,
      status: 'pending',
      paymentStatus: 'waiting',
    };
  }, [booking, searchParams, tour]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPaymentData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <p className="section-eyebrow">Trang thanh toán</p>
        <h1>Hoàn tất giao diện thanh toán cho luồng đặt tour.</h1>
      </section>

      <div className="booking-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField label="Tên chủ thẻ" name="cardName" onChange={handleChange} placeholder="NGUYỄN VĂN A" value={paymentData.cardName} />
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
          <button className="button button-primary full-width" type="submit">
            Xác nhận thanh toán
          </button>
          {submitted ? (
            <p className="success-message">
              Mock payment thành công. Bước backend sau sẽ thay bằng API thanh toán thật và cập nhật booking.
            </p>
          ) : null}
        </form>

        <aside className="summary-card">
          <p className="section-eyebrow">Đơn hàng</p>
          <h2>{tour?.title ?? 'Đang tải thông tin'}</h2>
          <BookingStatusPill paymentStatus={draftSummary.paymentStatus} status={draftSummary.status} />
          <ul className="detail-list">
            <li>Mã booking: {bookingId}</li>
            <li>Khách hàng: {draftSummary.customerName}</li>
            <li>Số khách: {draftSummary.travelers}</li>
            <li>Ngày khởi hành: {draftSummary.departureDate ? formatDate(draftSummary.departureDate) : 'Đang cập nhật'}</li>
          </ul>
          <div className="summary-total">
            <span>Tổng thanh toán</span>
            <strong>{formatCurrency(draftSummary.totalPrice)}</strong>
          </div>
          <div className="inline-links">
            <Link to="/bookings">Xem lịch sử booking</Link>
            <Link to={`/tours/${tour?.id ?? 'tour-sapa'}`}>Quay lại chi tiết tour</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PaymentPage;
