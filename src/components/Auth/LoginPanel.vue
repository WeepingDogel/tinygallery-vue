<template>
  <div class="card w-full max-w-sm shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="text-2xl font-bold mb-4">登录</h2>
      <div class="form-control">
        <label class="label">
          <span class="label-text">用户名</span>
        </label>
        <input type="text" v-model="username" placeholder="用户名" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">密码</span>
        </label>
        <input type="password" v-model="password" placeholder="密码" class="input input-bordered" />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary" @click="login">登录</button>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-secondary" @click="switchToRegister">没有账号？注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'
import { useRouter } from 'vue-router'

const authStore = useAuthenticationStore()
const notificationStore = useNotificationStore()
const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    if (!username.value || !password.value) {
      notificationStore.addNotification('请输入用户名和密码', 'error')
      return
    }
    
    await authStore.login(username.value, password.value)
    if (authStore.isLogged) {
      notificationStore.addNotification('登录成功！', 'success')
      router.push('/')
    }
  } catch (error) {
    const errorMessage = error.response?.data?.detail || '登录失败'
    notificationStore.addNotification(errorMessage, 'error')
  }
}

const switchToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
