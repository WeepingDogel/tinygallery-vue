<!-- @/views/AuthView.vue -->

<script setup lang="ts">
import { useRoute } from 'vue-router'
import LoginPanel from '@/components/Auth/LoginPanel.vue'
import RegisterPanel from '@/components/Auth/RegisterPanel.vue'

const route = useRoute()
const isLogin = route.name === 'login'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100">
    <div class="w-full max-w-md px-6">
      <component :is="isLogin ? LoginPanel : RegisterPanel" />
    </div>
  </div>
</template>
