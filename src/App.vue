<!-- @/App.vue -->

<script lang="ts">
import NavBar from './components/navbar.vue'
import { RouterView } from 'vue-router'
import { Authentication } from './stores/Authentication';
import { storeToRefs } from 'pinia';
export default {
    mounted(){
        if(localStorage.getItem("Token") == null){
            // this.logStatus.setLogStatus(true)
            console.log("false")
        }else{
            console.log("true")
            this.logStatus.setLogStatus(true)
            console.log(this.logStatus.isLogged)
        }
    },
    setup(){
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
    <NavBar />
    <RouterView />
</template>

<style scoped></style>
