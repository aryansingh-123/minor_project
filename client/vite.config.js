import { defineConfig } from "vite";
import { fileURLToPath } from 'url';
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      'jwt-decode': require.resolve('jwt-decode'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('index.html', import.meta.url)),
        paymentGateway: fileURLToPath(new URL('paymentgateway.html', import.meta.url)),
        login: fileURLToPath(new URL('login.html', import.meta.url)),
        privacyPolicy: fileURLToPath(new URL('privacy.html', import.meta.url)),
        support: fileURLToPath(new URL('support.html', import.meta.url)),
        cart: fileURLToPath(new URL('cart.html', import.meta.url)),
        popup: fileURLToPath(new URL('popup.html', import.meta.url)),
        custom: fileURLToPath(new URL('custom.html', import.meta.url)),
        getItNow: fileURLToPath(new URL('./rahul/get_it_new.html', import.meta.url)),
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
