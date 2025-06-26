// index.js (React 18+ 방식)
import React from 'react';
import ReactDOM from 'react-dom/client';  // ← 여기 중요
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
