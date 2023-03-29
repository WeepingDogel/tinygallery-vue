<script lang="ts">
export default {
    data() {
        return {
            Version: "1.0.0-Beta",
        }
    }
}
</script>

<template>
    <div class="AboutContainer">
        <div class="IntroductionPart">
            <h1 class="AboutTitle">
                About TinyGallery
            </h1>
            <img class="Logo" src="@/assets/TinyGallery_Logo.png" />
            <p class="AboutPara">
                <br />
                TinyGallery is an open-source project providing the drawing lovers a free and simple gallery service.
                <br />
                And this one is made as a vue edition.
            </p>
            <h1 class="AboutTitle">Technology Stack</h1>
            <p class="AboutPara">
                <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&amp;logo=vuedotjs&amp;logoColor=%234FC08D"
                    alt="Vue.js">
                <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&amp;logo=vite&amp;logoColor=white"
                    alt="Vite">
                <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"
                    alt="TypeScript">
                <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&amp;logo=fastapi" alt="FastAPI">
                <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&amp;logo=python&amp;logoColor=ffdd54"
                    alt="Python">
                <img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&amp;logo=sqlite&amp;logoColor=white"
                    alt="SQLite">
            </p>
            <h1 class="AboutTitle">Source Code</h1>
            <p class="AboutPara">
                Vue Front End: <br />
                <a href="https://github.com/WeepingDogel/tinygallery-vue"><img
                        src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                        alt="GitHub"></a>
            </p>
            <p class="AboutPara">
                Backend: <br />
                <a href="https://github.com/WeepingDogel/tinygallery-backend"><img
                        src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"
                        alt="GitHub"></a>
            </p>
        </div>
    </div>
</template>

<style scoped>
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
    height: auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: 0.5s ease-in-out;
    margin: 10px auto;
    border-radius: 10px;
    animation: FadeIn 1s;
}

.IntroductionPart .Logo {
    width: 800px;
    height: auto;
    margin: 0 auto;
    display: block;
    padding: 10px;
}

.AboutTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 25px;
    padding: 20px;
}

.AboutPara {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 20px;
    text-align: justify;
    line-height: 25px;
}

.AboutPara img {
    margin: 5px;
}
</style>