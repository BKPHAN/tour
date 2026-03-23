const THEME_STORAGE_KEY = 'tourflow-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

/**
 * Read the theme persisted in localStorage, or fall back to the user's system preference.
 */
export function getInitialTheme() {
  if (typeof window === 'undefined') {
    return LIGHT_THEME;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === LIGHT_THEME || storedTheme === DARK_THEME) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
}

/**
 * Apply the active theme to the root document so CSS variables can react globally.
 */
export function applyTheme(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

/**
 * Persist the chosen theme to keep the same interface on the next visit.
 */
export function saveTheme(theme) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export { DARK_THEME, LIGHT_THEME };
