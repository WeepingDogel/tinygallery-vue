import { defineStore } from 'pinia'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error'
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
    nextId: 0
  }),
  
  actions: {
    addNotification(message: string, type: 'success' | 'error' = 'success') {
      const notification = {
        id: this.nextId++,
        message,
        type
      }
      this.notifications.push(notification)
      
      // 3秒后自动移除
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 3000)
    },
    
    removeNotification(id: number) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
})
