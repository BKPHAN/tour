import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingStatusPill from '../components/BookingStatusPill.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { getBookings, getTourDetail } from '../services/mockApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [tourMap, setTourMap] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function loadBookings() {
      const data = await getBookings();
      setBookings(data);

      const entries = await Promise.all(
        data.map(async (booking) => {
          const tour = await getTourDetail(booking.tourId);
          return [booking.tourId, tour];
        }),
      );

      setTourMap(Object.fromEntries(entries));
    }

    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (statusFilter === 'all') {
      return bookings;
    }

    return bookings.filter((booking) => booking.status === statusFilter);
  }, [bookings, statusFilter]);

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <SectionHeading
          eyebrow="Lịch sử booking"
          title="Bảng tổng hợp các booking của người dùng"
          description="Trang này giúp user xem lại trạng thái đặt tour, tính tiền và truy cập trang chi tiết booking."
        />
      </section>

      <section className="filters-panel">
        <label className="form-field">
          <span>Lọc theo trạng thái</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </label>
      </section>

      <section className="history-list">
        {filteredBookings.map((booking) => (
          <article className="history-card" key={booking.id}>
            <div>
              <p className="booking-id">{booking.id}</p>
              <h3>{tourMap[booking.tourId]?.title ?? 'Đang tải tên tour'}</h3>
              <p>
                Khởi hành {formatDate(booking.departureDate)} | {booking.travelers} khách
              </p>
            </div>
            <div>
              <BookingStatusPill paymentStatus={booking.paymentStatus} status={booking.status} />
              <strong>{formatCurrency(booking.totalPrice)}</strong>
            </div>
            <div className="history-actions">
              <Link className="button button-secondary" to={`/bookings/${booking.id}`}>
                Xem chi tiết
              </Link>
              {booking.paymentStatus === 'waiting' ? (
                <Link className="button button-primary" to={`/payment/${booking.id}`}>
                  Thanh toán ngay
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default BookingHistoryPage;
