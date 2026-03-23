import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout.jsx';
import BookingDetailPage from '../pages/BookingDetailPage.jsx';
import BookingHistoryPage from '../pages/BookingHistoryPage.jsx';
import BookingPage from '../pages/BookingPage.jsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import PaymentPage from '../pages/PaymentPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import TourDetailPage from '../pages/TourDetailPage.jsx';
import TourListPage from '../pages/TourListPage.jsx';

/**
 * Khai báo toàn bộ route người dùng của giai đoạn frontend, bao gồm cả route fallback.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />} path="/">
        <Route index element={<HomePage />} />
        <Route element={<TourListPage />} path="tours" />
        <Route element={<TourDetailPage />} path="tours/:tourId" />
        <Route element={<RegisterPage />} path="register" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<ForgotPasswordPage />} path="forgot-password" />
        <Route element={<BookingPage />} path="booking/:tourId" />
        <Route element={<PaymentPage />} path="payment/:bookingId" />
        <Route element={<BookingHistoryPage />} path="bookings" />
        <Route element={<BookingDetailPage />} path="bookings/:bookingId" />
      </Route>
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default AppRoutes;
