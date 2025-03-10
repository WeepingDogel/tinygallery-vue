<template>
  <div class="mt-4">
    <div v-if="showReplyForm" class="flex gap-4">
      <textarea 
        v-model="content" 
        class="textarea textarea-bordered flex-grow" 
        placeholder="回复..."
      ></textarea>
      <div class="flex flex-col gap-2">
        <button class="btn btn-primary btn-sm" @click="submitReply">回复</button>
        <button class="btn btn-ghost btn-sm" @click="showReplyForm = false">取消</button>
      </div>
    </div>
    <button 
      v-else 
      class="btn btn-ghost btn-sm"
      @click="showReplyForm = true"
    >
      回复
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/utilities/axios-instance'

const props = defineProps({
  remarkUuid: String,
  replyToUserName: String  // 添加新的 prop
})
const emit = defineEmits(['replyAdded'])

const content = ref('')
const showReplyForm = ref(false)

const submitReply = async () => {
  if (!content.value.trim()) return

  try {
    await axiosInstance.post('/remark/create/reply', {
      reply_to_remark_uuid: props.remarkUuid,
      content: content.value,
      reply_to_user_name: props.replyToUserName  // 添加用户名字段
    })
    content.value = ''
    showReplyForm.value = false
    emit('replyAdded')
  } catch (error) {
    console.error('Failed to submit reply:', error)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
