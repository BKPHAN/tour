import { getPaymentLabel, getStatusLabel } from '../utils/formatters.js';

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
