<template>
  <div class="card w-full max-w-sm shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="text-2xl font-bold mb-4">注册</h2>
      <div class="form-control">
        <label class="label">
          <span class="label-text">用户名</span>
        </label>
        <input type="text" v-model="username" placeholder="用户名" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">邮箱</span>
        </label>
        <input type="email" v-model="email" placeholder="邮箱" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">密码</span>
        </label>
        <input type="password" v-model="password" placeholder="密码" class="input input-bordered" />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary" @click="register">注册</button>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-secondary" @click="switchToLogin">已有账号？登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/utilities/axios-instance'
import { useNotificationStore } from '@/stores/NotificationStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const notificationStore = useNotificationStore()
const username = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  try {
    await axiosInstance.post('/user/register', {
      user_name: username.value,
      email: email.value,
      password: password.value
    })
    notificationStore.addNotification('注册成功！请登录', 'success')
    router.push('/login')
  } catch (error) {
    notificationStore.addNotification(error.response?.data?.detail || '注册失败', 'error')
  }
}

const switchToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
