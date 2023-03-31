<script lang="ts">
import RemarkPanel from './RemarkPanel.vue';
import axios from 'axios';

export default {
    data() {
        return {
            ThePost: Object,
            Remarks: Object,
            RemarkPanelON: false,
            ReplyTo: '',
            RemarkPage: 1
        }
    },
    components: {
        RemarkPanel
    },
    methods: {
        // test(){
        //     console.log(this.$route.params.post_uuid)
        // }
        GetTheSingleImageByPostUUID(post_uuid: any) {
            axios.get("/resources/posts/single/" + post_uuid)
                .then(
                    (response) => {
                        console.log(response.data);
                        this.ThePost = response.data;
                    }
                )
        },
        GetTheRmarksOfThePost(post_uuid: any) {
            axios.get("/remark/get/inpost/" + post_uuid + '/' + this.RemarkPage)
                .then(
                    (response) => {
                        console.log(response.data);
                        this.Remarks = response.data;
                    }
                )
        },
        GetTheRepliesOfTheRemark(remark_uuid: any) {
            axios.get('/')
                .then()
        },
        OpenImage(link: any) {
            window.open(link)
        },
        OpenRemarkPanel(ReplyTo: any) {
            this.RemarkPanelON = true;
            // this.ReplyTo = ReplyTo
        }
    },
    beforeMount() {
        this.GetTheSingleImageByPostUUID(this.$route.params.post_uuid);
        this.GetTheRmarksOfThePost(this.$route.params.post_uuid);
    }
}
</script>

<template>
    <!-- <button @click="test">test</button> -->
    <RemarkPanel :ReplyUUID="ReplyTo" v-model="RemarkPanelON" />
    <div class="RemarkContainer">

        <div class="RemarkBox">
            <div class="ImageDisplayArea">
                <img @click="OpenImage(ThePost.files_url.original_cover_url)"
                    v-if="ThePost.files_url.image_files_url.length > 1" class="DisplayedImage"
                    :src="ThePost.files_url.original_cover_url" />
                <div v-for="items of ThePost.files_url.image_files_url">
                    <img @click="OpenImage(items)" class="DisplayedImage" :src="items" />
                </div>
            </div>
            <div class="RemarksArea">
                <div class="InfoBox">
                    <h1 class="InfoTitlte">{{ ThePost.post_title }}</h1>
                    <p class="InfoDescription">
                        Author: <b style="color: #7C4DFF;">{{ ThePost.user_name }}</b>
                        <br />
                        {{ ThePost.description }}
                        <br />
                        <b style="color: #7C4DFF;">Likes: {{ ThePost.dots }}</b>
                    </p>
                    <div class="InfoBoxFoot">
                        <p class="PublishDate">{{ ThePost.date }}</p>
                        <button class="LikeButton">Like</button>

                        <button class="CommentButton" @click="OpenRemarkPanel">Comment</button>
                    </div>
                </div>
                <div class="CommentBox" v-for="items in Remarks">
                    <img class="UserAvatar" :src="items.avatar" />
                    <h1 class="CommentUserName">{{ items.user_name }}</h1>
                    <p class="CommentText">{{ items.content }}</p>
                    <button class="ReplyButton">Reply</button>
                    <span class="CommentTime">{{ items.date }}</span>
                </div>
            </div>
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

.LikeButton {
    width: 50px;
    height: 50px;
    background-color: #FFFFFF;
    color: #ffaab8;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    border: solid 1px #ffaab8;
    outline: none;
    border-radius: 10px;
    margin-left: auto;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.LikeButton:hover {
    background-color: #ffaab8;
    color: #FFFFFF;
    transition: background-color 0.5s ease;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
    border-radius: 10px;
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.CommentButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
    display: flex;
    flex-direction: column;
}

.InfoTitlte {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 20px;
    line-height: 40px;
}

.InfoDescription {
    line-height: 20px;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    color: #757575;
}

.InfoBoxFoot {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: auto;
    margin-bottom: 10px;
}

.PublishDate {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    color: #757575;
    margin-left: 20px;
    margin-right: auto;
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
    cursor: pointer;
}

.ReplyButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>