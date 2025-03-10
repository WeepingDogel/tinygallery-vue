<!-- @/App.vue -->

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import NotificationBar from '@/components/Notification/NotificationBar.vue'
import { ref, onMounted } from 'vue'
import { useAuthenticationStore } from '@/stores/Authentication'

const theme = ref('light')
const authStore = useAuthenticationStore()

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  // 设置初始主题
  document.documentElement.setAttribute('data-theme', theme.value)
  // 检查认证状态
  authStore.checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <NavBar />
    <NotificationBar />
    <RouterView />
    <button @click="toggleTheme" class="fixed bottom-4 right-4 btn btn-circle btn-primary">
      <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
