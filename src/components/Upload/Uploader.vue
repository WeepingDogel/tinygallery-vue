<!-- @/components/Upload/Uploader.vue -->
<script lang="ts">
import { Authentication } from '@/stores/Authentication';

export default {
    props:{
        modelValue:Boolean
    },
    emits:['update:modelValue'],
    data(){
        return {
            CustomCover: false,
        }
    },
    methods: {
        closeUploader(){
            this.$emit('update:modelValue', false)
        },
        // test(){
        //     console.log(this.CustomCover)
        // }
    }
}
</script>

<template>
    <div class="Mask" v-if="modelValue" >
        <div class="UploaderPanel">
            <h1 class="UploaderTitle">Upload Your Creativity</h1>
            <button @click="closeUploader" class="closeButton">X</button>
            <input class="TitleInputer" placeholder="Type Your Title of your artwork." />
            <textarea class="DescriptionText" placeholder="Description"></textarea>
            <div class="FileSelectionContainer">
                <input class="UploaderFile" type="file" multiple/>
                <input type="checkbox" id="isNSFW" >
                <label class="NSFW" for="isNSFW">NSFW</label>
                <input type="checkbox" v-model="CustomCover" id="CustomCover" >
                <label class="NSFW" for="CustomCover">CustomCover</label>
            </div>
            <div class="FileSelectionContainer">
                <input v-if="CustomCover" class="UploaderFile" type="file" />
            </div>
            <div class="UploaderButtonContainer">
                <button class="UploaderFunctionButton" >Upload</button>
            </div>
        </div>
    </div>
</template>

<style>

.NSFW{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin: 10px;
}

.FileSelectionContainer{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}

.UploaderFile {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin-top: 10px;
}

.UploaderFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #FFFFFF;
    border: solid 1px #BDBDBD;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
}


.closeButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    color: #212121;
    background-color: #FFFFFF;
    cursor: pointer;
    position: relative;
    left: 575px;
    top: -100px;
    transition: 1000ms;
}

.UploaderFunctionButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #FFFFFF;
    border: solid 1px #BDBDBD;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
}

.UploaderFile::file-selector-button:hover,
.closeButton:hover,
.UploaderFunctionButton:hover {
    background-color: #7C4DFF;
    color: #FFFFFF;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
}

.UploaderFile::file-selector-button:active,
.closeButton:active,
.UploaderFunctionButton:active {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.UploaderTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: lighter;
    line-height: 100px;
    text-align: center;
    text-transform: uppercase;
    color: #212121;
}

.TitleInputer {
    width: 70%;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 28px;
    margin: auto;
    color: #212121;
    border: none;
    border-bottom: solid 2px #BDBDBD;
    outline: none;
    transition: 1000ms;
    padding: 5px;
}

.TitleInputer:focus {
    transition: 1000ms;
    border-bottom: solid 2px #212121;
}

.TitleInputer::placeholder {
    color: #757575;
}


.DescriptionText {
    width: 69%;
    height: 200px;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 20px;
    text-align: justify;
    padding: 10px;
    outline: none;
    color: #212121;
    border: solid 2px #BDBDBD;
    transition: 1000ms;
    border-radius: 8px;
}

.DescriptionText:focus {
    transition: 1000ms;
    border: solid 2px #212121;
}

.DescriptionText::placeholder {
    color: #757575;
}


.Mask {
    top: -70px;
    position: absolute;
    width: 100%;
    height: 110vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.UploaderPanel {
    width: 1200px;
    height: 800px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 1s;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.UploaderButtonContainer {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}
</style>