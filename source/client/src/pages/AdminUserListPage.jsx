import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import { adminUserRoleOptions, adminUserStatusOptions } from '../data/adminMockData.js';
import { getAdminUsers, toggleAdminUserDeleteFlag, updateAdminUser } from '../services/adminUserService.js';
import { formatCurrency } from '../utils/formatters.js';
import { formatDateTime, getAdminRoleLabel, getAdminUserStatusLabel } from '../utils/adminFormatters.js';

/**
 * Danh sach nguoi dung cho admin, gom loc nhanh va mot so thao tac co ban ngay tren bang.
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
   * Tai danh sach user tu mock service de list va detail dung chung du lieu.
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
   * Cap nhat nhanh trang thai active/inactive ngay tren bang de admin thao tac nhanh.
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
   * Dao trang thai xoa mem de admin co the thu nghiem day du luong user management.
   */
  async function handleToggleDelete(userId, deleteFlg) {
    const shouldContinue = window.confirm(
      deleteFlg ? 'Ban muon khoi phuc tai khoan nay?' : 'Ban muon danh dau xoa mem tai khoan nay?',
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

  // Giu bo loc o client de nguoi moi de theo doi luong xu ly ngay trong page.
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
          title="Bang quan ly nguoi dung"
          description="Trang nay mo phong dung luong admin xem danh sach, loc user, doi trang thai nhanh va di vao chi tiet."
        />

        <div className="admin-filter-grid">
          <label className="form-field">
            <span>Tim theo ten, email hoac ma user</span>
            <input
              placeholder="Vi du: chau@example.com hoac USR-001"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </label>

          <label className="form-field">
            <span>Loc theo vai tro</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              {adminUserRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Loc theo trang thai</span>
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
            <h2>Danh sach ket qua</h2>
            <p className="helper-text">
              Hien co {filteredUsers.length} user phu hop bo loc. Click vao chi tiet de xem day du luong cap nhat.
            </p>
          </div>
          <button className="button button-secondary" type="button" onClick={loadUsers}>
            Tai lai mock data hien tai
          </button>
        </div>

        {isLoading ? (
          <p className="helper-text">Dang tai danh sach nguoi dung...</p>
        ) : filteredUsers.length ? (
          <div className="admin-table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nguoi dung</th>
                  <th>Vai tro</th>
                  <th>Trang thai</th>
                  <th>Booking</th>
                  <th>Tong chi</th>
                  <th>Lan dang nhap</th>
                  <th>Thao tac</th>
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
                        {user.deleteFlg ? 'Da xoa mem' : getAdminUserStatusLabel(user.status)}
                      </span>
                    </td>
                    <td>{user.bookingCount}</td>
                    <td>{formatCurrency(user.totalSpent)}</td>
                    <td>{formatDateTime(user.lastLoginAt)}</td>
                    <td>
                      <div className="admin-table-actions">
                        <Link className="button button-secondary" to={`/admin/users/${user.id}`}>
                          Chi tiet
                        </Link>
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => handleQuickStatusChange(user.id, user.status)}
                        >
                          {user.status === 'active' ? 'Tam ngung' : 'Kich hoat'}
                        </button>
                        <button
                          className="button button-dark"
                          type="button"
                          onClick={() => handleToggleDelete(user.id, user.deleteFlg)}
                        >
                          {user.deleteFlg ? 'Khoi phuc' : 'Xoa mem'}
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
            <h3>Khong co user nao phu hop bo loc</h3>
            <p>Thu xoa tu khoa tim kiem hoac doi bo loc vai tro, trang thai de xem them du lieu.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminUserListPage;
