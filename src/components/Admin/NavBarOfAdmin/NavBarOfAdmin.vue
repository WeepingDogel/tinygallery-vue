<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Admin Panel</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/admin/overview">概览</router-link></li>
        <li><router-link to="/admin/user-management">用户管理</router-link></li>
        <li><router-link to="/admin/posts-management">帖子管理</router-link></li>
        <li><router-link to="/admin/comments-management">评论管理</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
/* Add any additional styles here */
</style>
