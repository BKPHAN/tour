const roleLabels = {
  admin: 'Quản trị viên',
  staff: 'Nhân viên',
  user: 'Người dùng',
};

const statusLabels = {
  active: 'Đang hoạt động',
  inactive: 'Tạm ngưng',
  blocked: 'Bị khóa',
};

/**
 * Định dạng ngày giờ cho các màn hình quản trị cần xem thông tin gần nhất.
 */
export function formatDateTime(value) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

/**
 * Trả về nhãn vai trò để bảng và form quản trị hiển thị dễ đọc hơn.
 */
export function getAdminRoleLabel(role) {
  return roleLabels[role] ?? role;
}

/**
 * Trả về nhãn trạng thái tài khoản cho giao diện quản lý người dùng.
 */
export function getAdminUserStatusLabel(status) {
  return statusLabels[status] ?? status;
}
