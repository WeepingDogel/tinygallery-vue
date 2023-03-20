<script lang="ts">
import RemarkPanel from './RemarkPanel.vue';
import axios from 'axios';

export default {
    data(){
        return {
            ThePost: Object
        }
    },
    components: {
        RemarkPanel
    },
    methods: {
        // test(){
        //     console.log(this.$route.params.post_uuid)
        // }
        GetTheSingleImageByPostUUID(post_uuid: any){
            axios.get("/resources/posts/single"+ "/" + post_uuid)
            .then(
                (response) => {
                    console.log(response.data);
                    this.ThePost = response.data;
                }
            )
        },
        OpenImage(link: any){
            window.open(link)
        }
    },
    beforeMount(){
        this.GetTheSingleImageByPostUUID(this.$route.params.post_uuid);
    }
}
</script>

<template>
    <!-- <button @click="test">test</button> -->
    <!-- <RemarkPanel /> -->
    <div class="RemarkContainer">
        <div class="RemarkBox">
            <div class="ImageDisplayArea">
                <img @click="OpenImage(ThePost.files_url.original_cover_url)" v-if="ThePost.files_url.image_files_url.length > 1" class="DisplayedImage" :src="ThePost.files_url.original_cover_url"/>
                <div v-for="items in ThePost.files_url.image_files_url">
                    <img @click="OpenImage(items)" class="DisplayedImage" :src="items" />
                </div>
            </div>
            <div class="RemarksArea">
                <div class="InfoBox">
                    <h1 class="InfoTitlte">{{ ThePost.post_title }}</h1>
                    <p class="InfoDescription">{{ ThePost.description }}</p>
                    <button class="CommentButton" @click="">Comment</button>
                    <p class="PublishDate">{{ ThePost.date }}</p>
                </div>
                <!-- <div class="CommentBox">
                    <img class="UserAvatar" />
                    <h1 class="CommentUserName">UserName</h1>
                    <p class="CommentText">Comment Content Text. Once lost thing will never be able to come back.</p>
                    <button class="ReplyButton">Reply</button>
                    <span class="CommentTime">2023-01-01 13:04</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style>
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

@keyframes CommentLoader {
    from {
        opacity: 0;
        transform: translateY(80%);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
}

.CommentButton {
    width: 100px;
    height: 50px;
    background-color: #7C4DFF;
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    border: none;
    outline: none;
    float: right;
    position: relative;
    right: 10px;
    top: 50px;
    border-radius: 10px;
}

.CommentButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.RemarkContainer {
    width: 100%;
    height: auto;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    animation: FadeIn 1s;
}

.RemarkBox {
    width: 100%;
    height: auto;
    min-height: 90vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    transition: 1s ease-in-out;
}

.ImageDisplayArea {
    width: 80%;
    height: 100%;
    min-height: 90vh;
    /* background-color: #3F51B5; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;
}

.DisplayedImage {
    width: 100%;
    height: auto;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;
}

.RemarksArea {
    margin-bottom: 15px;
    width: 20%;
    height: auto;
    min-height: 90vh;
    background-color: #FFFFFF;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.InfoBox {
    width: 100%;
    height: auto;
    min-height: 200px;
    border-bottom: solid 1px #BDBDBD;
}

.InfoTitlte {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 20px;
    line-height: 40px;
}

.InfoDescription {
    line-height: 5px;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    color: #757575;
}

.PublishDate {
    position: relative;
    bottom: -80px;
    display: inline;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    color: #757575;
}

.CommentBox {
    width: 100%;
    min-height: 80px;
    border-bottom: solid 1px #BDBDBD;
    animation: CommentLoader 1s;
}

.UserAvatar {
    width: 60px;
    height: 60px;
    top: 15px;
    left: 15px;
    position: relative;
    border: solid 1px #BDBDBD;
    border-radius: 8px;
}

.CommentUserName {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    display: inline;
    position: relative;
    left: 30px;
    top: -10px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}

.CommentText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    text-align: justify;
    line-height: 20px;
    color: #757575;
    position: relative;
    overflow: scroll;
    white-space: pre-wrap;
    padding: 20px;
}

.CommentTime {
    float: right;
    right: 10px;
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    color: #757575;
}

.ReplyButton {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #7C4DFF;
    color: #FFFFFF;
    outline: none;
    border: none;
    border-radius: 8px;
    position: relative;
    left: 15px;
    bottom: 10px;
    padding: 10px;
}

.ReplyButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>