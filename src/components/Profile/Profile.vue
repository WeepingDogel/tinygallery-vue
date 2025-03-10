<template>
  <div class="relative">
    <div class="h-96 w-full bg-cover bg-center relative">
      <img 
        :data-src="profileData.background" 
        class="absolute inset-0 w-full h-full object-cover lazy-image" 
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-base-100"></div>
    </div>
    <div class="container mx-auto px-4 py-8 relative -mt-32">
      <div class="card w-full max-w-2xl shadow-2xl bg-base-100 mx-auto">
        <div class="card-body">
          <div class="flex flex-col items-center">
            <img 
              :data-src="profileData.avatar_200px" 
              alt="头像" 
              class="rounded-full w-32 h-32 mb-4 border-4 border-white lazy-image" 
            />
            <h2 class="text-2xl font-bold mb-4">{{ profileData.username }}</h2>
            <div class="form-control w-full mt-6">
              <button class="btn btn-primary w-full" @click="fetchProfileData">刷新资料</button>
            </div>
            <div class="form-control w-full mt-6">
              <router-link to="/profile/edit" class="btn btn-secondary w-full">编辑资料</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PostsList />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/utilities/axios-instance'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'
import PostsList from './PostsList.vue'

const authStore = useAuthenticationStore()
const notificationStore = useNotificationStore()
const profileData = ref({ username: '', avatar_200px: '', background: '' })

const fetchProfileData = async () => {
  try {
    const response = await axiosInstance.get('/userdata/get/username', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    profileData.value.username = response.data.username

    const avatarResponse = await axiosInstance.get(`/resources/avatar/${profileData.value.username}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    profileData.value.avatar_200px = avatarResponse.data.avatar_200px

    const backgroundResponse = await axiosInstance.get(`/resources/profile/background/${profileData.value.username}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    profileData.value.background = backgroundResponse.data.background

    notificationStore.addNotification('个人资料已更新', 'success')
  } catch (error) {
    notificationStore.addNotification('获取个人资料失败', 'error')
  }
}

const initLazyLoading = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })

  document.querySelectorAll('.lazy-image').forEach(img => {
    observer.observe(img)
  })
}

onMounted(() => {
  fetchProfileData().then(() => {
    setTimeout(initLazyLoading, 100)
  })
})
</script>

<style scoped>
.h-96 {
  height: 24rem; /* 384px */
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image[src] {
  opacity: 1;
}
</style>
