<script lang="ts">
import axios from 'axios';
import { UpdateRemarks } from '@/stores/UpdateRemarks'


export default {
    props: {
        modelValue: Boolean,
        PostUUID: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            comment: ""
        }
    },
    methods: {
        CloseRemarkPanel() {
            this.$emit('update:modelValue', false);
        },
        SendRemark() {
            const commentToSent = this.comment;
            const post_uuid = this.PostUUID;
            const token = localStorage.getItem('Token')
            const config = {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }
            if (this.comment == "" || this.comment == " ") {
                alert("Empty content is invalid.");
            }
            else {
                axios.post(
                    '/remark/create/inpost',
                    {
                        post_uuid: post_uuid,
                        content: commentToSent
                    },
                    config
                ).then(
                    (response) => {
                        console.log(post_uuid)
                        console.log(response.data);
                        UpdateRemarks().Update(1);
                        this.CloseRemarkPanel();
                        this.comment = "";
                    }
                ).catch(
                    (error) => {
                        console.log(error.detail)
                    }
                )
            }
            // console.log(post_uuid)

        }
    }
}
</script>

<template>
    <div class="Mask" v-if="modelValue">
        <div class="RemarkPanel">
            <div class="TopControl">
                <button @click="CloseRemarkPanel" class="CloseButton">X</button>
            </div>
            <div class="MidControl">
                <textarea class="CommentArea" placeholder="Leave your comment." v-model="comment"></textarea>
            </div>
            <div class="FootControl">
                <button class="SentButton" @click="SendRemark">Comment</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes FadeIn {
    from {
        opacity: 0;
        scale: 0.5;
        margin-top: 200px;
    }

    to {
        opacity: 1;
        scale: 1;
        margin-top: 0px;
    }
}

.Mask {
    width: 100%;
    height: 120vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0px;
    z-index: 2;
}

.RemarkPanel {
    width: 500px;
    height: 500px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    flex-direction: column;
    animation: FadeIn 0.5s;
}

.TopControl {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: auto;
}

.MidControl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: auto;
}

.FootControl {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: auto;
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

.SentButton {
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
    margin-bottom: 10px;
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

.SentButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ReplyTo {
    width: 70%;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin: auto;
    color: #212121;
    border: none;
    border-bottom: solid 2px #BDBDBD;
    outline: none;
    padding: 5px;
    transition: ease-in-out 0.5s border;
}

.CommentArea {
    width: 68%;
    height: 290px;
    margin: auto;
    margin-top: 10px;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    text-align: justify;
    padding: 10px;
    outline: none;
    color: #212121;
    border: solid 2px #BDBDBD;
    transition: 1000ms;
    border-radius: 10px;
    transition: ease-in-out 0.5s border;
}

.ReplyTo:hover,
.ReplyTo:focus {
    transition: ease-in-out 0.5s border;
    border-bottom: solid 2px #212121;
    color: #212121;
}

.CommentArea:hover,
.CommentArea:focus {
    transition: ease-in-out 0.5s border;
    border: solid 2px #212121;
    color: #212121;
}
</style>