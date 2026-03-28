export const adminPortalRoles = ['admin', 'staff'];

export const adminLoginAccounts = [
  {
    id: 'ADM-001',
    loginId: 'admin',
    email: 'admin@tourflow.vn',
    password: 'admin123',
    fullName: 'Tran Hai An',
    role: 'admin',
    title: 'Quan tri he thong',
  },
  {
    id: 'STF-001',
    loginId: 'staff',
    email: 'linh.ops@tourflow.vn',
    password: 'staff123',
    fullName: 'Vo Khanh Linh',
    role: 'staff',
    title: 'Nhan vien van hanh',
  },
];

export const adminUserRoleOptions = [
  { value: 'all', label: 'Tat ca vai tro' },
  { value: 'admin', label: 'Quan tri vien' },
  { value: 'staff', label: 'Nhan vien' },
  { value: 'user', label: 'Nguoi dung' },
];

export const adminUserStatusOptions = [
  { value: 'all', label: 'Tat ca trang thai' },
  { value: 'active', label: 'Dang hoat dong' },
  { value: 'inactive', label: 'Tam ngung' },
  { value: 'blocked', label: 'Bi khoa' },
];

export const editableUserRoleOptions = adminUserRoleOptions.filter((option) => option.value !== 'all');
export const editableUserStatusOptions = adminUserStatusOptions.filter((option) => option.value !== 'all');

const adminSeedUsers = [
  {
    id: 'USR-001',
    fullName: 'Nguyen Minh Chau',
    email: 'chau@example.com',
    phone: '0908123456',
    role: 'user',
    status: 'active',
    deleteFlg: false,
    createdAt: '2026-01-14T08:30:00',
    lastLoginAt: '2026-03-25T20:15:00',
    bookingCount: 4,
    totalSpent: 23560000,
    city: 'Ha Noi',
    loyaltyLevel: 'Gold',
    internalNote: 'Thuong dat tour gia dinh va phan hoi nhanh qua email.',
    recentActivities: [
      {
        time: '2026-03-25T20:15:00',
        title: 'Dang nhap thanh cong',
        detail: 'Nguoi dung vua dang nhap de xem lich su booking va tour sap toi.',
      },
      {
        time: '2026-03-14T09:24:00',
        title: 'Thanh toan booking',
        detail: 'Da thanh toan booking BK-2026-001 bang the noi dia.',
      },
    ],
  },
  {
    id: 'USR-002',
    fullName: 'Le Quoc Anh',
    email: 'anh@example.com',
    phone: '0911222333',
    role: 'user',
    status: 'inactive',
    deleteFlg: false,
    createdAt: '2026-02-02T10:05:00',
    lastLoginAt: '2026-03-18T11:12:00',
    bookingCount: 1,
    totalSpent: 13170000,
    city: 'Da Nang',
    loyaltyLevel: 'Silver',
    internalNote: 'Can goi nhac thanh toan booking dang cho xac nhan.',
    recentActivities: [
      {
        time: '2026-03-18T11:12:00',
        title: 'Cho thanh toan',
        detail: 'He thong dang giu cho tam thoi cho booking BK-2026-002.',
      },
      {
        time: '2026-02-02T10:05:00',
        title: 'Tao tai khoan moi',
        detail: 'Dang ky bang email va so dien thoai ca nhan.',
      },
    ],
  },
  {
    id: 'USR-003',
    fullName: 'Pham Gia Huy',
    email: 'huy@example.com',
    phone: '0988777666',
    role: 'user',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-12-19T14:20:00',
    lastLoginAt: '2026-03-21T07:45:00',
    bookingCount: 6,
    totalSpent: 40280000,
    city: 'Can Tho',
    loyaltyLevel: 'Platinum',
    internalNote: 'Nhom khach than thiet, uu tien goi y tour nghi duong.',
    recentActivities: [
      {
        time: '2026-03-21T07:45:00',
        title: 'Xem tour moi',
        detail: 'Da mo 3 trang tour bien nghi duong trong phien dang nhap gan nhat.',
      },
      {
        time: '2026-03-02T08:45:00',
        title: 'Thanh toan vi dien tu',
        detail: 'Da thanh toan thanh cong booking BK-2026-003.',
      },
    ],
  },
  {
    id: 'USR-004',
    fullName: 'Vo Khanh Linh',
    email: 'linh.ops@tourflow.vn',
    phone: '0933444555',
    role: 'staff',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-11-06T09:10:00',
    lastLoginAt: '2026-03-26T08:10:00',
    bookingCount: 0,
    totalSpent: 0,
    city: 'Ho Chi Minh',
    loyaltyLevel: 'Internal',
    internalNote: 'Nhan vien cham soc khach hang, phu trach xac nhan booking trong ngay.',
    recentActivities: [
      {
        time: '2026-03-26T08:10:00',
        title: 'Kiem tra danh sach booking',
        detail: 'Nhan vien vua truy cap khu vuc quan tri de doi soat booking moi.',
      },
      {
        time: '2026-03-24T16:40:00',
        title: 'Cap nhat ghi chu noi bo',
        detail: 'Da bo sung ghi chu uu tien lien he khach hang dang cho xac nhan.',
      },
    ],
  },
  {
    id: 'USR-005',
    fullName: 'Tran Bao Nam',
    email: 'nam.admin@tourflow.vn',
    phone: '0977555666',
    role: 'admin',
    status: 'active',
    deleteFlg: false,
    createdAt: '2025-10-10T08:00:00',
    lastLoginAt: '2026-03-26T07:40:00',
    bookingCount: 0,
    totalSpent: 0,
    city: 'Ha Noi',
    loyaltyLevel: 'Internal',
    internalNote: 'Tai khoan quan tri thu hai dung de doi soat he thong va phan quyen.',
    recentActivities: [
      {
        time: '2026-03-26T07:40:00',
        title: 'Dang nhap khu quan tri',
        detail: 'Da kiem tra dashboard va luong quan ly nguoi dung.',
      },
      {
        time: '2026-03-25T18:05:00',
        title: 'Ra soat vai tro',
        detail: 'Da kiem tra cac tai khoan staff va admin truoc khi trien khai giai doan 2.',
      },
    ],
  },
  {
    id: 'USR-006',
    fullName: 'Hoang Thu Trang',
    email: 'trang@example.com',
    phone: '0899001122',
    role: 'user',
    status: 'blocked',
    deleteFlg: false,
    createdAt: '2026-02-18T13:40:00',
    lastLoginAt: '2026-03-20T19:05:00',
    bookingCount: 2,
    totalSpent: 9680000,
    city: 'Hai Phong',
    loyaltyLevel: 'Member',
    internalNote: 'Tai khoan tam khoa de doi soat vi co nhieu lan nhap sai mat khau.',
    recentActivities: [
      {
        time: '2026-03-20T19:05:00',
        title: 'Nhap sai mat khau nhieu lan',
        detail: 'He thong da tam khoa va chuyen sang hang doi can xu ly.',
      },
      {
        time: '2026-03-01T15:22:00',
        title: 'Yeu cau ho tro',
        detail: 'Nguoi dung goi tong dai de nho xac minh email dang nhap.',
      },
    ],
  },
  {
    id: 'USR-007',
    fullName: 'Dang Hai Yen',
    email: 'yen@example.com',
    phone: '0866888999',
    role: 'user',
    status: 'inactive',
    deleteFlg: true,
    createdAt: '2025-09-21T10:15:00',
    lastLoginAt: '2026-01-11T09:55:00',
    bookingCount: 3,
    totalSpent: 15450000,
    city: 'Hue',
    loyaltyLevel: 'Silver',
    internalNote: 'Tai khoan da duoc xoa mem theo yeu cau ngung su dung.',
    recentActivities: [
      {
        time: '2026-03-12T09:10:00',
        title: 'Danh dau xoa mem',
        detail: 'Admin da danh dau delete_flg de an tai khoan khoi danh sach van hanh.',
      },
      {
        time: '2026-01-11T09:55:00',
        title: 'Dang nhap gan cuoi',
        detail: 'Nguoi dung da xem lich su booking truoc khi gui yeu cau dong tai khoan.',
      },
    ],
  },
];

/**
 * Chuan hoa role cu ve bo role moi de tranh dut luong khi localStorage con du lieu ban cu.
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
 * Tao ban sao du lieu mock de frontend co the chinh sua ma khong lam thay doi seed goc.
 */
export function getInitialAdminUsers() {
  return adminSeedUsers.map((user) => ({
    ...user,
    role: normalizeRole(user.role),
    recentActivities: user.recentActivities.map((activity) => ({ ...activity })),
  }));
}
