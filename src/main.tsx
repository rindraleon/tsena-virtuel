import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Global error handler for debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  document.getElementById('root')!.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; color: red;">
      <h2>Erreur JavaScript</h2>
      <pre style="background: #fee; padding: 10px; border-radius: 4px; overflow: auto;">${event.error?.message || event.message}</pre>
      <p>Veuillez ouvrir la console du navigateur (F12) pour plus de détails.</p>
    </div>
  `;
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Starting Tsena...');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
