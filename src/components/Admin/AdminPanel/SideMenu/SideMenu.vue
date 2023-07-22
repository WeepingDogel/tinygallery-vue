<script lang="ts">
import axios from 'axios';


export default {
    props: {
        ChildOpenNum: Number,
    },
    data() {
        return {
            AdminUserName: "",
            AdminAvatarImageLink: "",
            ChildNum: this.ChildOpenNum,
        }
    },
    methods: {
        OpenOverView() {
            this.ChildNum = 0;
            this.$emit('update-open-num', this.ChildNum);
        },
        OpenUserManagement() {
            this.ChildNum = 1;
            this.$emit('update-open-num', this.ChildNum);
        },
        OpenPostsManagement() {
            this.ChildNum = 2;
            this.$emit('update-open-num', this.ChildNum);
        },
        OpenCommentsAndRepliesManagement() {
            this.ChildNum = 3;
            this.$emit('update-open-num', this.ChildNum);
        },
        ExitAdminPage() {
            this.$router.push("/");
        },
        GetAdminInfomation() {
            const Token = localStorage.getItem('Token');
            let admin_name = "";
            axios.put(
                '/userdata/get/username',
                {},
                {
                    headers: {
                        "Authorization": "Bearer " + Token
                    }
                }
            )
                .then(
                    (response) => {
                        admin_name = response.data.username;
                        this.AdminUserName = response.data.username;
                        axios.get('/resources/avatar/' + admin_name, {})
                            .then(
                                (response) => {
                                    console.log(this.AdminAvatarImageLink)
                                    this.AdminAvatarImageLink = response.data.avatar_200px
                                }
                            )
                    }
                )
        }
    },
    mounted() {
        this.GetAdminInfomation();
    }
}
</script>

<template>
    <div class="sideMenu">
        <h3 class="MenuTitle">Management</h3>
        <div class="AvatarCircle">
            <img :src="AdminAvatarImageLink" />
        </div>
        <p class="MenuPara">
            Hi, respective <span class="userNameText">{{ AdminUserName }}</span>!
        </p>
        <button @click="OpenOverView" class="MenuItemButton"
            :class="{ MenuItemButtonSelected: ChildNum == 0 }">Overview</button>
        <button @click="OpenUserManagement" class="MenuItemButton" :class="{ MenuItemButtonSelected: ChildNum == 1 }">
            Users
        </button>
        <button @click="OpenPostsManagement" class="MenuItemButton" :class="{ MenuItemButtonSelected: ChildNum == 2 }">
            Posts
        </button>
        <button @click="OpenCommentsAndRepliesManagement" class="MenuItemButton"
            :class="{ MenuItemButtonSelected: ChildNum == 3 }">
            Comment and Replies
        </button>
        <button @click="ExitAdminPage" class="MenuItemButton">
            Exit
        </button>
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

.AvatarCircle {
    width: 200px;
    height: 200px;
    background-color: #7C4DFF;
    border-radius: 100%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    animation: FadeIn 1s;
    border: solid 2px #7C4DFF;
}

.AvatarCircle img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
}

.MenuPara {
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    animation: FadeIn 1s;
}

.userNameText {
    color: #7C4DFF;
}

.sideMenu {
    width: 400px;
    height: 100%;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    animation: FadeIn 1s;
}

.MenuTitle {
    color: #212121;
    line-height: 50px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border-bottom: #BDBDBD solid 1px;
    animation: FadeIn 500ms;
}


.MenuItemButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    line-height: 50px;
    color: #212121;
    margin-top: 10px;
    outline: none;
    border: none;
    background-color: #f7f7f7;
    cursor: pointer;
    transition: ease-in-out 500ms;
    animation: FadeIn 1s;
}

.MenuItemButton:hover {
    background-color: #dad8d8;
    transition: ease-in-out 500ms;
}

.MenuItemButtonSelected {
    background-color: #dad8d8;
    transition: ease-in-out 500ms;
}
</style>