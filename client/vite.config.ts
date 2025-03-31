import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allow all incoming requests (necessary for Render)
    port: Number(process.env.PORT) || 3000,  // Use the port specified by Render or fallback to 3000 locally
    open: true,  // Open the browser automatically when the dev server starts
    proxy: {
      // Proxy requests to the backend API
      '/api': {
        target: 'http://localhost:3001',  // Make sure this matches your backend's URL
        changeOrigin: true,  // Adjusts the origin of the request
        secure: false,  // Allow insecure requests (useful for development)
      },
      '/auth': {
        target: 'http://localhost:3001',  // Ensure auth routes are also correctly proxied
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
