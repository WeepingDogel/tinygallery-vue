<!-- @/App.vue -->

<script lang="ts">
import NavBar from './components/navbar.vue'
import { RouterView } from 'vue-router'
import { Authentication } from './stores/Authentication';
import { storeToRefs } from 'pinia';

export default {
    mounted(){
        
        if(localStorage.getItem("Token") == null){
            // If there is no token in the local storage, the user is not authenticated.
            // logStatus.setLogStatus(true) is commented out because it is not needed in this case.
            // this.logStatus.setLogStatus(true)
            console.log("false")
        }else{
            // If there is a token in the local storage, the user is authenticated.
            console.log("true")
            this.logStatus.setLogStatus(true)
            console.log(this.logStatus.isLogged)
        }
    },
    setup(){
         // Set up the Authentication store and save it to SaveLogStatus.
        const logStatus = Authentication();
        const SaveLogStatus = storeToRefs(logStatus)
        return {logStatus, SaveLogStatus};
    },
    components: {
        NavBar
    }
}
</script>

<template>
    <!-- Render the NavBar and the RouterView. -->
    <NavBar v-if="$route.meta.showNavBar" />
    <RouterView />
</template>

<style scoped></style>
