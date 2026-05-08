/**
 * Định dạng số tiền theo chuẩn tiền Việt Nam để hiển thị trên giao diện.
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Chuyển giá trị ngày sang định dạng dd/mm/yyyy cho người dùng Việt Nam.
 */
export function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

/**
 * Map mã trạng thái booking sang nhãn tiếng Việt để hiển thị trên UI.
 */
export function getStatusLabel(status) {
  const labels = {
    confirmed: 'Đã xác nhận',
    pending: 'Chờ thanh toán',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
  };

  return labels[status] ?? status;
}

/**
 * Map mã trạng thái thanh toán sang nhãn hiển thị tương ứng.
 */
export function getPaymentLabel(status) {
  const labels = {
    paid: 'Đã thanh toán',
    waiting: 'Chờ thanh toán',
    refunded: 'Đã hoàn tiền',
    failed: 'Thanh toán thất bại',
  };

  return labels[status] ?? status;
}

export function getPayosStatusLabel(status) {
  const normalizedStatus = String(status || '').trim().toUpperCase();
  const labels = {
    CANCELLED: 'Đã hủy thanh toán',
    EXPIRED: 'Mã QR đã hết hạn',
    FAILED: 'Thanh toán thất bại',
    PAID: 'Đã thanh toán',
    PENDING: 'Chờ thanh toán',
    PROCESSING: 'Đang xử lý',
    UNDERPAID: 'Thanh toán thiếu',
  };

  return labels[normalizedStatus] ?? status;
}
