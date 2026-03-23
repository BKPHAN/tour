import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookingStatusPill from '../components/BookingStatusPill.jsx';
import BookingTimeline from '../components/BookingTimeline.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { getBookingDetail, getTourDetail } from '../services/mockApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

/**
 * Trang chi tiết booking, hiển thị đủ thông tin đơn và timeline xử lý để người dùng theo dõi.
 */
function BookingDetailPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);

  useEffect(() => {
    /**
     * Lấy booking trước, sau đó mới lấy tour liên quan để tránh gọi thiếu dữ liệu.
     */
    async function loadBooking() {
      const bookingData = await getBookingDetail(bookingId);
      setBooking(bookingData);

      if (bookingData) {
        const tourData = await getTourDetail(bookingData.tourId);
        setTour(tourData);
      }
    }

    loadBooking();
  }, [bookingId]);

  if (!booking) {
    return null;
  }

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <p className="section-eyebrow">Chi tiết booking</p>
        <h1>{booking.id}</h1>
        <BookingStatusPill paymentStatus={booking.paymentStatus} status={booking.status} />
      </section>

      <div className="detail-grid">
        <section className="content-card">
          <SectionHeading
            eyebrow="Thông tin chung"
            title={tour?.title ?? 'Đang tải tên tour'}
            description="Trang này mô phỏng trang xem chi tiết đơn đặt tour và các mốc xử lý của booking."
          />
          <ul className="detail-list">
            <li>Ngày đặt: {formatDate(booking.bookedAt)}</li>
            <li>Ngày khởi hành: {formatDate(booking.departureDate)}</li>
            <li>Số hành khách: {booking.travelers}</li>
            <li>Phương thức thanh toán: {booking.paymentMethod}</li>
            <li>Tổng tiền: {formatCurrency(booking.totalPrice)}</li>
            <li>Ghi chú: {booking.notes}</li>
          </ul>
        </section>

        <aside className="summary-card">
          <p className="section-eyebrow">Thông tin liên hệ</p>
          <h2>{booking.customerName}</h2>
          <ul className="detail-list">
            <li>Email: {booking.customerEmail}</li>
            <li>Điện thoại: {booking.customerPhone}</li>
          </ul>
          <div className="history-actions">
            <Link className="button button-secondary" to="/bookings">
              Quay lại lịch sử
            </Link>
            {booking.paymentStatus === 'waiting' ? (
              <Link className="button button-primary" to={`/payment/${booking.id}`}>
                Thanh toán ngay
              </Link>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="content-card">
        <SectionHeading
          eyebrow="Tiến trình xử lý"
          title="Timeline booking"
          description="Các mốc xử lý sẽ giúp user và admin dễ theo dõi tình trạng đơn đặt sau này."
        />
        <BookingTimeline items={booking.timeline} />
      </section>
    </div>
  );
}

export default BookingDetailPage;
