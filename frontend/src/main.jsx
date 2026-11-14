import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/home.css';
import './styles/responsive-hardening.css';
import './motion/motion.css';
import './styles/responsive-final.css';
import { initMotion } from './motion/motion.js';

// Homepage only — project pages keep their own motion.
if (window.location.pathname === '/') initMotion();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
