<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h3 class="card-title">发表评论</h3>
      <textarea 
        v-model="content" 
        class="textarea textarea-bordered w-full" 
        placeholder="写下你的评论..."
      ></textarea>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="submitRemark">发表</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/utilities/axios-instance'

const props = defineProps(['postUuid'])
const emit = defineEmits(['remarkAdded'])
const content = ref('')

const submitRemark = async () => {
  if (!content.value.trim()) return

  try {
    await axiosInstance.post('/remark/create/inpost', {
      post_uuid: props.postUuid,
      content: content.value
    })
    content.value = ''
    // 立即触发一次更新
    emit('remarkAdded')
  } catch (error) {
    console.error('Failed to submit remark:', error)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
