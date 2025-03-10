<template>
  <nav class="navbar bg-base-100 fixed top-0 z-50 shadow-sm">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">TinyGallery</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
        <li v-if="isLogged"><router-link to="/profile">个人资料</router-link></li>
        <li v-if="!isLogged"><router-link to="/login">登录</router-link></li>
        <li v-if="isLogged"><button @click="logout">注销</button></li>
        <li v-if="isLogged"><button @click="openUploadModal">上传</button></li>
      </ul>
    </div>
  </nav>

  <!-- Upload Modal -->
  <div v-if="showUploadModal" class="fixed inset-0 z-[100] overflow-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeUploadModal"></div>
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="bg-base-100 rounded-lg shadow-xl w-full max-w-md relative">
        <button 
          class="btn btn-sm btn-circle absolute right-2 top-2"
          @click="closeUploadModal"
        >✕</button>
        <div class="p-6">
          <Uploader 
            @upload-success="handleUploadSuccess" 
            @upload-failure="handleUploadFailure" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/NotificationStore'
import Uploader from '@/components/Upload/Uploader.vue'

const authStore = useAuthenticationStore()
const isLogged = computed(() => authStore.isLogged)
const showUploadModal = ref(false)

const router = useRouter()
const notificationStore = useNotificationStore()

const logout = () => {
  authStore.logout()
  notificationStore.addNotification('已成功登出', 'success')
  router.push('/')
}

const openUploadModal = () => {
  showUploadModal.value = true
}

const closeUploadModal = () => {
  showUploadModal.value = false
}

const handleUploadSuccess = (message) => {
  notificationStore.addNotification(message, 'success')
  closeUploadModal()
  router.go(0) // 刷新页面以更新内容
}

const handleUploadFailure = (message) => {
  notificationStore.addNotification(message, 'error')
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
</style>
