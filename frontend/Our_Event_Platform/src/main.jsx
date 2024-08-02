import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Adjust the path as per your application structure

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));

// Render your app inside createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)