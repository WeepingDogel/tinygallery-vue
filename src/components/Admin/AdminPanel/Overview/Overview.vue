<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">概览</h2>
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">总用户数</div>
          <div class="stat-value">{{ stats.userCount }}</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">总帖子数</div>
          <div class="stat-value">{{ stats.postCount }}</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">总评论数</div>
          <div class="stat-value">{{ stats.commentCount }}</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">今日新增用户</div>
          <div class="stat-value">{{ stats.newUserToday }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthenticationStore } from '@/stores/Authentication'

const authStore = useAuthenticationStore()
const stats = ref({
  userCount: 0,
  postCount: 0,
  commentCount: 0,
  newUserToday: 0
})

const fetchStats = async () => {
  try {
    const response = await axios.get('/admin/stats', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
