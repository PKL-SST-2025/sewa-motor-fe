import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    tailwindcss(),
    solidPlugin(),
  ],
  server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // Your Axum backend address
          changeOrigin: true,
        },
      },
    },
  build: {
    target: 'esnext',
  },
});