import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // If using routing
import './index.css';
import App from './App.js'; // Updated import to .jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap if using routes */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);