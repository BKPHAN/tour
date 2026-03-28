import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAdminAuth from '../components/RequireAdminAuth.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import AdminLoginPage from '../pages/admin/AdminLoginPage.jsx';
import AdminUserDetailPage from '../pages/admin/AdminUserDetailPage.jsx';
import AdminUserListPage from '../pages/admin/AdminUserListPage.jsx';
import UserLayout from '../layouts/UserLayout.jsx';
import BookingDetailPage from '../pages/user/BookingDetailPage.jsx';
import BookingHistoryPage from '../pages/user/BookingHistoryPage.jsx';
import BookingPage from '../pages/user/BookingPage.jsx';
import ForgotPasswordPage from '../pages/user/ForgotPasswordPage.jsx';
import HomePage from '../pages/user/HomePage.jsx';
import LoginPage from '../pages/user/LoginPage.jsx';
import PaymentPage from '../pages/user/PaymentPage.jsx';
import RegisterPage from '../pages/user/RegisterPage.jsx';
import TourDetailPage from '../pages/user/TourDetailPage.jsx';
import TourListPage from '../pages/user/TourListPage.jsx';
import RequireAuth from '../components/RequireAuth.jsx';

/**
 * Khai báo toàn bộ route người dùng của giai đoạn frontend, bao gồm cả route fallback.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLoginPage />} path="/admin/login" />
      <Route element={<RequireAdminAuth />} path="/admin">
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route element={<AdminUserListPage />} path="users" />
          <Route element={<AdminUserDetailPage />} path="users/:userId" />
        </Route>
      </Route>

      <Route element={<UserLayout />} path="/">
        <Route index element={<HomePage />} />
        <Route element={<TourListPage />} path="tours" />
        <Route element={<TourDetailPage />} path="tours/:tourId" />
        <Route element={<RegisterPage />} path="register" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<ForgotPasswordPage />} path="forgot-password" />
        <Route element={<RequireAuth />}>
          <Route element={<BookingPage />} path="booking/:tourId" />
          <Route element={<PaymentPage />} path="payment/:bookingId" />
          <Route element={<BookingHistoryPage />} path="bookings" />
          <Route element={<BookingDetailPage />} path="bookings/:bookingId" />
        </Route>
      </Route>
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default AppRoutes;
