import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // '/tests': {
      //   target: 'http://127.0.0.1:8000',
      // },
      '/user/register': {
        target: 'http://127.0.0.1:8000',
      },
      '/user/token': {
        target: 'http://127.0.0.1:8000',
      },
      '/posts/create': {
        target: 'http://127.0.0.1:8000',
      },
      '/resources': {
        target: 'http://127.0.0.1:8000',
      },
      '/userdata':{
        target: 'http://127.0.0.1:8000',
      },
      '/remark/get': {
        target: 'http://127.0.0.1:8000'
      },
      '/remark/create':{
        target: 'http://127.0.0.1:8000'
      }
    },
  },
})
