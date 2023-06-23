<script lang="ts">

export default {

}
</script>

<template>
    <div class="DataManagement">
        <div class="UsersManage">
            <h1 class="ManagementTitle">Users</h1>
            <table></table>
        </div>

        <div class="PostsManage">
            <h1 class="ManagementTitle">Posts</h1>
        </div>

        <div class="CommentsManage">
            <h1 class="ManagementTitle">Comments</h1>
            <table></table>
        </div>
        <div class="AdminManage">
            <h1 class="ManagementTitle">Admin Users</h1>
            <table></table>
        </div>
    </div>
</template>

<style scoped>
@keyframes FadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.DataManagement {
    width: 90%;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    animation: FadeIn 1s;
}

.ManagementTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 25px;
    animation: FadeIn 1s;
}
</style>