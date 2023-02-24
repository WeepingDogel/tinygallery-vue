<script lang="ts">
import NavBar from './components/navbar.vue'
import { RouterView } from 'vue-router'
import { Authentication } from './stores/Authentication';
export default {
    data() {
        return {
            RouterURL: "",
            LinkName: ""
        }
    },
    mounted() {
        if (Authentication().CheckIfLogged) {
            this.RouterURL = "/profile";
            this.LinkName = "Profile";
        } else {
            this.RouterURL = "/login";
            this.LinkName = "Login"
        }
    },
    components: {
        NavBar
    }
}
</script>

<template>
    <NavBar :dynamicRouterLocate="RouterURL" :dynamicLinkName="LinkName" />
    <RouterView />
</template>

<style scoped></style>
