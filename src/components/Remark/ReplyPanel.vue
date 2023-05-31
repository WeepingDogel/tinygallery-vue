<!-- ReplyPanel.vue -->
<!-- 
    The component contains several methods for retrieving and displaying data related to a remark and its replies.
    The data property defines three variables: ReplyComment, UserAvatar, and OriginalRemark.
    The props property defines two props that are passed down to the component from its parent: modelValue and RemarkUUID.
    The methods section defines several methods for retrieving the user's avatar, the original remark being replied to, 
    and all replies to the original remark. There is also a method for sending a reply.
    The mounted lifecycle hook calls the GetTheUserAvatar and GetTheOriginalRemark methods when the component is loaded.
 -->
<script lang="ts">
import axios from 'axios';
import { UpdateReplies } from '@/stores/UpdateReplies';
import { Timezone } from '@/stores/TimeZone';

export default {
    data() {
        return {
            ReplyComment: "", // Stores the text of the reply comment
            UserAvatar: String, // Stores the URL of the user's avatar
            UserNameOfOriginalComment: String,
            OriginalRemark: Object, // Stores the original remark being replied to
            AllReplies: [], // Stores all replies related to the current thread or topic,
            Page: 1
        }
    },
    setup() {
        const RepliesUpdate = UpdateReplies();
        const TimeZoneCaculator = Timezone();

        return {
            RepliesUpdate,
            TimeZoneCaculator
        }
    },
    props: {
        modelValue: Boolean, // A boolean that determines whether the reply panel is displayed 
        RemarkUUID: String, // The UUID of the remark being replied to
    },
    emits: ['update:modelValue'], // Emits an event to update the 'modelValue' prop when the reply panel is closed
    methods: {
        closeReplyPanel() { // Closes the reply panel
            this.$emit('update:modelValue', false)
        },
        GetTheUserAvatar() { // Retrieves the URL of the user's avatar
            const Token = localStorage.getItem('Token');
            if (Token) {
                axios.put('/userdata/get/username', {}, { // Sends a PUT request to retrieve the username associated with the token
                    headers: {
                        "Authorization": "Bearer " + Token
                    }
                }).then(
                    (response) => {
                        const username = response.data.username;
                        axios.get('/resources/avatar/' + username, {}) // Sends a GET request to retrieve the user's avatar based on their username
                            .then(
                                (response) => {
                                    console.log(response.data);
                                    this.UserAvatar = response.data.avatar_40px;
                                    this.UserNameOfOriginalComment = username;
                                }
                            )
                    }
                )
            }
        },
        GetTheOriginalRemark() { // Retrieves the original remark being replied to
            axios.get('/remark/get/in_remark/single/' + this.RemarkUUID) // Sends a GET request to retrieve the remark with the specified UUID
                .then(
                    (response) => {
                        console.log(response.data);
                        this.OriginalRemark = response.data;
                    }
                ).catch(
                    (error) => {
                        console.log(error.detail);
                        console.log("Failed to get the original comment.");
                    }
                )
        },
        GetAllReplies() { // Retrieves all replies to the original remark
            axios.get('/remark/get/reply/' + this.RemarkUUID + '/' + this.Page) // Sends a GET request to retrieve all replies 
                .then(
                    (response) => {
                        console.log(response.data); // logs the response data received from the server
                        this.AllReplies = response.data; // assigns the response data to AllReplies array
                        console.log("Success!"); // logs Success! message when API call is successful
                    }
                )
                .catch(
                    (error) => {
                        console.log(error.detail); // logs the error details if any error occurs during API call
                    }
                )
        },
        SendAReply() {
            // Retrieve token from local storage
            const Token = localStorage.getItem('Token');

            // Setup headers for HTTP request
            const headers = {
                headers: {
                    "Authorization": "Bearer " + Token
                }
            }

            // Check if reply comment is empty
            if (this.ReplyComment == "") {
                alert("The content of comment can not be empty!");
            } else {
                // Send a PUT request to retrieve the username associated with the given token
                axios.put('/userdata/get/username', {}, headers)
                    .then(
                        (response) => {
                            // The username is retrieved successfully
                            const username = response.data.username;
                            if (username != false) {
                                // Send a POST request to create a new remark reply using the provided parameters
                                axios.post('/remark/create/reply',
                                    {
                                        reply_to_remark_uuid: this.RemarkUUID,
                                        reply_to_user_name: this.UserNameOfOriginalComment,
                                        content: this.ReplyComment
                                    }, headers
                                ).then(
                                    (response) => {
                                        console.log(response.data.status);
                                        if (response.data.status == "success") {
                                            // If the reply is successfully created, update the list of replies and set the ReplyComment field to an empty string
                                            UpdateReplies().Update(1);
                                            this.ReplyComment = "";
                                        }
                                    }
                                ).catch(
                                    (error) => {
                                        // Log any errors during the HTTP request to console
                                        console.log(error);
                                    }
                                )
                            } else {
                                // Display an alert message indicating that the user needs to login to reply
                                alert("Not authorized! You have to login your account to send a reply!");
                            }
                        }
                    )
                    .catch(
                        (error) => {
                            // Log any errors during the HTTP request to console
                            console.log(error);
                        }
                    )
            }
        }
    },
    mounted() {
        this.GetTheUserAvatar(); // Retrieves the user's avatar when the component is mounted
        this.GetTheOriginalRemark(); // Retrieves the original remark being replied to when the component is mounted
        this.GetAllReplies();
        this.TimeZoneCaculator.GetTheLocalTimeZone();
        this.TimeZoneCaculator.GetTheTimeZoneOfServer();
    },
    watch: {
        'RepliesUpdate.update'(newValue, oldValue) {
            this.AllReplies = [];
            this.GetAllReplies();
        }
    }
}
</script>

<template>
    <div v-if="modelValue" class="Mask">
        <div class="ReplyPanel">
            <div class="TopControl">
                <button @click="closeReplyPanel" class="CloseButton">X</button>
            </div>
            <div class="MidControl">
                <div class="OriginalRemarkDisplay" :id="RemarkUUID">
                    <img :src="(OriginalRemark as any).avatar" class="UserAvatarOfRemarkSender" />
                    <div class="CommentText">
                        <h2 class="UserNameOfRemarkSender">{{ (OriginalRemark as any).user_name }}</h2>
                        <p class="OriginalRemarkContent">{{ (OriginalRemark as any).content }}</p>
                        <p class="RemarkDate">{{ TimeZoneCaculator.CaculateTheCorrectDate((OriginalRemark as any).date) }}</p>
                    </div>
                </div>
                <div class="ReplyDisplay">
                    <div class="RepliesBox" v-for="items of AllReplies">
                        <img class="ReplierAvatar" :src="(items as any).avatar" />
                        <div class="ReplyTextDisplay">
                            <h1 class="ReplierUserName">
                                {{ (items as any).user_name }}
                            </h1>
                            <p class="ReplyContent">
                                {{ (items as any).content }}
                            </p>
                        </div>
                        <p class="RepliesDate">
                            {{ TimeZoneCaculator.CaculateTheCorrectDate((items as any).date) }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="FootControl">
                <div class="ReplySender">
                    <img alt="Not Authorized" :src="UserAvatar" class="AvatarOfReplier" />
                    <input v-model="ReplyComment" class="ReplyInput" placeholder="ReplyTo" />
                    <button @click="SendAReply" class="ReplyButton">Reply</button>
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

    @keyframes RepliesAnimation {
        from {
            opacity: 0;
            margin-top: 100%;
            scale: 0.5;
        }

        to {
            opacity: 1;
            margin-top: 0%;
            scale: 1;
        }
    }

    .Mask {
        top: 0px;
        width: 100%;
        height: 100vh;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1;
        animation: FadeIn 0.5s;
    }

    .ReplyPanel {
        width: 800px;
        height: auto;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .TopControl {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .CloseButton {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: lighter;
        width: 50px;
        height: 50px;
        border: none;
        outline: none;
        border-top-right-radius: 10px;
        color: #212121;
        background-color: #FFFFFF;
        cursor: pointer;
        transition: background-color 0.5s ease;
    }

    .CloseButton:hover {
        background-color: #7C4DFF;
        color: #FFFFFF;
        border: none;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        transition: background-color 0.5s ease;
    }

    .MidControl {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        display: flex;
    }

    .OriginalRemarkDisplay {
        justify-content: flex-start;
        flex-direction: row;
        display: flex;
        border-bottom: solid 1px #BDBDBD;
        padding-bottom: 30px;
    }

    .UserAvatarOfRemarkSender {
        width: 60px;
        height: 60px;
        margin-left: 60px;
        border: solid 1px #DBDBDB;
        border-radius: 8px;
    }

    .CommentText {
        margin-left: 10px;
        justify-content: baseline;
        display: flex;
        flex-direction: column;
    }

    .UserNameOfRemarkSender {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #212121;
        margin-top: auto;
        margin-top: 5px;
        margin-bottom: 2px;
    }

    .OriginalRemarkContent {
        width: 600px;
        height: auto;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #757575;
        margin-top: 2px;
        margin-bottom: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .RemarkDate {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 14px;
        color: #757575;
        /* margin-top: auto; */
        margin-left: auto;
        /* margin-right: 40px; */
        /* line-height: 40px; */
    }

    .ReplyDisplay {
        width: 100%;
        background-color: #f1f1f1;
        height: 400px;
        display: flex;
        flex-direction: column;
        /* flex-shrink: inherit; */
        overflow-y: scroll;
        border-bottom: solid 1px #BDBDBD;
    }

    .FootControl {
        margin-top: auto;
        width: 100%;
        height: 50px;
        padding-bottom: 5px;
        flex-direction: column;
        justify-content: center;
        display: flex;
    }

    .ReplySender {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }

    .ReplyInput {
        width: 83%;
        height: 38px;
        margin-left: auto;
        margin-top: auto;
        margin-right: auto;
        margin-bottom: auto;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        text-indent: 1em;
        border: solid 1px #BDBDBD;
        border-radius: 8px;
        outline: none;
        color: #212121;
    }

    .ReplyInput::placeholder {
        color: #757575;
    }

    .ReplyButton {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        width: 8%;
        height: 40px;
        margin-right: auto;
        /* margin-left: auto; */
        margin-top: auto;
        margin-bottom: auto;
        background-color: #7C4DFF;
        color: #FFFFFF;
        outline: none;
        border: none;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .ReplyButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }


    .AvatarOfReplier {
        width: 40px;
        height: 40px;
        margin-left: auto;
        /* margin-right: auto; */
        margin-top: auto;
        margin-bottom: auto;
        border-radius: 8px;
        border: solid 1px #BDBDBD;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 8px;
        text-align: center;
    }

    .RepliesBox {
        width: 100%;
        height: auto;
        min-height: 80px;
        border-bottom: solid 1px #BDBDBD;
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        /* margin-top: 80%; */
        animation: RepliesAnimation 0.5s;
    }


    .ReplierAvatar {
        width: 50px;
        height: 50px;
        margin-left: 60px;
        margin-top: auto;
        margin-bottom: auto;
        outline: none;
        border: solid 1px #BDBDBD;
        border-radius: 8px;
    }

    .ReplyTextDisplay {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 20px;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        text-align: justify;
        width: 430px;

    }

    .ReplierUserName {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #212121;
    }

    .ReplyContent {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        color: #757575;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .RepliesDate {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 14px;
        color: #757575;
        margin-top: auto;
        margin-bottom: 20px;
        margin-right: 60px;
    }
}

@media only screen and (max-width:768px) {
    @keyframes FadeIn {
        from {
            opacity: 0;
            margin-top: 1000px;
        }

        to {
            opacity: 1;
            margin-top: 0px;
        }
    }

    @keyframes RepliesAnimation {
        from {
            opacity: 0;
            margin-top: 100%;
            scale: 0.5;
        }

        to {
            opacity: 1;
            margin-top: 0%;
            scale: 1;
        }
    }

    .Mask {
        /* top: 0px; */
        width: 100%;
        height: 72vh;
        position: fixed;
        /* background-color: rgba(0, 0, 0, 0.3); */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 2;
        /* animation: FadeIn 0.5s; */
        bottom: 0px;
    }

    .ReplyPanel {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        justify-content: center;
        animation: FadeIn 1s;
    }

    .TopControl {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .CloseButton {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: lighter;
        width: 50px;
        height: 50px;
        border: none;
        outline: none;
        border-top-right-radius: 10px;
        color: #212121;
        background-color: #FFFFFF;
        cursor: pointer;
        transition: background-color 0.5s ease;
    }

    .CloseButton:hover {
        background-color: #7C4DFF;
        color: #FFFFFF;
        border: none;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        transition: background-color 0.5s ease;
    }

    .MidControl {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

    .OriginalRemarkDisplay {
        justify-content: flex-start;
        flex-direction: row;
        display: flex;
        border-bottom: solid 1px #BDBDBD;
        padding-bottom: 20px;
    }

    .UserAvatarOfRemarkSender {
        width: 60px;
        height: 60px;
        margin-left: 30px;
        border: solid 1px #DBDBDB;
        border-radius: 8px;
    }

    .CommentText {
        margin-left: 20px;
        justify-content: baseline;
        display: flex;
        flex-direction: column;
    }

    .UserNameOfRemarkSender {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 24px;
        color: #212121;
        margin-top: auto;
        margin-top: 5px;
        margin-bottom: 2px;
    }

    .OriginalRemarkContent {
        width: 600px;
        height: auto;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #757575;
        margin-top: 2px;
        margin-bottom: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .RemarkDate {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        color: #757575;
        /* margin-top: auto; */
        /* margin-left: 10px; */
        /* margin-right: 40px; */
        /* line-height: 40px; */
    }

    .ReplyDisplay {
        width: 100%;
        background-color: #f1f1f1;
        height: 30vh;
        display: flex;
        flex-direction: column;
        /* flex-shrink: inherit; */
        overflow-y: scroll;
        border-bottom: solid 1px #BDBDBD;
    }

    .FootControl {
        margin-top: auto;
        width: 100%;
        height: auto;
        /* padding-bottom: 5px; */
        flex-direction: column;
        justify-content: center;
        display: flex;
    }

    .ReplySender {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        flex-direction: row;
        padding-top: 5px;
    }

    .ReplyInput {
        width: 265px;
        height: 38px;
        margin-left: auto;
        margin-top: auto;
        margin-right: auto;
        margin-bottom: auto;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        text-indent: 1em;
        border: solid 1px #BDBDBD;
        border-radius: 8px;
        outline: none;
        color: #212121;
    }

    .ReplyInput::placeholder {
        color: #757575;
    }

    .ReplyButton {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 14px;
        width: 70px;
        height: 40px;
        margin-right: auto;
        /* margin-left: auto; */
        margin-top: auto;
        margin-bottom: auto;
        background-color: #7C4DFF;
        color: #FFFFFF;
        outline: none;
        border: none;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .ReplyButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }


    .AvatarOfReplier {
        width: 40px;
        height: 40px;
        margin-left: auto;
        /* margin-right: auto; */
        margin-top: auto;
        margin-bottom: auto;
        border-radius: 8px;
        border: solid 1px #BDBDBD;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 8px;
        text-align: center;
    }

    .RepliesBox {
        width: 100%;
        height: auto;
        min-height: 80px;
        border-bottom: solid 1px #BDBDBD;
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        /* margin-top: 80%; */
        animation: RepliesAnimation 0.5s;
    }


    .ReplierAvatar {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        margin-top: auto;
        margin-bottom: auto;
        outline: none;
        border: solid 1px #BDBDBD;
        border-radius: 8px;
    }

    .ReplyTextDisplay {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        text-align: justify;
        width: 430px;

    }

    .ReplierUserName {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #212121;
    }

    .ReplyContent {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        color: #757575;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .RepliesDate {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 14px;
        color: #757575;
        margin-top: auto;
        margin-bottom: 20px;
        /* margin-right: 60px; */
    }
}
</style>