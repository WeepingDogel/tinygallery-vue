<template>
  <div class="container mx-auto px-4 py-8">
    <div class="card w-full max-w-2xl shadow-2xl bg-base-100 mx-auto">
      <div class="card-body">
        <h2 class="text-2xl font-bold mb-4">编辑个人资料</h2>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">用户名</span>
          </label>
          <input type="text" v-model="profileData.username" class="input input-bordered" readonly />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">头像</span>
          </label>
          <input type="file" @change="onAvatarChange" class="input input-bordered" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">背景图片</span>
          </label>
          <input type="file" @change="onBackgroundChange" class="input input-bordered" />
        </div>
        <div class="form-control w-full mt-6">
          <button class="btn btn-primary w-full" @click="updateProfile">更新资料</button>
        </div>
        <div class="form-control w-full mt-6">
          <label class="label">
            <span class="label-text">旧密码</span>
          </label>
          <input type="password" v-model="previousPassword" class="input input-bordered" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">新密码</span>
          </label>
          <input type="password" v-model="newPassword" class="input input-bordered" />
        </div>
        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">确认新密码</span>
          </label>
          <input type="password" v-model="confirmPassword" class="input input-bordered" />
        </div>
        <div class="form-control w-full mt-6">
          <button class="btn btn-primary w-full" @click="changePassword">更改密码</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/utilities/axios-instance'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'

const authStore = useAuthenticationStore()
const notificationStore = useNotificationStore()
const profileData = ref({ username: '' })
const avatarFile = ref(null)
const backgroundFile = ref(null)
const previousPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const onAvatarChange = (event) => {
  avatarFile.value = event.target.files[0]
}

const onBackgroundChange = (event) => {
  backgroundFile.value = event.target.files[0]
}

const updateProfile = async () => {
  try {
    if (avatarFile.value) {
      const formData = new FormData()
      formData.append('avatar', avatarFile.value)
      await axiosInstance.put('/userdata/set/avatar', formData)
      notificationStore.addNotification('头像更新成功', 'success')
    }

    if (backgroundFile.value) {
      const formData = new FormData()
      formData.append('background', backgroundFile.value)
      await axiosInstance.put('/userdata/set/background', formData)
      notificationStore.addNotification('背景图片更新成功', 'success')
    }
  } catch (error) {
    notificationStore.addNotification('更新个人资料失败', 'error')
  }
}

const changePassword = async () => {
  try {
    await axiosInstance.post('/userdata/change-password', {
      previous_password: previousPassword.value,
      new_password: newPassword.value,
      confirm_password: confirmPassword.value
    })
    notificationStore.addNotification('密码修改成功', 'success')
  } catch (error) {
    notificationStore.addNotification(error.response?.data?.detail || '密码修改失败', 'error')
  }
}

const fetchProfileData = async () => {
  try {
    const response = await axiosInstance.get('/userdata/get/username', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    profileData.value.username = response.data.username
  } catch (error) {
    console.error('Failed to fetch profile data:', error)
  }
}

onMounted(() => {
  fetchProfileData()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
