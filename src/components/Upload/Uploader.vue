<template>
  <div class="card w-full max-w-2xl shadow-2xl bg-base-100 mx-auto mt-10">
    <div class="card-body">
      <h2 class="text-2xl font-bold mb-4">上传图片</h2>
      <div class="form-control">
        <label class="label">
          <span class="label-text">选择图片</span>
        </label>
        <input type="file" @change="onFileChange" class="input input-bordered" multiple />
      </div>
      <div class="form-control mt-6">
        <label class="label">
          <span class="label-text">封面图片</span>
        </label>
        <input type="file" @change="onCoverChange" class="input input-bordered" />
      </div>
      <div class="form-control mt-6">
        <label class="label">
          <span class="label-text">标题</span>
        </label>
        <input type="text" v-model="postTitle" class="input input-bordered" />
      </div>
      <div class="form-control mt-6">
        <label class="label">
          <span class="label-text">描述</span>
        </label>
        <textarea v-model="description" class="textarea textarea-bordered"></textarea>
      </div>
      <div class="form-control mt-6">
        <label class="label cursor-pointer">
          <span class="label-text">NSFW</span>
          <input type="checkbox" v-model="isNsfw" class="checkbox" />
        </label>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary" @click="uploadImages">上传</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import axios from 'axios'
import { useAuthenticationStore } from '@/stores/Authentication'

const authStore = useAuthenticationStore()
const files = ref([])
const cover = ref(null)
const postTitle = ref('')
const description = ref('')
const isNsfw = ref(false)
const emit = defineEmits(['upload-success', 'upload-failure'])

const onFileChange = (event) => {
  files.value = event.target.files
}

const onCoverChange = (event) => {
  cover.value = event.target.files[0]
}

const uploadImages = async () => {
  try {
    const formData = new FormData()
    for (let i = 0; i < files.value.length; i++) {
      formData.append('uploaded_file', files.value[i])
    }
    formData.append('cover', cover.value)
    formData.append('post_title', postTitle.value)
    formData.append('description', description.value)
    formData.append('is_nsfw', isNsfw.value ? 'true' : 'false')

    await axios.post('/posts/create', formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    // 重置表单
    files.value = []
    cover.value = null
    postTitle.value = ''
    description.value = ''
    isNsfw.value = false

    emit('upload-success', '图片上传成功')
  } catch (error) {
    emit('upload-failure', error.response?.data?.detail || '图片上传失败')
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
