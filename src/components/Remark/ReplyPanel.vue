<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            ReplyComment: "",
            UserAvatar: String,
            OriginalRemark: Object
        }
    },
    props: {
        modelValue: Boolean,
        RemarkUUID: String,
    },
    emits: ['update:modelValue'],
    methods: {
        closeReplyPanel() {
            this.$emit('update:modelValue', false)
        },
        GetTheUserAvatar() {
            const Token = localStorage.getItem('Token');
            if (Token) {
                axios.put('/userdata/get/username', {}, {
                    headers: {
                        "Authorization": "Bearer " + Token
                    }
                }).then(
                    (response) => {
                        const username = response.data.username;
                        axios.get('/resources/avatar/' + username, {})
                            .then(
                                (response) => {
                                    console.log(response.data);
                                    this.UserAvatar = response.data.avatar_40px;
                                }
                            )
                    }
                )
            }
        },
        GetTheOriginalRemark() {
            axios.get('/remark/get/in_remark/single/' + this.RemarkUUID)
                .then(
                    (response) => {
                        console.log(response.data);
                        this.OriginalRemark = response.data;
                    }
                )
        },
        GetAllReplies() {
            axios.get('/')
                .then(
                    (response) => {

                    }
                )
                .catch(
                    (erorr) => {

                    }
                )
        },
        SendAReply() {

        }
    },
    mounted() {
        this.GetTheUserAvatar();
        this.GetTheOriginalRemark()
    },
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
                    <img :src="OriginalRemark.avatar" class="UserAvatarOfRemarkSender" />
                    <div class="CommentText">
                        <h2 class="UserNameOfRemarkSender">{{ OriginalRemark.user_name }}</h2>
                        <p class="OriginalRemarkContent">{{ OriginalRemark.content }}</p>
                        <p class="RemarkDate">{{ OriginalRemark.date }}</p>
                    </div>
                </div>
                <div class="ReplyDisplay">
                    <div class="RepliesBox">
                        <img class="ReplierAvatar" />
                        <div class="ReplyTextDisplay">
                            <h1 class="ReplierUserName">
                                UserName
                            </h1>
                            <p class="ReplyContent">
                                Comment Text.
                            </p>
                        </div>
                        <p class="RepliesDate">
                            2023-4-30
                        </p>
                    </div>
                </div>
            </div>
            <div class="FootControl">
                <div class="ReplySender">
                    <img :src="UserAvatar" class="AvatarOfReplier" />
                    <input class="ReplyInput" placeholder="ReplyTo" />
                    <button class="ReplyButton">Reply</button>
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
    height: 600px;
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
    border: solid 1px #BDBDBD;
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
    overflow-y: scroll;
    border-bottom: solid 1px #BDBDBD;
}

.FootControl {
    margin-top: auto;
    width: 100%;
    height: 50px;
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
}


.RepliesBox {
    width: 100%;
    min-height: 80px;
    height: auto;
    border-bottom: solid 1px #BDBDBD;
    display: flex;
    flex-direction: row;
}


.ReplierAvatar {
    width: 50px;
    height: 50px;
    margin-left: 140px;
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
    margin-right: 140px;
}
</style>