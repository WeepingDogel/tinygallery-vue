<!-- 
1. The component receives two props: modelValue and PostUUID. 
   modelValue is a Boolean prop used to control the visibility of the remark panel, 
   and PostUUID stores the UUID of the post.

2. The component emits an event update:
   modelValue to notify the parent component when the visibility of the remark panel needs to be updated. 
   This allows for easy communication and synchronization between parent and child components.

3. The comment data property is used to store the user's comment. 
   It is bound to the textarea element using v-model, 
   which means any changes to the textarea will automatically update the comment property and vice versa.

4. The CloseRemarkPanel method is called when the user clicks the close button. 
   It emits the update:modelValue event with the value false, indicating that the remark panel should be hidden.

5. The SendRemark method is called when the user clicks the "Comment" button. 
   It performs the following steps:
   *    Retrieves the comment from the comment property.
   *    Retrieves the post UUID from the PostUUID prop.
   *    Retrieves the token from the local storage.
   *    Constructs a config object with an authorization header containing the token.
   *    Checks if the comment is empty or contains only spaces. 
   *    If it is, an alert is displayed to the user indicating that empty content is invalid.
   *    If the comment is not empty, 
            an HTTP POST request is made to the /remark/create/inpost endpoint 
            with the post UUID and the comment in the request body. 
            The config object is included to provide authorization.
   *    If the request is successful, the response data is logged to the console, 
            the Update method from the UpdateRemarks store is called (presumably to update the list of remarks), 
            the remark panel is closed, and the comment property is cleared.

6. The template section defines the structure of the remark panel. 
   It consists of a wrapper div with the Mask class that controls its visibility based on the modelValue prop. 
   Inside the div, there is a remark panel with a close button, 
   a textarea for the user to enter their comment, and a button to submit the comment.


The value of this code is that it provides a reusable Vue.js component for a remark panel or comment section. 
It handles the logic for displaying and hiding the panel, capturing the user's comment, 
and submitting the comment to a server endpoint. 

By using this component, you can easily add comment functionality to your application 
without having to write the same code repeatedly. 

It promotes code reusability, maintainability, and modularity in your Vue.js application.

 -->

<script lang="ts">
import axios from 'axios';
import { UpdateRemarks } from '@/stores/UpdateRemarks';

export default {
    props: {
        modelValue: Boolean, // Prop to control the visibility of the component
        PostUUID: String // Prop to store the UUID of the post
    },
    emits: ['update:modelValue'], // Event emitted to update the visibility of the component
    data() {
        return {
            comment: "" // Data property to store the user's comment
        }
    },
    methods: {
        CloseRemarkPanel() {
            // Method to close the remark panel
            this.$emit('update:modelValue', false); // Emits an event to update the visibility of the component
        },
        SendRemark() {
            // Method to send the user's remark
            const commentToSent = this.comment; // Get the comment from the data property
            const post_uuid = this.PostUUID; // Get the post UUID from the prop
            const token = localStorage.getItem('Token'); // Get the token from local storage
            const config = {
                headers: {
                    "Authorization": "Bearer " + token, // Set the authorization header with the token
                }
            }
            if (this.comment == "" || this.comment == " ") {
                alert("Empty content is invalid."); // Show an alert if the comment is empty
            } else {
                axios.post(
                    '/remark/create/inpost',
                    {
                        post_uuid: post_uuid,
                        content: commentToSent // Send the post UUID and the comment in the request body
                    },
                    config
                ).then(
                    (response) => {
                        console.log(post_uuid);
                        console.log(response.data); // Log the response data
                        UpdateRemarks().Update(1); // Call the Update method from the UpdateRemarks store
                        this.CloseRemarkPanel(); // Close the remark panel
                        this.comment = ""; // Clear the comment
                    }
                ).catch(
                    (error) => {
                        console.log(error.detail); // Log the error detail if an error occurs
                    }
                )
            }
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
@media only screen and (min-width: 768px) {
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
}

@media only screen and (max-width: 768px) {
    @keyframes FadeIn {
        from {
            opacity: 0;
            /* scale: 0.5; */
            margin-top: 1000px;
        }

        to {
            opacity: 1;
            /* scale: 1; */
            margin-top: 0px;
        }
    }

    .Mask {
        width: 100%;
        height: 50vh;
        /* background-color: rgba(0, 0, 0, 0.3); */
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0px;
        z-index: 2;
    }

    .RemarkPanel {
        width: 100%;
        height: 100%;
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
        /* margin-top: 50px; */
        /* margin-bottom: auto; */
    }

    .MidControl {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 10px;
        /* margin-bottom: auto; */
    }

    .FootControl {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 10px;
        margin-bottom: auto;
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
        width: 90%;
        height: 80px;
        /* margin: auto; */
        /* margin-top: 10px; */
        margin-left: auto;
        margin-right: auto;
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
}
</style>