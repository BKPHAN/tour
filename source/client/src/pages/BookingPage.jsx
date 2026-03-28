import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { createBooking } from '../services/bookingService.js';
import { getStoredUser, logout } from '../services/authService.js';
import { getTourDetail } from '../services/tourService.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

/**
 * Trang nhập thông tin đặt tour và tạo booking thật trước khi sang bước thanh toán.
 */
function BookingPage() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const storedUser = getStoredUser();
  const [tour, setTour] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: storedUser?.fullName || '',
    email: storedUser?.email || '',
    phone: storedUser?.phone || '',
    travelerCount: '2',
    departureId: '',
    note: '',
  });

  useEffect(() => {
    /**
     * Lấy dữ liệu tour và tự động chọn lịch khởi hành đầu tiên để form có trạng thái mặc định hợp lệ.
     */
    async function loadTour() {
      try {
        const data = await getTourDetail(tourId);
        setTour(data);
        setErrorMessage('');

        if (data?.departures?.[0]) {
          setFormData((current) => ({
            ...current,
            departureId: current.departureId || data.departures[0].id,
          }));
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadTour();
  }, [tourId]);

  // Xác định lịch khởi hành đang được chọn để hiển thị đúng ngày đi và giá tour.
  const selectedDeparture = useMemo(() => {
    return tour?.departures.find((item) => item.id === formData.departureId);
  }, [formData.departureId, tour]);

  // Tổng tiền tạm tính được suy ra trực tiếp từ số khách và giá của lịch đang chọn.
  const totalPrice = Number(formData.travelerCount || 0) * (selectedDeparture?.price ?? 0);

  /**
   * Đồng bộ giá trị input vào form state để dùng lại cho bước thanh toán.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  /**
   * Tạo booking ở backend rồi điều hướng sang trang thanh toán với booking id thật.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const booking = await createBooking({
        departureId: formData.departureId,
        email: formData.email,
        fullName: formData.fullName,
        note: formData.note,
        phone: formData.phone,
        tourId,
        travelers: Number(formData.travelerCount),
      });

      navigate(`/payment/${booking.id}`);
    } catch (error) {
      if (error.status === 401) {
        logout();
        navigate('/login', { replace: true, state: { redirectTo: `/booking/${tourId}` } });
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!tour) {
    return (
      <div className="container empty-panel">
        <h2>{errorMessage || 'Đang tải thông tin tour'}</h2>
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <p className="section-eyebrow">Trang đặt tour</p>
        <h1>Giữ chỗ nhanh cho hành trình bạn đã chọn.</h1>
      </section>

      <div className="booking-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <FormField label="Họ và tên" name="fullName" onChange={handleChange} placeholder="Nguyễn Văn A" value={formData.fullName} />
          <FormField label="Email" name="email" onChange={handleChange} placeholder="you@example.com" type="email" value={formData.email} />
          <FormField label="Số điện thoại" name="phone" onChange={handleChange} placeholder="09xxxxxxxx" value={formData.phone} />
          <FormField
            as="select"
            label="Số lượng hành khách"
            name="travelerCount"
            onChange={handleChange}
            options={[
              { value: '1', label: '1 người' },
              { value: '2', label: '2 người' },
              { value: '3', label: '3 người' },
              { value: '4', label: '4 người' },
            ]}
            value={formData.travelerCount}
          />
          <FormField
            as="select"
            label="Lịch khởi hành"
            name="departureId"
            onChange={handleChange}
            options={tour.departures.map((item) => ({
              value: item.id,
              label: `${formatDate(item.date)} - ${item.label} - ${formatCurrency(item.price)}`,
            }))}
            value={formData.departureId}
          />
          <FormField
            as="textarea"
            label="Ghi chú thêm"
            name="note"
            onChange={handleChange}
            placeholder="Ví dụ: ăn chay, cần xếp chỗ ngồi..."
            value={formData.note}
          />
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Đang giữ chỗ cho bạn...' : 'Tiếp tục đến bước thanh toán'}
          </button>
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        </form>

        <aside className="summary-card">
          <p className="section-eyebrow">Tóm tắt đơn đặt</p>
          <h2>{tour.title}</h2>
          <ul className="detail-list">
            <li>Điểm khởi hành: {tour.departurePoint}</li>
            <li>Thời lượng: {tour.duration}</li>
            <li>Lịch chọn: {selectedDeparture ? formatDate(selectedDeparture.date) : 'Chưa chọn'}</li>
            <li>Số khách: {formData.travelerCount}</li>
          </ul>
          <div className="summary-total">
            <span>Tổng tạm tính</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
          <p className="helper-text">Thông tin của bạn sẽ được dùng để giữ chỗ, xác nhận lịch khởi hành và hỗ trợ trước chuyến đi.</p>
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;
