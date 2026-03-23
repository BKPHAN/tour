import { Outlet } from 'react-router-dom';
import AmbientEffect from '../components/AmbientEffect.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

/**
 * Bố cục chung cho phần người dùng, giữ header và footer cố định quanh nội dung trang.
 */
function UserLayout() {
  return (
    <div className="page-shell">
      <AmbientEffect />
      <div className="page-shell-content">
        <Header />
        <main className="page-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
