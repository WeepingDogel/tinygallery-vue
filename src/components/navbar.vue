<!-- @/components/navbar.vue -->
<script lang="ts">
import Uploader from "@/components/Upload/Uploader.vue";
import { RouterLink } from 'vue-router';
import { Authentication } from '@/stores/Authentication';
import { storeToRefs } from 'pinia';

export default {
    data() {
        return {
            DisplayLink: "/login",
            DisplayTitle: "Login",
            functionDisplay: false,
            UploaderON: false
        }
    },
    setup() {
        const logStatus = Authentication();
        const UpdateStatus = storeToRefs(logStatus)
        return {
            UpdateStatus, logStatus
        }
    },
    watch: {
        "logStatus.isLogged"(newValue, oldValue) {
            this.changeURL()
            this.displayLogout()
        }
    },
    methods: {
        changeURL() {
            if (this.logStatus.isLogged) {
                this.DisplayLink = "/profile";
                this.DisplayTitle = "Profile"
            } else {
                this.DisplayLink = "/login";
                this.DisplayTitle = "Login"
            }
        },
        // test(){
        //     console.log(this.logStatus.isLogged)
        // },
        displayLogout() {
            if (this.logStatus.isLogged) {
                this.functionDisplay = true;
            } else {
                this.functionDisplay = false;
            }
        },
        logout() {
            localStorage.removeItem("Token");
            Authentication().setLogStatus(false);
            this.$router.push("/")
            console.log(this.logStatus.isLogged);
            console.log("logged out");
        },
        OpenUploader() {
            this.UploaderON = true;
        }
    },
    components: {
        Uploader
    }
}
</script>

<template>
    <div id="bar">
        <h1 id="MainTitle">TinyGallery Vue Beta</h1>
        <div id="linkContainer">

            <RouterLink to="/">Home</RouterLink>
            <RouterLink :to="DisplayLink">{{ DisplayTitle }}</RouterLink>
            <button class="functionButton" v-if="functionDisplay" @click="logout">Logout</button>
            <RouterLink to="/about">About</RouterLink>
            <button @click="OpenUploader" class="uploadButton" v-if="functionDisplay">+</button>
            <!-- <button @click="test">test</button> -->
        </div>
    </div>
    <Uploader v-model="UploaderON" />
</template>

<style scoped>
.uploadButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: lighter;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #FFFFFF;
    background-color: #7C4DFF;
    margin: auto 10px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.uploadButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.functionButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    transition: 1000ms;
    width: 100px;
    height: 70px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #C5CAE9;
    background-color: #3F51B5;
    margin: auto;
    cursor: pointer;
}

.functionButton:hover {
    transition: 1000ms;
    background-color: #303F9F;
    color: #FFFFFF;
    transition: background-color 0.5s ease;
}

#bar {
    width: 100%;
    height: 70px;
    background-color: #3F51B5;
    border-bottom: solid 1px #BDBDBD;
    display: flex;
    justify-content: space-between;
}

#MainTitle {
    line-height: 70px;
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 26px;
    text-indent: 0.5em;
}

#linkContainer {
    width: auto;
    height: 70px;
    display: flex;
    justify-content: space-around;
}

#linkContainer a {
    text-decoration: none;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    line-height: 70px;
    text-align: center;
    width: 100px;
    color: #C5CAE9;
    transition: 1000ms;
}

#linkContainer a:hover {
    transition: 1000ms;
    color: #FFFFFF;
}

#linkContainer .router-link-active,
.router-link-exact-active {
    transition: 1000ms;
    color: #FFFFFF;
}
</style>