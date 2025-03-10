<template>
  <span>{{ displayNumber }}</span>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    required: true
  }
})

const displayNumber = ref(props.number)

watch(() => props.number, (newVal, oldVal) => {
  let start = oldVal
  const end = newVal
  const duration = 500
  const startTime = performance.now()
  
  function update() {
    const now = performance.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    displayNumber.value = Math.round(start + (end - start) * progress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
})
</script>
