import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No tailwindcss plugin — we use pure CSS now
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5174,
    strictPort: true,
  },
});
