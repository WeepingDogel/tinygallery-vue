<template>
  <div class="container mx-auto px-4 py-8">
    <div class="hero min-h-[40vh] bg-base-200 rounded-box mb-8">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <img src="@/assets/TinyGallery_Logo.png" alt="TinyGallery Logo" class="w-32 h-32 mx-auto mb-4"/>
          <h1 class="text-5xl font-bold">TinyGallery</h1>
          <p class="py-6">TinyGallery 是一个开源项目，为绘画爱好者提供一个免费且简单的画廊服务。</p>
          <div class="badge badge-primary">v{{ Version }}</div>
        </div>
      </div>
    </div>

    <div class="stats shadow w-full mb-8">
      <div class="stat">
        <div class="stat-title">用户总数</div>
        <div class="stat-value text-primary">{{ user_num }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">作品总数</div>
        <div class="stat-value text-secondary">{{ posts_num }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">评论总数</div>
        <div class="stat-value">{{ comments_num }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">技术栈</h2>
          <div class="flex flex-wrap gap-2">
            <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" />
            <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
            <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
            <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
            <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
            <img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">源代码</h2>
          <div class="space-y-4">
            <div>
              <p class="mb-2">Vue 前端:</p>
              <a href="https://github.com/WeepingDogel/tinygallery-vue" class="btn btn-outline gap-2">
                <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                前端仓库
              </a>
            </div>
            <div>
              <p class="mb-2">后端:</p>
              <a href="https://github.com/WeepingDogel/tinygallery-backend" class="btn btn-outline gap-2">
                <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                后端仓库
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axiosInstance from '@/utilities/axios-instance'

const POLL_INTERVAL = 3000 // 3秒轮询间隔
let pollTimer = null

const Version = ref('1.0.0-Beta')
const user_num = ref('0')
const posts_num = ref('0')
const comments_num = ref('0')

const fetchData = async () => {
  try {
    const [userRes, postsRes, commentsRes] = await Promise.all([
      axiosInstance.get('/userdata/get/user_num'),
      axiosInstance.get('/userdata/get/posts_num'),
      axiosInstance.get('/userdata/get/comments_num')
    ])
    
    user_num.value = userRes.data.toLocaleString()
    posts_num.value = postsRes.data.toLocaleString()
    comments_num.value = commentsRes.data.toLocaleString()
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

const startPolling = () => {
  fetchData() // 立即执行一次
  pollTimer = setInterval(fetchData, POLL_INTERVAL)
}

onMounted(() => {
  startPolling()
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
})
</script>

<style scoped>
.stats {
  animation: fadeInUp 0.5s ease-out;
}

.card {
  animation: fadeInLeft 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
