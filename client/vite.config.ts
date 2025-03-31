import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allow all incoming requests
    port: process.env.PORT || 3000,  // Use the port specified by Render or fallback to 3000
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Make sure this matches your backend's URL
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',  // Ensure auth routes are also correctly proxied
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      'kanban-board.onrender.com',  // Replace this with your actual Render URL
    ],
  },
});
