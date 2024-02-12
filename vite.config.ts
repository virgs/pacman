import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    qrcode() // only applies in dev mode
  ],
  base: '/pacman',
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
      }

    },
    outDir: 'docs',
    assetsDir: '.'
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
})
