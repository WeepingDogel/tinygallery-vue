<script lang="ts">
export default {
    data(){
        return{
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
        </div>
        <div class="SystemInfoPart">
            <h1 class="AboutTitle">
                System Information
            </h1>
            <p class="AboutPara">
                TinyGallery: {{ Version }}
            </p>
        </div>
    </div>
</template>

<style>
.AboutContainer {
    width: 100%;
    height: 100vh;
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
    width: 400px;
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

.SystemInfoPart {
    width: 80%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: 0.5s ease-in-out;
    margin: 10px auto;
    border-radius: 10px;
    animation: FadeIn 1s;
}

</style>