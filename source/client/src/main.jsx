import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { applyTheme, getInitialTheme } from './services/themeService.js';
import './styles/admin.css';
import './styles/global.css';

// Apply the saved theme before the app mounts to reduce flicker during refresh.
applyTheme(getInitialTheme());

// Boot the React client and keep routing available for every user-facing page.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
