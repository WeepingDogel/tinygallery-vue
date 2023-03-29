<!-- @/components/Upload/Uploader.vue -->
<script lang="ts">
import { UpdateImages } from '@/stores/UpdateImages'
import axios from 'axios';

export default {
    props: {
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            CustomCover: false,
            is_nsfw: "",
            uploadImagesFile: FileList,
            coverFile: null,
            post_title: "",
            description: ""
        }
    },
    methods: {
        closeUploader() {
            this.$emit('update:modelValue', false)
        },
        test() {
            console.log(this.is_nsfw)
        },
        loadFile(event: any) {
            this.uploadImagesFile = event.target.files;
            console.log(this.uploadImagesFile)
        },
        loadCoverFile(event: any) {
            this.coverFile = event.target.files[0];
            console.log(this.coverFile)
        },
        uploadPost() {
            if (this.post_title == "" || this.description == "") {
                console.log("Title and Dercription can't be empty!");
            }
            else {
                const token = localStorage.getItem('Token');
                const config = {
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-type": "multipart/form-data"
                    },
                };
                let is_nsfw;
                let bodyFormData = new FormData();
                if (this.is_nsfw) {
                    is_nsfw = "true"
                } else {
                    is_nsfw = "false"
                }
                bodyFormData.append('is_nsfw', is_nsfw);
                bodyFormData.append('post_title', this.post_title);
                bodyFormData.append('description', this.description);
                if (this.CustomCover) {
                    bodyFormData.append('cover', this.coverFile);
                } else {
                    bodyFormData.append('cover', "")
                }
                for (let i = 0; i < this.uploadImagesFile.length; i++) {
                    console.log(this.uploadImagesFile[i])
                    bodyFormData.append('uploaded_file', this.uploadImagesFile[i])
                }
                console.log(bodyFormData)
                axios.post('posts/create', bodyFormData, config)
                    .then((response) => {
                        console.log(response);
                        if (response.data.status = "success") {
                            this.$emit('update:modelValue', false);
                            UpdateImages().Update(1);
                            this.$router.push("/");
                        }
                    }).catch((error) => {
                        console.error(error);
                        alert(error.response.data.detail);
                    })

            }
            this.post_title = ""
            this.description = ""
            this.is_nsfw = ""
            this.CustomCover = false
        }
    }
}
</script>

<template>
    <div class="Mask" v-if="modelValue">
        <div class="UploaderPanel">
            <!-- <button @click="test">test</button> -->
            <h1 class="UploaderTitle">Upload Your Creativity</h1>
            <button @click="closeUploader" class="closeButton">X</button>
            <input v-model="post_title" class="TitleInputer" placeholder="Type Your Title of your artwork." />
            <textarea v-model="description" class="DescriptionText" placeholder="Description"></textarea>
            <div class="FileSelectionContainer">
                <input @change="loadFile" class="UploaderFile" type="file" multiple />
                <input type="checkbox" v-model="is_nsfw" id="isNSFW">
                <label class="NSFW" for="isNSFW">NSFW</label>
                <input type="checkbox" v-model="CustomCover" id="CustomCover">
                <label class="NSFW" for="CustomCover">CustomCover</label>
            </div>
            <div class="FileSelectionContainer">
                <input v-if="CustomCover" @change="loadCoverFile" class="UploaderFile" type="file" />
            </div>
            <div class="UploaderButtonContainer">
                <button @click="uploadPost" class="UploaderFunctionButton">Upload</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes FadeIn {
    from {
        opacity: 0;
        scale: 0.8;
        margin-top: 200px;
    }

    to {
        opacity: 1;
        scale: 1;
        margin-top: 0px;
    }
}

.NSFW {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin: 10px;
}

.FileSelectionContainer {
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
    position: fixed;
    width: 100%;
    height: 120vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    top: -100px;
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