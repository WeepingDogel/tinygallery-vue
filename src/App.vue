<script lang="ts">
import NavBar from './components/navbar.vue'
import { RouterView } from 'vue-router'
export default {
  components: {
    NavBar
  }
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>

</style>
