<script lang="ts">
import SettingsPanel from "@/components/Profile/SettingsPanel.vue"
import axios from "axios";

export default {
    components: {
        SettingsPanel
    },
    data(){
        return {
            SettingsON: false,
            UserName: ""
        }
    },
    methods: {
        openSettings(){
            this.SettingsON = true;
        },
        getUserName() {
            const token = localStorage.getItem('Token')
            // GetUserName
            axios.put('/userdata/get/username', {},{
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
            .then((response) => {
                const username = response.data.username;
                this.UserName = username
                // console.log(username)
            })
        },
        getUserAvatar(){

        },
        getUserBackground(){
            
        }
    },
    mounted(){
        this.getUserName()
    }
}
</script>

<template>
    <div class="ProfileContainer">
        <div class="ProfileCard">
            <div class="UserCover">
                <img src="" />
            </div>
            <div class="ProfileAvatar">
                <img />
            </div>
            <div class="ProfileUserNameContainerBox">
                <h2 class="ProfileUserName">{{ UserName }}</h2>
            </div>
            <button @click="openSettings" class="ProfileEditButton">Edit</button>
        </div>
        <SettingsPanel v-model="SettingsON"/>
        <div class="ProfileArtWorks">

        </div>
    </div>
</template>

<style>
.ProfileContainer {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    animation: FadeIn 0.5s;
}

.ProfileCard {
    width: 80%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 10px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}

.UserCover {
    width: 100%;
    height: 300px;
    background-color: #3F51B5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.ProfileAvatar {
    width: 200px;
    height: 200px;
    border: solid 1px #BDBDBD;
    border-radius: 10px;
    position: relative;
    margin: 0 50px;
    top: -10%;
    background-color: #FFFFFF;
}

.ProfileUserName {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 30px;
    color: #212121;
}

.ProfileUserNameContainerBox {
    position: relative;
    left: 280px;
    top: -160px;
}

.ProfileEditButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7C4DFF;
    padding: 13px;
    color: #FFFFFF;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    top: -200px;
    right: 50px;
    float: right;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ProfileEditButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.ProfileArtWorks {
    width: 80%;
    height: 500px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 5px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}
</style>