import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found. Please ensure your HTML file contains a div with id="root".');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
