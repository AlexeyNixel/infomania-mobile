import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/site': {
        target: 'http://static.infomania.ru/',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://static.infomania.ru/site',
        changeOrigin: true,
      },
      '/news': {
        target: 'http://dev.infomania.ru/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/entry/, ''),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
