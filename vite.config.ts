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
      '@': fileURLToPath(new URL('./src', import.meta.url)) // Create an alias for the src directory
    }
  },
  server: {
    proxy: {
      // Proxy requests to these URLs to the specified target server
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
      '/userdata': {
        target: 'http://127.0.0.1:8000',
      },
      '/remark/get': {
        target: 'http://127.0.0.1:8000'
      },
      '/remark/create': {
        target: 'http://127.0.0.1:8000'
      },
      '/likes': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/admin_authentication': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_all_users': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_all_posts': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_all_admin': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_all_comments': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_all_replies': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/user_tendency_addition': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/posts_tendency_addition': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/get_single_user': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/comments_tendency_addition': {
        target: 'http://127.0.0.1:8000'
      },
      '/admin/posts_toplist': {
        target: 'http://127.0.0.1:8000'
      }
    },
  },
})
