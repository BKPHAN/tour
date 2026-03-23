import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AmbientEffect from '../components/AmbientEffect.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { applyTheme, DARK_THEME, getInitialTheme, LIGHT_THEME, saveTheme } from '../services/themeService.js';

/**
 * Shared user layout that keeps the selected color theme in sync across the whole client.
 */
function UserLayout() {
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  useEffect(() => {
    // Apply and persist the active theme so every page shares the same visual mode.
    applyTheme(themeMode);
    saveTheme(themeMode);
  }, [themeMode]);

  /**
   * Toggle between light mode and dark mode from the shared header control.
   */
  function handleToggleTheme() {
    setThemeMode((currentTheme) => (currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  }

  return (
    <div className="page-shell">
      <AmbientEffect />
      <div className="page-shell-content">
        <Header themeMode={themeMode} onToggleTheme={handleToggleTheme} />
        <main className="page-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default UserLayout;
