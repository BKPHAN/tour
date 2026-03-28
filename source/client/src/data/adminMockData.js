export const adminPortalRoles = ['admin', 'staff'];

export const adminLoginAccounts = [
  {
    id: 'ADM-001',
    loginId: 'admin',
    email: 'admin@tourflow.vn',
    password: 'admin123',
    fullName: 'Trần Hải An',
    role: 'admin',
    title: 'Quản trị hệ thống',
  },
  {
    id: 'STF-001',
    loginId: 'staff',
    email: 'linh.ops@tourflow.vn',
    password: 'staff123',
    fullName: 'Võ Khánh Linh',
    role: 'staff',
    title: 'Nhân viên vận hành',
  },
];

export const adminUserRoleOptions = [
  { value: 'all', label: 'Tất cả vai trò' },
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'staff', label: 'Nhân viên' },
  { value: 'user', label: 'Người dùng' },
];

export const adminUserStatusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'inactive', label: 'Tạm ngưng' },
  { value: 'blocked', label: 'Bị khóa' },
];

export const editableUserRoleOptions = adminUserRoleOptions.filter((option) => option.value !== 'all');
export const editableUserStatusOptions = adminUserStatusOptions.filter((option) => option.value !== 'all');

const adminSeedUsers = [
  {
    id: 'USR-001',
    fullName: 'Nguyễn Minh Châu',
    email: 'chau@example.com',
    phone: '0908123456',
    role: 'user',
    status: 'active',
    deleteFlg: false,
    createdAt: '2026-01-14T08:30:00',
    lastLoginAt: '2026-03-25T20:15:00',
    bookingCount: 4,
    totalSpent: 23560000,
    city: 'Hà Nội',
    loyaltyLevel: 'Gold',
    internalNote: 'Thường đặt tour gia đình và phản hồi nhanh qua email.',
    recentActivities: [
      {
        time: '2026-03-25T20:15:00',
        title: 'Đăng nhập thành công',
        detail: 'Người dùng vừa đăng nhập để xem lịch sử booking và tour sắp tới.',
      },
      {
        time: '2026-03-14T09:24:00',
        title: 'Thanh toán booking',
        detail: 'Đã thanh toán booking BK-2026-001 bằng thẻ nội địa.',
      },
    ],
  },
  {
    id: 'USR-002',
    fullName: 'Lê Quốc Anh',
    email: 'anh@example.com',
    phone: '0911222333',
    role: 'user',
    status: 'inactive',
    deleteFlg: false,
    createdAt: '2026-02-02T10:05:00',
    lastLoginAt: '2026-03-18T11:12:00',
    bookingCount: 1,
    totalSpent: 13170000,
    city: 'Đà Nẵng',
    loyaltyLevel: 'Silver',
    internalNote: 'Cần gọi nhắc thanh toán booking đang chờ xác nhận.',
    recentActivities: [
      {
        time: '2026-03-18T11:12:00',
        title: 'Chờ thanh toán',
        detail: 'Hệ thống đang giữ chỗ tạm thời cho booking BK-2026-002.',
      },
      {
        time: '2026-02-02T10:05:00',
        title: 'Tạo tài khoản mới',
        detail: 'Đăng ký bằng email và số điện thoại cá nhân.',
      },
    ],
  },
  {
    id: 'USR-003',
    fullName: 'Phạm Gia Huy',
    email: 'huy@example.com',
    phone: '0988777666',
    role: 'user',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-12-19T14:20:00',
    lastLoginAt: '2026-03-21T07:45:00',
    bookingCount: 6,
    totalSpent: 40280000,
    city: 'Cần Thơ',
    loyaltyLevel: 'Platinum',
    internalNote: 'Nhóm khách thân thiết, ưu tiên gợi ý tour nghỉ dưỡng.',
    recentActivities: [
      {
        time: '2026-03-21T07:45:00',
        title: 'Xem tour mới',
        detail: 'Đã mở 3 trang tour biển nghỉ dưỡng trong phiên đăng nhập gần nhất.',
      },
      {
        time: '2026-03-02T08:45:00',
        title: 'Thanh toán ví điện tử',
        detail: 'Đã thanh toán thành công booking BK-2026-003.',
      },
    ],
  },
  {
    id: 'USR-004',
    fullName: 'Võ Khánh Linh',
    email: 'linh.ops@tourflow.vn',
    phone: '0933444555',
    role: 'staff',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-11-06T09:10:00',
    lastLoginAt: '2026-03-26T08:10:00',
    bookingCount: 0,
    totalSpent: 0,
    city: 'Hồ Chí Minh',
    loyaltyLevel: 'Internal',
    internalNote: 'Nhân viên chăm sóc khách hàng, phụ trách xác nhận booking trong ngày.',
    recentActivities: [
      {
        time: '2026-03-26T08:10:00',
        title: 'Kiểm tra danh sách booking',
        detail: 'Nhân viên vừa truy cập khu vực quản trị để đối soát booking mới.',
      },
      {
        time: '2026-03-24T16:40:00',
        title: 'Cập nhật ghi chú nội bộ',
        detail: 'Đã bổ sung ghi chú ưu tiên liên hệ khách hàng đang chờ xác nhận.',
      },
    ],
  },
  {
    id: 'USR-005',
    fullName: 'Trần Bảo Nam',
    email: 'nam.admin@tourflow.vn',
    phone: '0977555666',
    role: 'admin',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-10-10T08:00:00',
    lastLoginAt: '2026-03-26T07:40:00',
    bookingCount: 0,
    totalSpent: 0,
    city: 'Hà Nội',
    loyaltyLevel: 'Internal',
    internalNote: 'Tài khoản quản trị thứ hai dùng để đối soát hệ thống và phân quyền.',
    recentActivities: [
      {
        time: '2026-03-26T07:40:00',
        title: 'Đăng nhập khu quản trị',
        detail: 'Đã kiểm tra dashboard và luồng quản lý người dùng.',
      },
      {
        time: '2026-03-25T18:05:00',
        title: 'Rà soát vai trò',
        detail: 'Đã kiểm tra các tài khoản staff và admin trước khi triển khai giai đoạn 2.',
      },
    ],
  },
  {
    id: 'USR-006',
    fullName: 'Hoàng Thu Trang',
    email: 'trang@example.com',
    phone: '0899001122',
    role: 'user',
    status: 'blocked',
    deleteFlg: false,
    createdAt: '2026-02-18T13:40:00',
    lastLoginAt: '2026-03-20T19:05:00',
    bookingCount: 2,
    totalSpent: 9680000,
    city: 'Hải Phòng',
    loyaltyLevel: 'Member',
    internalNote: 'Tài khoản tạm khóa để đối soát vì có nhiều lần nhập sai mật khẩu.',
    recentActivities: [
      {
        time: '2026-03-20T19:05:00',
        title: 'Nhập sai mật khẩu nhiều lần',
        detail: 'Hệ thống đã tạm khóa và chuyển sang hàng đợi cần xử lý.',
      },
      {
        time: '2026-03-01T15:22:00',
        title: 'Yêu cầu hỗ trợ',
        detail: 'Người dùng gọi tổng đài để nhờ xác minh email đăng nhập.',
      },
    ],
  },
  {
    id: 'USR-007',
    fullName: 'Đặng Hải Yến',
    email: 'yen@example.com',
    phone: '0866888999',
    role: 'user',
    status: 'inactive',
    deleteFlg: true,
    createdAt: '2025-09-21T10:15:00',
    lastLoginAt: '2026-01-11T09:55:00',
    bookingCount: 3,
    totalSpent: 15450000,
    city: 'Huế',
    loyaltyLevel: 'Silver',
    internalNote: 'Tài khoản đã được xóa mềm theo yêu cầu ngừng sử dụng.',
    recentActivities: [
      {
        time: '2026-03-12T09:10:00',
        title: 'Đánh dấu xóa mềm',
        detail: 'Admin đã đánh dấu delete_flg để ẩn tài khoản khỏi danh sách vận hành.',
      },
      {
        time: '2026-01-11T09:55:00',
        title: 'Đăng nhập gần cuối',
        detail: 'Người dùng đã xem lịch sử booking trước khi gửi yêu cầu đóng tài khoản.',
      },
    ],
  },
];

/**
 * Chuẩn hóa role cũ về bộ role mới để tránh đứt luồng khi localStorage còn dữ liệu bản cũ.
 */
export function normalizeRole(role) {
  if (role === 'customer') {
    return 'user';
  }

  if (role === 'admin' || role === 'staff' || role === 'user') {
    return role;
  }

  return 'user';
}

/**
 * Tạo bản sao dữ liệu mock để frontend có thể chỉnh sửa mà không làm thay đổi seed gốc.
 */
export function getInitialAdminUsers() {
  return adminSeedUsers.map((user) => ({
    ...user,
    role: normalizeRole(user.role),
    recentActivities: user.recentActivities.map((activity) => ({ ...activity })),
  }));
}
