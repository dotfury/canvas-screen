import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/canvas-screen',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskable-icon-512x512.svg',
      ],
      manifest: {
        name: 'Canvas Screen',
        short_name: 'Canvas Screen',
        description: 'Canvas filters for camera',
        theme_color: '#242424',
        background_color: '#242424',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshots/desk1.jpg',
            sizes: '1280x720',
            type: 'image/jpg',
            form_factor: 'wide',
            label: 'Example of pixelate filter',
          },
          {
            src: 'screenshots/desk2.jpg',
            sizes: '1280x720',
            type: 'image/jpg',
            form_factor: 'wide',
            label: 'Example of ascii filter',
          },
          {
            src: 'screenshots/mobile.jpg',
            sizes: '327x706',
            type: 'image/jpg',
            form_factor: 'narrow',
            label: 'Example of mobile screen',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
      },
    }),
  ],
});
