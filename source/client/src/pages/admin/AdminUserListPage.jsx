import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading.jsx';
import { adminUserRoleOptions, adminUserStatusOptions } from '../../data/adminMockData.js';
import { getAdminUsers, toggleAdminUserDeleteFlag, updateAdminUser } from '../../services/admin/adminUserService.js';
import { formatCurrency } from '../../utils/formatters.js';
import { formatDateTime, getAdminRoleLabel, getAdminUserStatusLabel } from '../../utils/adminFormatters.js';

/**
 * Danh sách người dùng cho admin, gồm lọc nhanh và một số thao tác cơ bản ngay trên bảng.
 */
function AdminUserListPage() {
  const [userList, setUserList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  /**
   * Tải danh sách user từ mock service để list và detail dùng chung dữ liệu.
   */
  async function loadUsers() {
    setIsLoading(true);

    try {
      const users = await getAdminUsers();
      setUserList(users);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Cập nhật nhanh trạng thái active/inactive ngay trên bảng để admin thao tác nhanh.
   */
  async function handleQuickStatusChange(userId, currentStatus) {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const updatedUser = await updateAdminUser(userId, { status: nextStatus, deleteFlg: false });
      setUserList((currentUsers) =>
        currentUsers.map((user) => (user.id === userId ? updatedUser : user)),
      );
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  /**
   * Đảo trạng thái xóa mềm để admin có thể thử nghiệm đầy đủ luồng user management.
   */
  async function handleToggleDelete(userId, deleteFlg) {
    const shouldContinue = window.confirm(
      deleteFlg ? 'Bạn muốn khôi phục tài khoản này?' : 'Bạn muốn đánh dấu xóa mềm tài khoản này?',
    );

    if (!shouldContinue) {
      return;
    }

    try {
      const updatedUser = await toggleAdminUserDeleteFlag(userId);
      setUserList((currentUsers) =>
        currentUsers.map((user) => (user.id === userId ? updatedUser : user)),
      );
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Giữ bộ lọc ở client để người mới dễ theo dõi luồng xử lý ngay trong page.
  const filteredUsers = useMemo(() => {
    const normalizedKeyword = searchKeyword.trim().toLowerCase();

    return userList.filter((user) => {
      const matchesKeyword =
        !normalizedKeyword ||
        user.fullName.toLowerCase().includes(normalizedKeyword) ||
        user.email.toLowerCase().includes(normalizedKeyword) ||
        user.phone.includes(normalizedKeyword) ||
        user.id.toLowerCase().includes(normalizedKeyword);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesKeyword && matchesRole && matchesStatus;
    });
  }, [roleFilter, searchKeyword, statusFilter, userList]);

  return (
    <div className="page-stack">
      <section className="content-card">
        <SectionHeading
          eyebrow="User management"
          title="Bảng quản lý người dùng"
          description="Trang này mô phỏng đúng luồng admin xem danh sách, lọc user, đổi trạng thái nhanh và đi vào chi tiết."
        />

        <div className="admin-filter-grid">
          <label className="form-field">
            <span>Tìm theo tên, email hoặc mã user</span>
            <input
              placeholder="Ví dụ: chau@example.com hoặc USR-001"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </label>

          <label className="form-field">
            <span>Lọc theo vai trò</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              {adminUserRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Lọc theo trạng thái</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {adminUserStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}

      <section className="content-card">
        <div className="section-heading-row admin-table-header">
          <div>
            <h2>Danh sách kết quả</h2>
            <p className="helper-text">
              Hiện có {filteredUsers.length} user phù hợp bộ lọc. Click vào chi tiết để xem đầy đủ luồng cập nhật.
            </p>
          </div>
          <button className="button button-secondary" type="button" onClick={loadUsers}>
            Tải lại mock data hiện tại
          </button>
        </div>

        {isLoading ? (
          <p className="helper-text">Đang tải danh sách người dùng...</p>
        ) : filteredUsers.length ? (
          <div className="admin-table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Booking</th>
                  <th>Tổng chi</th>
                  <th>Lần đăng nhập</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-table-user">
                        <strong>{user.fullName}</strong>
                        <span>{user.id}</span>
                        <p>{user.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className="chip">{getAdminRoleLabel(user.role)}</span>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          user.deleteFlg
                            ? 'admin-badge-muted'
                            : user.status === 'blocked'
                              ? 'admin-badge-danger'
                              : user.status === 'inactive'
                                ? 'admin-badge-warning'
                                : 'admin-badge-success'
                        }`}
                      >
                        {user.deleteFlg ? 'Đã xóa mềm' : getAdminUserStatusLabel(user.status)}
                      </span>
                    </td>
                    <td>{user.bookingCount}</td>
                    <td>{formatCurrency(user.totalSpent)}</td>
                    <td>{formatDateTime(user.lastLoginAt)}</td>
                    <td>
                      <div className="admin-table-actions">
                        <Link className="button button-secondary" to={`/admin/users/${user.id}`}>
                          Chi tiết
                        </Link>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => handleQuickStatusChange(user.id, user.status)}
                        >
                          {user.status === 'active' ? 'Tạm ngưng' : 'Kích hoạt'}
                        </button>
                        <button
                          className="button button-dark"
                          type="button"
                          onClick={() => handleToggleDelete(user.id, user.deleteFlg)}
                        >
                          {user.deleteFlg ? 'Khôi phục' : 'Xóa mềm'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-state">
            <h3>Không có user nào phù hợp bộ lọc</h3>
            <p>Thử xóa từ khóa tìm kiếm hoặc đổi bộ lọc vai trò, trạng thái để xem thêm dữ liệu.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminUserListPage;
