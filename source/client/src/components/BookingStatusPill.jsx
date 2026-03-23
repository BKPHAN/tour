import { getPaymentLabel, getStatusLabel } from '../utils/formatters.js';

/**
 * Hiển thị trạng thái booking và trạng thái thanh toán dưới dạng pill.
 */
function BookingStatusPill({ status, paymentStatus }) {
  return (
    <div className="status-group">
      <span className={`status-pill status-${status}`}>{getStatusLabel(status)}</span>
      {paymentStatus ? (
        <span className={`status-pill payment-${paymentStatus}`}>{getPaymentLabel(paymentStatus)}</span>
      ) : null}
    </div>
  );
}

export default BookingStatusPill;
