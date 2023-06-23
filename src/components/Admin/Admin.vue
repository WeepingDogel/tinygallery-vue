<script lang="ts">
import NavBarOfAdmin from './NavBarOfAdmin/NavBarOfAdmin.vue';
import AdminPanel from './AdminPanel/AdminPanel.vue';
import axios from 'axios';

export default {
    data(){
        return {
            is_admin: false,
        }
    },
    components: {
        NavBarOfAdmin,
        AdminPanel
    },
    methods: {
        VerifyAdminIdentity(){
            const Token = localStorage.getItem('Token');
            axios.get(
                '/user/admin_authentication',
                {
                    headers: {
                        "Authorization": "Bearer " + Token
                    }
                }
            ).then(
                (response) => {
                    if(response.data.Code == 200){
                        this.is_admin = !this.is_admin;
                    }
                }
            ).catch(
                (error) => {
                    if(error.response.data.detail == "Permission Denied.") {
                        this.is_admin = false
                    }
                }
            )
        }
    },
    mounted(){
        this.VerifyAdminIdentity();
    }
}

</script>

<template>
    <NavBarOfAdmin v-if="is_admin"/>
    <AdminPanel v-if="is_admin"/>
    <div class="BanInfo" v-else>
        <p class="BanText">400: Permission Denied!</p> 
        <p class="BanSubText">You are not Administrator!</p>
    </div>
</template>

<style scoped>
.BanInfo {
    margin-top: 100px;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: 800px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    border-radius: 25px;
}

.BanText {
    line-height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 70px;
    font-weight: bolder;
    text-align: center;
    color: #7C4DFF;
    cursor: pointer;
    transition: 1000ms;
}

.BanText:active{
    transition: 500ms;
    font-size: 40px;
    transform: rotate(2160deg);
}

.BanSubText {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 45px;
    font-weight: lighter;
    color: #7C4DFF;
    text-align: center;
}
</style>