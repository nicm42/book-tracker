import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 8000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getbooks': {
        target: `http://localhost:${port}`,
        changeOrigin: true,
      },
      '/addbook': {
        target: `http://localhost:${port}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.js',
  },
});
