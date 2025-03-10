import axios from 'axios'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(config => {
  const authStore = useAuthenticationStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  response => {
    const notificationStore = useNotificationStore()
    if (response.data?.message) {
      notificationStore.addNotification(response.data.message, 'success')
    }
    return response
  },
  error => {
    const notificationStore = useNotificationStore()
    
    // 根据状态码处理不同的错误消息
    if (error.response?.status === 401) {
      const message = error.response?.data?.detail || '未授权，请重新登录'
      notificationStore.addNotification(message, 'error')
    } 
    // 验证错误（通常是 400）
    else if (error.response?.status === 400) {
      const message = error.response?.data?.detail || '请求参数错误'
      notificationStore.addNotification(message, 'error')
    }
    // 其他错误
    else {
      const message = error.response?.data?.detail || error.message || '操作失败'
      notificationStore.addNotification(message, 'error')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
