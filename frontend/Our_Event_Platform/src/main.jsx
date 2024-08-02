import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider
import App from './App'; // Adjust the path as per your application structure

//const clientId = '81184973677-flf5epmfiasnla01on6u1o89r6c9rmcq.apps.googleusercontent.com'; // Replace with your actual Google Client ID

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));

// Render your app inside createRoot
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='81184973677-flf5epmfiasnla01on6u1o89r6c9rmcq.apps.googleusercontent.com'>  
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);