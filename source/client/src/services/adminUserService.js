import { getInitialAdminUsers, normalizeRole } from '../data/adminMockData.js';
import { getAdminRoleLabel, getAdminUserStatusLabel } from '../utils/adminFormatters.js';

const ADMIN_USERS_STORAGE_KEY = 'tourflow-admin-users';

/**
 * Tao do tre nho de page admin mo phong luong goi API that.
 */
function wait(ms = 140) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Tao object Error co kem status de page xu ly thong diep ro rang hon.
 */
function createServiceError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

/**
 * Lay danh sach user mock tu localStorage, neu chua co thi seed du lieu ban dau.
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
 * Luu lai danh sach user sau moi thao tac cap nhat de list va detail dung chung mot nguon du lieu.
 */
function saveStoredAdminUsers(users) {
  window.localStorage.setItem(ADMIN_USERS_STORAGE_KEY, JSON.stringify(users));
}

/**
 * Gom nhung thay doi chinh thanh cau mo ta de dua vao lich su thao tac.
 */
function buildUpdateSummary(previousUser, nextUser) {
  const changedParts = [];

  if (previousUser.role !== nextUser.role) {
    changedParts.push(`doi vai tro thanh ${getAdminRoleLabel(nextUser.role)}`);
  }

  if (previousUser.status !== nextUser.status) {
    changedParts.push(`doi trang thai thanh ${getAdminUserStatusLabel(nextUser.status)}`);
  }

  if (previousUser.deleteFlg !== nextUser.deleteFlg) {
    changedParts.push(nextUser.deleteFlg ? 'danh dau xoa mem tai khoan' : 'khoi phuc tai khoan');
  }

  if (previousUser.internalNote !== nextUser.internalNote) {
    changedParts.push('cap nhat ghi chu noi bo');
  }

  if (
    previousUser.email !== nextUser.email ||
    previousUser.phone !== nextUser.phone ||
    previousUser.fullName !== nextUser.fullName
  ) {
    changedParts.push('chinh sua thong tin co ban');
  }

  if (!changedParts.length) {
    return 'Luu lai ho so ma khong thay doi truong du lieu quan trong.';
  }

  return `Admin vua ${changedParts.join(', ')}.`;
}

/**
 * Them mot moc lich su moi len dau danh sach de de theo doi luong admin thao tac.
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
 * Lay toan bo danh sach nguoi dung cho man hinh admin.
 */
export async function getAdminUsers() {
  await wait();
  return getStoredAdminUsers();
}

/**
 * Lay chi tiet mot user theo id de dung cho man hinh detail va edit.
 */
export async function getAdminUserDetail(userId) {
  await wait();

  const user = getStoredAdminUsers().find((item) => item.id === userId);

  if (!user) {
    throw createServiceError('Khong tim thay nguoi dung can quan ly.', 404);
  }

  return user;
}

/**
 * Cap nhat ho so user ngay tren mock storage de frontend co the demo luong sua thong tin.
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

    updatedUser = prependActivity(mergedUser, 'Ho so duoc cap nhat', activityDetail);
    return updatedUser;
  });

  if (!updatedUser) {
    throw createServiceError('Khong tim thay nguoi dung de cap nhat.', 404);
  }

  saveStoredAdminUsers(nextUsers);
  return updatedUser;
}

/**
 * Dao trang thai xoa mem de admin co the an hoac khoi phuc tai khoan ngay tren frontend.
 */
export async function toggleAdminUserDeleteFlag(userId) {
  await wait();

  const users = getStoredAdminUsers();
  const currentUser = users.find((user) => user.id === userId);

  if (!currentUser) {
    throw createServiceError('Khong tim thay nguoi dung de doi trang thai xoa mem.', 404);
  }

  return updateAdminUser(userId, {
    deleteFlg: !currentUser.deleteFlg,
    status: currentUser.deleteFlg ? 'active' : 'inactive',
  });
}

/**
 * Tong hop so lieu cho dashboard quan tri nguoi dung.
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
