import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Specify the port
    host: 'localhost',  // Bind to localhost
    strictPort: true,  // Ensures Vite uses the specified port only
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend API server
        changeOrigin: true,
        secure: false
      }
    }
  }
});