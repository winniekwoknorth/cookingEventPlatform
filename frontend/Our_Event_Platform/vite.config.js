import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const env = loadEnv(
  'all',
  process.cwd()
);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_SERVER_TARGET,
        changeOrigin: true,
        secure: false
      }
    }
  }
});