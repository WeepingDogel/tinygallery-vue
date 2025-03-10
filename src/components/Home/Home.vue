<template>
  <div class="p-4" ref="container">
    <TransitionGroup 
      name="card"
      appear
      tag="div"
      class="waterfall"
    >
      <div v-for="post in posts" :key="post.id" class="waterfall-item">
        <div class="card card-compact bg-base-100 hover:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <figure>
            <img 
              :data-src="post.cover_url" 
              :src="post.cover_url" 
              alt="图片封面" 
              class="w-full object-cover lazy-image" 
              loading="lazy"
              ref="lazyImages"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title">{{ post.post_title }}</h3>
            <p class="text-base-content/70">{{ post.description }}</p>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <img 
                    :data-src="post.avatar" 
                    alt="作者头像" 
                    class="w-6 h-6 rounded-full lazy-image"
                  />
                  <span class="text-sm text-base-content/70">{{ post.user_name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button 
                    v-if="authStore.isLogged"
                    @click.stop="toggleLike(post)" 
                    class="btn btn-ghost btn-sm gap-2"
                    :class="{ 'text-warning': post.isLiked }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         class="h-5 w-5" 
                         :fill="post.isLiked ? 'currentColor' : 'none'"
                         viewBox="0 0 24 24" 
                         stroke="currentColor" 
                         stroke-width="2">
                      <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span :class="{ 'text-base-content': !post.isLiked }">
                      <AnimatedNumber :number="post.dots" />
                    </span>
                  </button>
                  <span v-else class="text-sm text-base-content/70">
                    ⭐ {{ post.dots }}
                  </span>
                </div>
              </div>
              <router-link :to="`/remark/${post.post_uuid}`" class="btn btn-primary btn-sm">
                查看详情
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <!-- 加载提示器 -->
    <div ref="loadingTrigger" class="flex justify-center p-4">
      <span v-if="loading" class="loading loading-dots loading-lg"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axiosInstance from '@/utilities/axios-instance'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'
import AnimatedNumber from '@/components/Common/AnimatedNumber.vue'

const POLL_INTERVAL = 3000 // 3秒轮询间隔
let pollTimer = null

const posts = ref([])
const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const loadingTrigger = ref(null)
const waterfallContainer = ref(null)
const lazyImages = ref([])
let observer = null

const authStore = useAuthenticationStore()
const notificationStore = useNotificationStore()

const toggleLike = async (post) => {
  try {
    if (!authStore.isLogged) {
      notificationStore.addNotification('请先登录', 'error')
      return
    }

    // 发送点赞请求
    await axiosInstance.post('/likes/send/like', null, {
      params: { post_uuid: post.post_uuid }
    })

    // 获取最新的点赞状态和数量
    const statusRes = await axiosInstance.get('/likes/get/like_status', {
      params: { post_uuid: post.post_uuid }
    })
    const countRes = await axiosInstance.get(`/resources/posts/single/${post.post_uuid}`)
    
    // 更新状态
    post.isLiked = statusRes.data
    post.dots = countRes.data.dots

  } catch (error) {
    notificationStore.addNotification('点赞失败', 'error')
    console.error('Failed to toggle like:', error)
  }
}

const fetchPosts = async (page) => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const response = await axiosInstance.get(`/resources/posts/${page}`)
    // Get like status for each post only if logged in
    const postsWithStatus = await Promise.all(response.data.map(async post => {
      if (authStore.isLogged) {
        try {
          const statusRes = await axiosInstance.get('/likes/get/like_status', {
            params: { post_uuid: post.post_uuid }
          })
          return {
            ...post,
            isLiked: statusRes
          }
        } catch (error) {
          return {
            ...post,
            isLiked: false
          }
        }
      }
      return {
        ...post,
        isLiked: false
      }
    }))

    if (postsWithStatus.length === 0) {
      hasMore.value = false
    } else {
      posts.value = [...posts.value, ...postsWithStatus]
      currentPage.value = page
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
}

const refreshCurrentPosts = async () => {
  try {
    const promises = []
    for (let page = 1; page <= currentPage.value; page++) {
      promises.push(axiosInstance.get(`/resources/posts/${page}`))
    }
    
    const responses = await Promise.all(promises)
    let allPosts = []
    
    for (const response of responses) {
      const postsWithStatus = await Promise.all(response.data.map(async post => {
        if (authStore.isLogged) {
          try {
            const statusRes = await axiosInstance.get('/likes/get/like_status', {
              params: { post_uuid: post.post_uuid }
            })
            return { ...post, isLiked: statusRes }
          } catch (error) {
            return { ...post, isLiked: false }
          }
        }
        return { ...post, isLiked: false }
      }))
      allPosts = [...allPosts, ...postsWithStatus]
    }
    
    posts.value = allPosts
  } catch (error) {
    console.error('Failed to refresh posts:', error)
  }
}

const observeImages = () => {
  observer = new IntersectionObserver((entries) => {
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

  // 观察所有带有 lazy-image 类的图片
  document.querySelectorAll('.lazy-image').forEach(img => {
    observer.observe(img)
  })
}

// 创建观察器
const createObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && hasMore.value) {
        fetchPosts(currentPage.value + 1)
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

const startPolling = () => {
  pollTimer = setInterval(refreshCurrentPosts, POLL_INTERVAL)
}

onMounted(() => {
  fetchPosts(1)
    .then(() => {
      // 在图片数据加载完成后初始化懒加载
      setTimeout(observeImages, 100)
      startPolling() // 启动轮询
    })
  observer = createObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
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

.waterfall {
  column-count: 1;
  column-gap: 1.5rem; 
  padding: 0 1.5rem;  
}

.waterfall-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;  
}

.shadow-hover {
  transition: all 0.3s ease;
}

.shadow-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
  .waterfall {
    column-count: 2;
  }
}

@media (min-width: 768px) {
  .waterfall {
    column-count: 2;  
  }
}

@media (min-width: 1024px) {
  .waterfall {
    column-count: 3;  
  }
}

@media (min-width: 1280px) {
  .waterfall {
    column-count: 4; 
  }
}

.card {
  @apply backdrop-blur-sm;
}

.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.card-move {
  transition: transform 0.5s ease;
}
</style>
