<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>用户名</th>
            <th>邮箱</th>
            <th>注册时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at }}</td>
            <td>
              <span :class="user.is_banned ? 'text-error' : 'text-success'">
                {{ user.is_banned ? '已封禁' : '正常' }}
              </span>
            </td>
            <td>
              <button 
                class="btn btn-sm btn-error"
                @click="toggleBanUser(user.username)"
              >
                {{ user.is_banned ? '解封' : '封禁' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthenticationStore } from '@/stores/Authentication'

const authStore = useAuthenticationStore()
const users = ref([])

const fetchUsers = async () => {
  try {
    const response = await axios.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    users.value = response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const toggleBanUser = async (username) => {
  try {
    await axios.post(`/admin/users/${username}/toggle-ban`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    await fetchUsers()
  } catch (error) {
    console.error('Failed to toggle user ban:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
