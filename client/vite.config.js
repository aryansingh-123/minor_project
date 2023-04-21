import { defineConfig } from "vite";
import { fileURLToPath } from 'url';
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('index.html', import.meta.url)),
        paymentGateway: fileURLToPath(new URL('paymentgateway.html', import.meta.url)),
        login: fileURLToPath(new URL('login.html', import.meta.url)),
        privacyPolicy: fileURLToPath(new URL('privacy.html', import.meta.url)),
        support: fileURLToPath(new URL('support.html', import.meta.url)),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
