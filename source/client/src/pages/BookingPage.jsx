import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { getTourDetail } from '../services/mockApi.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

function BookingPage() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelerCount: '2',
    departureId: '',
    note: '',
  });

  useEffect(() => {
    async function loadTour() {
      const data = await getTourDetail(tourId);
      setTour(data);
      if (data?.departures?.[0]) {
        setFormData((current) => ({ ...current, departureId: data.departures[0].id }));
      }
    }

    loadTour();
  }, [tourId]);

  const selectedDeparture = useMemo(() => {
    return tour?.departures.find((item) => item.id === formData.departureId);
  }, [formData.departureId, tour]);

  const totalPrice = Number(formData.travelerCount || 0) * (selectedDeparture?.price ?? 0);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const searchParams = new URLSearchParams({
      tourId,
      departureId: formData.departureId,
      travelers: formData.travelerCount,
      fullName: formData.fullName,
      email: formData.email,
      totalPrice: String(totalPrice),
    });

    navigate(`/payment/mock-checkout?${searchParams.toString()}`);
  }

  if (!tour) {
    return null;
  }

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <p className="section-eyebrow">Trang đặt tour</p>
        <h1>Hoàn thiện thông tin đặt chỗ trước khi sang thanh toán.</h1>
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
          <button className="button button-primary full-width" type="submit">
            Tiếp tục sang thanh toán
          </button>
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
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;
