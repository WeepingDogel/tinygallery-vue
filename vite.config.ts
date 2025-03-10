// This code defines a configuration object for the Vite build tool.
// The resolve option specifies an alias for the src directory. 
// This allows you to import files from the src directory using @ in the path instead of specifying the full path.
// The server option configures a proxy server to forward requests made to certain paths 
// to another server running locally on http://127.0.0.1:8000.
// The plugins option specifies an array of Vite plugins to use, 
// with the vue plugin being included in this example.

// Import necessary modules
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Define the configuration for Vite
export default defineConfig({
  plugins: [vue()], // Use the Vue plugin
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Create an alias for the src directory
      'moment-timezone': 'moment-timezone/builds/moment-timezone-with-data-10-year-range.min.js'
    }
  },
  server: {
    proxy: {
      // Proxy requests to these URLs to the specified target server
      '/user/register': {
        target: 'http://127.0.0.1:8001',
      },
      '/user/token': {
        target: 'http://127.0.0.1:8001',
      },
      '/posts/create': {
        target: 'http://127.0.0.1:8001',
      },
      '/posts/remove':{
        target: 'http://127.0.0.1:8001',
      },
      '/posts/update': {
        target: 'http://127.0.0.1:8001',
      },
      '/resources': {
        target: 'http://127.0.0.1:8001',
      },
      '/userdata': {
        target: 'http://127.0.0.1:8001',
      },
      '/remark/get': {
        target: 'http://127.0.0.1:8001'
      },
      '/remark/create': {
        target: 'http://127.0.0.1:8001'
      },
      '/likes': {
        target: 'http://127.0.0.1:8001'
      },
      // Updated admin API routes
      '/admin/users': {
        target: 'http://127.0.0.1:8001',
      },
      '/admin/posts': {
        target: 'http://127.0.0.1:8001',
      },
      '/admin/comments': {
        target: 'http://127.0.0.1:8001',
      },
      '/admin/user_tendency_addition': {
        target: 'http://127.0.0.1:8001',
      },
      '/admin/posts_toplist': {
        target: 'http://127.0.0.1:8001',
      },
      '/admin/admin_authentication': {
        target: 'http://127.0.0.1:8001'
      },
      '/static': {
        target: 'http://127.0.0.1:8001'
      }
    },
  },
})
