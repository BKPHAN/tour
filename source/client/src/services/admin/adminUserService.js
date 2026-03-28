import { getInitialAdminUsers, normalizeRole } from '../../data/adminMockData.js';
import { getAdminRoleLabel, getAdminUserStatusLabel } from '../../utils/adminFormatters.js';

const ADMIN_USERS_STORAGE_KEY = 'tourflow-admin-users';

/**
 * Tạo độ trễ nhỏ để page admin mô phỏng luồng gọi API thật.
 */
function wait(ms = 140) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Tạo object Error có kèm status để page xử lý thông điệp rõ ràng hơn.
 */
function createServiceError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

/**
 * Lấy danh sách user mock từ localStorage, nếu chưa có thì seed dữ liệu ban đầu.
 */
function getStoredAdminUsers() {
  const rawValue = window.localStorage.getItem(ADMIN_USERS_STORAGE_KEY);

  if (!rawValue) {
    const initialUsers = getInitialAdminUsers();
    window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }

  try {
    return JSON.parse(rawValue).map((user) => ({
      ...user,
      role: normalizeRole(user.role),
    }));
  } catch (error) {
    const fallbackUsers = getInitialAdminUsers();
    window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(fallbackUsers));
    return fallbackUsers;
  }
}

/**
 * Lưu lại danh sách user sau mỗi thao tác cập nhật để list và detail dùng chung một nguồn dữ liệu.
 */
function saveStoredAdminUsers(users) {
  window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Gom những thay đổi chính thành câu mô tả để đưa vào lịch sử thao tác.
 */
function buildUpdateSummary(previousUser, nextUser) {
  const changedParts = [];

  if (previousUser.role !== nextUser.role) {
    changedParts.push(`đổi vai trò thành ${getAdminRoleLabel(nextUser.role)}`);
  }

  if (previousUser.status !== nextUser.status) {
    changedParts.push(`đổi trạng thái thành ${getAdminUserStatusLabel(nextUser.status)}`);
  }

  if (previousUser.deleteFlg !== nextUser.deleteFlg) {
    changedParts.push(nextUser.deleteFlg ? 'đánh dấu xóa mềm tài khoản' : 'khôi phục tài khoản');
  }

  if (previousUser.internalNote !== nextUser.internalNote) {
    changedParts.push('cập nhật ghi chú nội bộ');
  }

  if (
    previousUser.email !== nextUser.email ||
    previousUser.phone !== nextUser.phone ||
    previousUser.fullName !== nextUser.fullName
  ) {
    changedParts.push('chỉnh sửa thông tin cơ bản');
  }

  if (!changedParts.length) {
    return 'Lưu lại hồ sơ mà không thay đổi trường dữ liệu quan trọng.';
  }

  return `Admin vừa ${changedParts.join(', ')}.`;
}

/**
 * Thêm một mốc lịch sử mới lên đầu danh sách để dễ theo dõi luồng admin thao tác.
 */
function prependActivity(user, title, detail) {
  return {
    ...user,
    recentActivities: [
      {
        time: new Date().toISOString(),
        title,
        detail,
      },
      ...user.recentActivities,
    ].slice(0, 5),
  };
}

/**
 * Lấy toàn bộ danh sách người dùng cho màn hình admin.
 */
export async function getAdminUsers() {
  await wait();
  return getStoredAdminUsers();
}

/**
 * Lấy chi tiết một user theo id để dùng cho màn hình detail và edit.
 */
export async function getAdminUserDetail(userId) {
  await wait();

  const user = getStoredAdminUsers().find((item) => item.id === userId);

  if (!user) {
    throw createServiceError('Không tìm thấy người dùng cần quản lý.', 404);
  }

  return user;
}

/**
 * Cập nhật hồ sơ user ngay trên mock storage để frontend có thể demo luồng sửa thông tin.
 */
export async function updateAdminUser(userId, payload) {
  await wait();

  const users = getStoredAdminUsers();
  let updatedUser = null;

  const nextUsers = users.map((user) => {
    if (user.id !== userId) {
      return user;
    }

    const mergedUser = {
      ...user,
      ...payload,
      role: normalizeRole(payload.role ?? user.role),
    };
    const activityDetail = buildUpdateSummary(user, mergedUser);

    updatedUser = prependActivity(mergedUser, 'Hồ sơ được cập nhật', activityDetail);
    return updatedUser;
  });

  if (!updatedUser) {
    throw createServiceError('Không tìm thấy người dùng để cập nhật.', 404);
  }

  saveStoredAdminUsers(nextUsers);
  return updatedUser;
}

/**
 * Đảo trạng thái xóa mềm để admin có thể ẩn hoặc khôi phục tài khoản ngay trên frontend.
 */
export async function toggleAdminUserDeleteFlag(userId) {
  await wait();

  const users = getStoredAdminUsers();
  const currentUser = users.find((user) => user.id === userId);

  if (!currentUser) {
    throw createServiceError('Không tìm thấy người dùng để đổi trạng thái xóa mềm.', 404);
  }

  return updateAdminUser(userId, {
    deleteFlg: !currentUser.deleteFlg,
    status: currentUser.deleteFlg ? 'active' : 'inactive',
  });
}

/**
 * Tổng hợp số liệu cho dashboard quản trị người dùng.
 */
export async function getAdminDashboardSummary() {
  const users = await getAdminUsers();

  return {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === 'active' && !user.deleteFlg).length,
    attentionUsers: users.filter((user) => user.status !== 'active' || user.deleteFlg).length,
    deletedUsers: users.filter((user) => user.deleteFlg).length,
    adminUsers: users.filter((user) => user.role === 'admin').length,
    totalRevenue: users.reduce((total, user) => total + user.totalSpent, 0),
  };
}
