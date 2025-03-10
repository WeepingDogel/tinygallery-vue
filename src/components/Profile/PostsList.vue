<template>
  <div class="mt-8">
    <h3 class="text-xl font-bold mb-4">我的帖子</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="post in posts" :key="post.id" class="card bg-base-100 shadow-xl">
        <figure class="relative h-48">
          <img 
            :data-src="post.cover_url" 
            alt="图片封面" 
            class="w-full h-full object-cover lazy-image" 
            loading="lazy"
          />
        </figure>
        <div class="card-body">
          <h4 class="card-title text-base">{{ post.post_title }}</h4>
          <p class="text-xs text-base-content/70 line-clamp-2">{{ post.description }}</p>
          <div class="flex items-center gap-2 text-xs text-base-content/70">
            <span>点赞: {{ post.dots || 0 }}</span>
            <span>分享: {{ post.share_num || 0 }}</span>
            <span>{{ post.date }}</span>
          </div>
          <div class="card-actions justify-end mt-2">
            <button @click="deletePost(post.post_uuid)" class="btn btn-error btn-xs">删除</button>
            <router-link :to="`/remark/${post.post_uuid}`" class="btn btn-primary btn-xs">查看</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载提示器 -->
    <div ref="loadingTrigger" class="flex justify-center p-4">
      <span v-if="loading" class="loading loading-dots loading-lg"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axiosInstance from '@/utilities/axios-instance'
import { useAuthenticationStore } from '@/stores/Authentication'

const authStore = useAuthenticationStore()
const posts = ref([])
const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const loadingTrigger = ref(null)
let imageObserver = null

const fetchUserPosts = async (page) => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const username_res = await axiosInstance.get('/userdata/get/username')
    const response = await axiosInstance.get(`/resources/posts/getAllPostsBelongToUser/${page}?user_name=${username_res.data.username}`)
    const newPosts = response.data
    
    if (newPosts.length === 0) {
      hasMore.value = false
    } else {
      posts.value = [...posts.value, ...newPosts]
      setTimeout(initLazyLoading, 100)
    }
  } catch (error) {
    console.error('Failed to fetch user posts:', error)
  } finally {
    loading.value = false
  }
}

const deletePost = async (postUuid) => {
  if (!confirm('确定要删除这个帖子吗？')) return
  
  try {
    await axiosInstance.delete(`/posts/remove/${postUuid}`)
    await fetchUserPosts(1)
  } catch (error) {
    console.error('Failed to delete post:', error)
  }
}

const initLazyLoading = () => {
  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        imageObserver.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })

  document.querySelectorAll('.lazy-image').forEach(img => {
    imageObserver.observe(img)
  })
}

// 创建观察器
const createObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && hasMore.value) {
        fetchUserPosts(currentPage.value + 1)
        currentPage.value++
      }
    },
    {
      threshold: 0.1
    }
  )
  
  if (loadingTrigger.value) {
    observer.observe(loadingTrigger.value)
  }
  
  return observer
}

let scrollObserver = null

onMounted(() => {
  fetchUserPosts(1)
  scrollObserver = createObserver()
})

onUnmounted(() => {
  if (imageObserver) {
    imageObserver.disconnect()
  }
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})
</script>

<style scoped>
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image[src] {
  opacity: 1;
}
</style>
