import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

/**
 * Bố cục chung cho phần người dùng, giữ header và footer cố định quanh nội dung trang.
 */
function UserLayout() {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
