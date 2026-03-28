const roleLabels = {
  admin: 'Quan tri vien',
  staff: 'Nhan vien',
  user: 'Nguoi dung',
};

const statusLabels = {
  active: 'Dang hoat dong',
  inactive: 'Tam ngung',
  blocked: 'Bi khoa',
};

/**
 * Dinh dang ngay gio cho cac man hinh quan tri can xem thong tin gan nhat.
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
 * Tra ve nhan vai tro de bang va form quan tri hien thi de doc hon.
 */
export function getAdminRoleLabel(role) {
  return roleLabels[role] ?? role;
}

/**
 * Tra ve nhan trang thai tai khoan cho giao dien quan ly nguoi dung.
 */
export function getAdminUserStatusLabel(status) {
  return statusLabels[status] ?? status;
}
