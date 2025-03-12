<template>
  <div class="container mx-auto px-20 py-8">
    <div class="card bg-base-100 shadow-xl">
      <figure class="h-96 relative overflow-hidden rounded-t-xl">
        <!-- 模糊的背景图 -->
        <img 
          :src="post.files_url?.compressed_cover_url" 
          :alt="post.post_title" 
          class="absolute inset-0 w-full h-full object-cover blur-3xl scale-150" 
        />
        <!-- 清晰的主图 -->
        <img 
          :src="post.files_url?.compressed_cover_url" 
          :alt="post.post_title" 
          class="relative z-10 h-full w-full object-contain rounded-xl" 
        />
      </figure>
      <div class="card-body">
        <div class="flex items-center gap-4 mb-4">
          <img 
            :data-src="post.avatar" 
            alt="作者头像" 
            class="w-10 h-10 rounded-full lazy-image"
          />
          <div>
            <h2 class="card-title">{{ post.post_title }}</h2>
            <p class="text-sm">发布者: {{ post.user_name }}</p>
          </div>
          <button 
            v-if="authStore.isLogged"
            @click="handleLike" 
            class="btn btn-ghost gap-2"
            :class="{ 'text-warning': isLiked }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
                 class="h-5 w-5" 
                 :fill="isLiked ? 'currentColor' : 'none'"
                 viewBox="0 0 24 24" 
                 stroke="currentColor" 
                 stroke-width="2">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span :class="{ 'text-base-content': !isLiked }">
              <AnimatedNumber :number="post.dots" />
            </span>
          </button>
          <span v-else class="text-base-content/70">
            ⭐ {{ post.dots }}
          </span>
          <StarPopAnimation v-if="showStar" :x="starX" :y="starY" />
        </div>
        <p class="text-base-content/70">{{ post.description }}</p>
        <div class="flex items-center gap-4 mt-4">
          <p class="text-sm">发布时间: {{ post.date }}</p>
          <p class="text-sm">分享数: {{ post.share_num }}</p>
        </div>
      </div>
    </div>

    <!-- 显示所有图片 -->
    <div class="flex flex-col gap-4 mt-8">
      <div v-for="(imageUrl, index) in post.files_url?.image_files_url" :key="index" 
        class="card bg-base-100 shadow-xl cursor-pointer overflow-hidden"
        @click="openImageInNewWindow(imageUrl)">
        <figure>
          <img 
            :data-src="imageUrl" 
            :alt="`${post.post_title} - ${index + 1}`" 
            class="w-full object-contain rounded-xl lazy-image" 
            loading="lazy"
          />
        </figure>
      </div>
    </div>

    <div class="mt-8">
      <RemarkPanel :post-uuid="postUuid" @remark-added="fetchRemarks" />
      
      <TransitionGroup name="list" tag="div" class="space-y-4 mt-8">
        <div v-for="remark in remarks" :key="remark.id" class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex items-center gap-4">
              <img 
                :data-src="remark.avatar" 
                alt="用户头像" 
                class="w-10 h-10 rounded-full lazy-image" 
              />
              <div>
                <h4 class="font-bold">{{ remark.user_name }}</h4>
                <p class="text-sm text-base-content/70">{{ remark.date }}</p>
              </div>
            </div>
            <p class="mt-4">{{ remark.content }}</p>
            
            <TransitionGroup name="reply" tag="div" class="mt-4 space-y-2">
              <div v-for="reply in remark.replies" :key="reply.id" class="bg-base-200 p-4 rounded-lg">
                <div class="flex items-center gap-4">
                  <img 
                    :data-src="reply.avatar" 
                    alt="用户头像" 
                    class="w-8 h-8 rounded-full lazy-image" 
                  />
                  <div>
                    <h5 class="font-bold">{{ reply.user_name }}</h5>
                    <p class="text-sm text-base-content/70">{{ reply.date }}</p>
                  </div>
                </div>
                <p class="mt-2">
                  <span class="text-primary">@{{ reply.reply_to_user_name }}</span>
                  {{ reply.content }}
                </p>
              </div>
            </TransitionGroup>
            
            <ReplyPanel 
              :remark-uuid="remark.remark_uuid"
              :reply-to-user-name="remark.user_name"  
              @reply-added="fetchRemarks"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/utilities/axios-instance'
import RemarkPanel from './RemarkPanel.vue'
import ReplyPanel from './ReplyPanel.vue'
import { useAuthenticationStore } from '@/stores/Authentication'
import { useNotificationStore } from '@/stores/NotificationStore'
import AnimatedNumber from '@/components/Common/AnimatedNumber.vue'
import StarPopAnimation from '@/components/Common/StarPopAnimation.vue'

const POLL_INTERVAL = 3000 // 3秒轮询间隔
let pollTimer = null

const route = useRoute()
const postUuid = route.params.uuid
const post = ref({
  id: 0,
  description: '',
  share_num: 0,
  post_uuid: '',
  nsfw: false,
  user_name: '',
  post_title: '',
  dots: 0,
  date: '',
  files_url: {
    image_files_url: [],
    original_cover_url: '',
    compressed_cover_url: ''
  }
})
const currentPage = ref(1)
const remarks = ref([])

const isLiked = ref(false)

const authStore = useAuthenticationStore()
const notificationStore = useNotificationStore()

const showStar = ref(false)
const starX = ref(0)
const starY = ref(0)

const handleLike = async (event) => {
  if (!authStore.isLogged) {
    notificationStore.addNotification('请先登录', 'error')
    return
  }

  // 设置动画位置
  starX.value = event.clientX
  starY.value = event.clientY
  showStar.value = false
  await nextTick()
  showStar.value = true

  // 延迟重置动画状态
  setTimeout(() => {
    showStar.value = false
  }, 1000)

  // 执行原有的点赞逻辑
  toggleLike()
}

const toggleLike = async () => {
  try {
    if (!authStore.isLogged) {
      notificationStore.addNotification('请先登录', 'error')
      return
    }

    // 发送点赞请求
    await axiosInstance.post('/likes/send/like', null, {
      params: { post_uuid: postUuid }
    })

    // 获取最新的点赞状态和数量
    const statusRes = await axiosInstance.get('/likes/get/like_status', {
      params: { post_uuid: postUuid }
    })
    const countRes = await axiosInstance.get(`/resources/posts/single/${postUuid}`)
    
    // 更新状态
    isLiked.value = statusRes.data
    post.value.dots = countRes.data.dots

  } catch (error) {
    notificationStore.addNotification('点赞失败', 'error')
    console.error('Failed to toggle like:', error)
  }
}

const fetchPost = async () => {
  try {
    const response = await axiosInstance.get(`/resources/posts/single/${postUuid}`)
    post.value = response.data
    
    // 只在用户登录时获取点赞状态
    if (authStore.isLogged) {
      const statusRes = await axiosInstance.get('/likes/get/like_status', {
        params: { post_uuid: postUuid }
      })
      isLiked.value = statusRes
    } else {
      isLiked.value = false
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  }
}

const fetchRemarks = async () => {
  try {
    const response = await axiosInstance.get(`/remark/get/inpost/${postUuid}/${currentPage.value}`)
    remarks.value = await Promise.all(response.data.map(async remark => {
      const replies = await axiosInstance.get(`/remark/get/reply/${remark.remark_uuid}/1`)
      return {
        ...remark,
        replies: replies.data
      }
    }))
  } catch (error) {
    console.error('Failed to fetch remarks:', error)
  }
}

const initLazyLoading = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px',
    threshold: 0.1
  })

  document.querySelectorAll('.lazy-image').forEach(img => {
    observer.observe(img)
  })
}

const refreshData = async () => {
  await Promise.all([
    fetchPost(),
    fetchRemarks()
  ])
}

const startPolling = () => {
  pollTimer = setInterval(refreshData, POLL_INTERVAL)
}

onMounted(() => {
  Promise.all([fetchPost(), fetchRemarks()]).then(() => {
    setTimeout(initLazyLoading, 100)
    startPolling() // 启动轮询
  })
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
})

const replyContent = ref('')
const currentRemark = ref(null)
const replyModal = ref(null)

const openReplyModal = (remark) => {
  currentRemark.value = remark
  document.getElementById('reply_modal').showModal()
}

const closeReplyModal = () => {
  document.getElementById('reply_modal').close()
  replyContent.value = ''
  currentRemark.value = null
}

const submitReply = async () => {
  if (!replyContent.value.trim()) return
  
  try {
    await axiosInstance.post(`/remarks/reply/${currentRemark.value.uuid}`, {
      content: replyContent.value
    })
    closeReplyModal()
    fetchRemarks()
  } catch (error) {
    console.error('Failed to submit reply:', error)
  }
}

const openImageInNewWindow = (imageUrl) => {
  window.open(imageUrl, '_blank')
}
</script>

<style scoped>
.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image[src] {
  opacity: 1;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.reply-enter-active,
.reply-leave-active {
  transition: all 0.3s ease-in-out;
}

.reply-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.reply-move {
  transition: transform 0.3s ease;
}
</style>
