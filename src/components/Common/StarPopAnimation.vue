<template>
  <div class="star-container" :style="{ top: y + 'px', left: x + 'px' }">
    <svg 
      v-for="i in 3" 
      :key="i"
      class="star"
      :style="{
        '--delay': `${i * 100}ms`,
        '--direction': i === 2 ? '1' : '-1'
      }"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="12" 
      height="12"
    >
      <path 
        fill="currentColor"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  x: Number,
  y: Number
})
</script>

<style scoped>
.star-container {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

.star {
  position: absolute;
  color: #FFD700;
  animation: pop-star 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

@keyframes pop-star {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(calc(-50% + var(--direction) * 20px), -100%) scale(1) rotate(20deg);
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--direction) * 30px), -150%) scale(0.5) rotate(40deg);
  }
}
</style>
