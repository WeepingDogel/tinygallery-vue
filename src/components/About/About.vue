<!-- About -->
<script lang="ts">
import axios from 'axios';

export default {
    // Define the component's data
    data() {
        return {
            Version: "1.0.0-Beta", // The current version of TinyGallery
            user_num: String,
            posts_num: String,
            comments_num: String
        }
    },
    methods:{
        GetTheData(){
            axios.get('/userdata/get/user_num')
            .then(
                (response) => {
                    this.user_num = response.data.toLocaleString();
                }
            );
            axios.get('/userdata/get/posts_num')
            .then(
                (response) => {
                    this.posts_num = response.data.toLocaleString();
                }
            )
            axios.get('/userdata/get/comments_num')
            .then(
                (response) => {
                    this.comments_num = response.data.toLocaleString();
                }
            )
            console.log(this.user_num);
            console.log(this.posts_num);
            console.log(this.comments_num);
        }
    },
    mounted(){
        this.GetTheData();
    }
}
</script>

<template>
    <div class="AboutContainer">
        <div class="IntroductionPart">
            <h1 class="AboutTitle">
                About TinyGallery
            </h1>
            <div class="top-control">
                <!-- TinyGallery logo -->
                <img class="Logo" src="@/assets/TinyGallery_Logo.png" />
                <div class="text-control">
                    <!-- Introduction section -->
                    <h1 class="AboutParaTitle">Introduction</h1>
                    <p class="AboutPara">
                        TinyGallery is an open-source project providing the drawing lovers a free and simple gallery
                        service.
                    </p>
                    <p class="AboutPara">
                        And this one is made as a vue edition.
                    </p>
                    <!-- Technology stack section -->
                    <h1 class="AboutParaTitle">Technology Stack</h1>
                    <p class="AboutPara">
                        <!-- Badges for various technologies used in TinyGallery -->
                        <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&amp;logo=vuedotjs&amp;logoColor=%234FC08D"
                            alt="Vue.js">
                        <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&amp;logo=vite&amp;logoColor=white"
                            alt="Vite">
                        <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"
                            alt="TypeScript">
                        <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&amp;logo=fastapi"
                            alt="FastAPI">
                        <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&amp;logo=python&amp;logoColor=ffdd54"
                            alt="Python">
                        <img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&amp;logo=sqlite&amp;logoColor=white"
                            alt="SQLite">
                    </p>
                    <!-- Source code section -->
                    <h1 class="AboutParaTitle">Source Code</h1>
                    <p class="AboutPara">
                        Vue Front End:
                        <br />
                        <a href="https://github.com/WeepingDogel/tinygallery-vue">
                            <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                                alt="GitHub">
                        </a>
                        <br />
                        Backend:
                        <br />
                        <a href="https://github.com/WeepingDogel/tinygallery-backend">
                            <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                                alt="GitHub">
                        </a>
                    </p>
                    <p class="AboutPara">
                        <span class="InfoNumber">{{ user_num }}</span> Users are enjoying this example site! 
                    </p>
                    <p class="AboutPara">
                        <span class="InfoNumber">{{ posts_num }}</span> ArtWorks were published! 
                    </p>
                    <p class="AboutPara">
                        <span class="InfoNumber">{{ comments_num }}</span> Comments in total the users posted!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* CSS styling for the component */

@media only screen and (min-width: 768px) {
    @keyframes FadeIn {
        from {
            opacity: 0;
            top: 10px;
        }

        to {
            opacity: 1;
            top: 0px;
        }
    }

    .AboutContainer {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: start;
        animation: FadeIn 0.5s;
    }

    .IntroductionPart {
        width: 80%;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        transition: 0.5s ease-in-out;
        margin: 10px auto;
        border-radius: 10px;
        animation: FadeIn 0.5s;
        background-color: #FFFFFF;
    }

    .Logo {
        width: 350px;
        height: 350px;
        /* margin: 0 auto; */
        display: block;
        padding: 10px;
    }


    .top-control {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
    }

    .text-control {
        display: flex;
        flex-direction: column;
    }

    .AboutTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 25px;
        padding: 20px;
        margin-left: auto;
        margin-right: auto;
    }


    .AboutParaTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 22px;
        padding: 10px;
    }

    .AboutPara {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        padding: 10px;
        text-align: justify;
        line-height: 20px;
    }

    .AboutPara img {
        margin: 5px;
    }

    .InfoNumber {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bolder;
        font-size: 28px;
        padding: 10px;
        text-align: justify;
        line-height: 20px;
        color: #7C4DFF;
    }
}

@media only screen and (max-width: 768px) {
    @keyframes FadeIn {
        from {
            opacity: 0;
            top: 10px;
        }

        to {
            opacity: 1;
            top: 0px;
        }
    }

    .AboutContainer {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: start;
        animation: FadeIn 0.5s;
    }

    .IntroductionPart {
        width: 95%;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        transition: 0.5s ease-in-out;
        margin: 10px auto;
        border-radius: 10px;
        animation: FadeIn 0.5s;
        background-color: #FFFFFF;
    }

    .Logo {
        width: 350px;
        height: 350px;
        /* margin: 0 auto; */
        display: block;
        padding: 10px;
    }


    .top-control {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
    }

    .text-control {
        display: flex;
        flex-direction: column;
    }

    .AboutTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 25px;
        padding: 20px;
        margin-left: auto;
        margin-right: auto;
    }


    .AboutParaTitle {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 22px;
        padding: 10px;
    }

    .AboutPara {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        padding: 10px;
        /* text-align: justify; */
        line-height: 20px;
        /* text-indent: 2em; */
    }

    .AboutPara img {
        margin: 5px;
    }
}
</style>