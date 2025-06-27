import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TechBuzz from './pages/TechBuzz';

// Initialize Firebase
import './firebase/config';

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(

    <App />
);
