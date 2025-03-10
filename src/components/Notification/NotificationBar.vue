<template>
  <div class="fixed top-20 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="notification">
      <div v-for="notification in notifications" :key="notification.id"
        :class="`alert ${notification.type === 'error' ? 'alert-error' : 'alert-success'} shadow-lg w-96`"
      >
        <div class="flex justify-between w-full">
          <span>{{ notification.message }}</span>
          <button class="btn btn-ghost btn-xs" @click="removeNotification(notification.id)">✕</button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/NotificationStore'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
const { removeNotification } = notificationStore
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
