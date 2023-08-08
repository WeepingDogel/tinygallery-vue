<!-- Remark.vue -->
<!-- 
    The first two lines are import statements for two child components 
    - RemarkPanel and ReplyPanel - which are used in the current component.

    The third line imports a function called UpdateRemarks from a file located at '@/stores/UpdateRemarks'. 
    This is likely a Vuex store action or mutation that updates the state of the 'Remarks' array 
    when a new remark is added to the post.

    The fourth line imports a library called axios, which is an HTTP client that helps make requests to an API.

    The component definition begins on line 6 with the 'export default' statement. 
    This is where we define the properties, methods, and other logic of the component.

    Starting on line 7, we define the data property of the component using a function that returns an object 
    with several properties:

        ThePost: 
        This is an empty object that will eventually hold the details of a single post.

        Remarks: 
        This is an empty array that will eventually hold all the remarks on the post.

        RemarkPanelON:  
        This boolean value represents whether the RemarkPanel component is open or closed. 
        It is initially set to false.

        ReplyPanelON: 
        This boolean value represents whether the ReplyPanel component is open or closed. It is initially set to false.

        ReplyToUUID: 
        This variable is an empty string that will be used to store the UUID of the comment being replied to.

        RemarkPage: 
        This variable is set to 1 and represents the page number of remarks to be shown on the screen.

    On line 14, we define the setup function of the component, which returns an object containing the constant RemarkUpdate. 
    This function is used to set up any reactive variables that need to be watched by Vue.
    
    RemarkUpdate is a constant that calls the imported UpdateRemarks function. 
    We can use this constant to reference the function in other parts of the component.

    On line 20, we register the child components used in the current component - RemarkPanel and ReplyPanel.

    Starting on line 24, we define several methods that will be used in the component:

        GetTheSingleImageByPostUUID: 
        This method takes a post UUID as an argument and makes a GET request to fetch the details of a single post 
        from the API using axios. 
        The response data is then stored in the ThePost object.

        GetTheRmarksOfThePost: 
        This method takes a post UUID as an argument and makes a GET request to fetch all the remarks for the post 
        from the API using axios. 
        The response data is then stored in the Remarks array.

        GetTheRepliesOfTheRemark: 
        This method takes a remark UUID as an argument and makes a GET request to fetch all the replies for the remark 
        from the API using axios. T
        his method is currently empty and needs to be implemented further to work correctly.

        OpenImage: 
        This method takes an image link as an argument and opens the link in a new window when called.

        OpenRemarkPanel: 
        This method takes a ReplyTo argument (which is likely a comment UUID) 
        and sets the RemarkPanelON boolean value to true to open the RemarkPanel component. 
        This method is currently commented out, so it doesn't actually do anything yet.

        ReplyAComment: 
        This method takes a CommentUUID argument (which is likely a comment UUID) 
        and sets the ReplyToUUID variable to the UUID of the comment being replied to. 
        It also sets the ReplyPanelON boolean value to true to open the ReplyPanel component.

    The beforeMount lifecycle hook on line 51 is called just before the component is mounted. 
    
    Here, we call two methods - GetTheSingleImageByPostUUID and GetTheRmarksOfThePost - 
    to fetch the post details and remarks from the API.

    The watch object on line 56 is used to listen for changes in the RemarkUpdate property of the component. 
    If this property changes, which occurs when a new remark is added to the post, 
    we clear the Remarks array and call the GetTheRmarksOfThePost method again to refresh the remarks shown on the screen.

That's a high-level explanation of what's going on in this Vue component! Let me know if you have any questions.
 -->
<script lang="ts">
import RemarkPanel from './RemarkPanel.vue'; // Importing the component 'RemarkPanel' from its file path.
import ReplyPanel from './ReplyPanel.vue'; // Importing the component 'ReplyPanel' from its file path.
import { UpdateRemarks } from '@/stores/UpdateRemarks'; // Importing the function 'UpdateRemarks' from its file path in the stores folder.
import axios from 'axios'; // Importing the HTTP client library 'axios'.
import { Timezone } from '@/stores/TimeZone';

export default {
    data() { // Defining the data property of the component.
        return {
            ThePost: Object, // Initializing an empty object to hold a single post.
            Remarks: [], // Initializing an empty array to hold all the remarks on a post.
            RemarkPanelON: false, // Setting the initial state of the 'RemarkPanel' component as closed.
            ReplyPanelON: false, // Setting the initial state of the 'ReplyPanel' component as closed.
            ReplyToUUID: "", // Initializing an empty string to hold the UUID of the comment being replied to.
            RemarkPage: 1, // Initializing the page number of remarks to be shown on the screen.
            LikesData: Object
        }
    },
    setup() { // Defining the setup function of the component.
        const RemarkUpdate = UpdateRemarks(); // Calling the imported 'UpdateRemarks' function and storing it in a constant.
        const TimeZoneCaculator = Timezone();

        return {
            RemarkUpdate, // Returning the constant 'RemarkUpdate' to use it later in the component.
            TimeZoneCaculator
        }
    },
    components: { // Registering the child components used in the current component.
        RemarkPanel,
        ReplyPanel
    },
    methods: { // Defining the methods used in the component.
        GetTheSingleImageByPostUUID(post_uuid: any) { // A method that fetches a single post by UUID.
            axios.get("/resources/posts/single/" + post_uuid) // Making a GET request to the server endpoint that returns a single post.
                .then(
                    (response) => { // Handling the server response.
                        console.log(response.data); // Logging the received data in the console.
                        this.ThePost = response.data; // Updating the 'ThePost' object with the received post data.
                    }
                )
        },
        GetTheRmarksOfThePost(post_uuid: any) { // A method that fetches all the remarks of a post by UUID.
            axios.get("/remark/get/inpost/" + post_uuid + '/' + this.RemarkPage) // Making a GET request to the server endpoint that returns all the remarks of a post.
                .then(
                    (response) => { // Handling the server response.
                        console.log(response.data); // Logging the received data in the console.
                        this.Remarks = response.data; // Updating the 'Remarks' array with the received remark data.
                    }
                )
        },
        GetTheRepliesOfTheRemark(remark_uuid: any) { // A method that fetches all the replies of a remark by UUID.
            axios.get('/') // Making a GET request to the server endpoint that returns all the replies of a remark.
                .then()
        },
        OpenImage(link: any) { // A method that opens an image link in a new window.
            window.open(link)
        },
        OpenRemarkPanel(ReplyTo: any) { // A method that opens the 'RemarkPanel' component and passes the UUID of the comment being replied to.
            const token = localStorage.getItem('Token');
            axios.put(
                '/userdata/get/username', {},
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                .then(
                    (response) => {
                        const username = response.data.username;
                        if (username) {
                            this.RemarkPanelON = true; // Setting the state of 'RemarkPanel' component as open.
                        } else if (username == false) {
                            alert("Unauthorized!\nPlease login to comment!");
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error.detail)
                        alert("Error! \n" + error.detail);
                    }
                )

            // this.ReplyTo = ReplyTo
        },
        ReplyAComment(CommentUUID: any) { // A method that opens the 'ReplyPanel' component and passes the UUID of the comment being replied to.
            this.ReplyToUUID = CommentUUID; // Updating the 'ReplyToUUID' string with the passed UUID.
            this.ReplyPanelON = true; // Setting the state of 'ReplyPanel' component as open.

        },
        CheckIfLiked() { // A method that check if the user has already liked it.
            const token = localStorage.getItem('Token');
            axios.get("/likes/get/like_status", {
                headers: {
                    "Authorization": "Bearer " + token
                },
                params: {
                    post_uuid: this.$route.params.post_uuid
                }
            })
                .then(
                    (response) => {
                        console.log(response.data);
                        this.LikesData = response.data;
                    }
                )
                .catch(
                    (error) => {
                        console.log(error.detail);
                    }
                )
        },
        SentLikeRequest() { // A method that send Like request to the backend.
            const token = localStorage.getItem('Token');
            if (token == null || token == "") {
                alert("Please login to like it!");
            } 
            else {
                axios.post(
                    '/likes/send/like', {},
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        },
                        params: {
                            post_uuid: this.$route.params.post_uuid
                        }
                    }
                ).then(
                    (response) => {
                        console.log(response.data);
                        this.CheckIfLiked();
                        this.GetTheSingleImageByPostUUID(this.$route.params.post_uuid)
                    }
                ).catch(
                    (error) => {
                        console.log(error.detail)
                    }
                )
            }

        }
    },
    beforeMount() { // A lifecycle hook that runs before the component is mounted.
        this.GetTheSingleImageByPostUUID(this.$route.params.post_uuid); // Calling the 'GetTheSingleImageByPostUUID' method to fetch a single post by UUID.
        this.GetTheRmarksOfThePost(this.$route.params.post_uuid); // Calling the 'GetTheRmarksOfThePost' method to fetch all the remarks of a post by UUID.
        this.TimeZoneCaculator.GetTheLocalTimeZone();
        this.TimeZoneCaculator.GetTheTimeZoneOfServer();
    },
    mounted() {
        this.CheckIfLiked();

    },
    watch: { // Defining watchers to listen for changes in data properties of the component.
        'RemarkUpdate.update'(newValue, oldValue) { // Listening to any change in the 'update' property of 'RemarkUpdate'.
            this.Remarks = []; // Clearing the 'Remarks' array.
            this.GetTheRmarksOfThePost(this.$route.params.post_uuid); // Calling the 'GetTheRmarksOfThePost' method to fetch all the remarks of a post by UUID.
        }
    }
}
</script>

<template>
    <!-- Comment #1: This is a Vue template that contains a RemarkPanel component, a ReplyPanel component, and a container for displaying remarks -->
    <!-- <button @click="test">test</button> -->
    <!-- Comment #2: This button was commented out, so it won't be displayed on the page -->
    <RemarkPanel :PostUUID="(ThePost as any).post_uuid" v-model="RemarkPanelON" v-if="RemarkPanelON" />
    <!-- Comment #3: The RemarkPanel component is used to display a panel for submitting a new remark -->
    <ReplyPanel :RemarkUUID="ReplyToUUID" v-model="ReplyPanelON" v-if="ReplyPanelON" />
    <!-- Comment #4: The ReplyPanel component is used to display a panel for submitting a reply to an existing remark -->
    <div class="RemarkContainer">
        <!-- Comment #5: This div is used as a container for displaying all the remarks -->
        <div class="RemarkBox">
            <!-- Comment #6: This div contains the post information and the list of remarks -->
            <div class="ImageDisplayArea">
                <!-- Comment #7: This div contains the cover image and any additional images uploaded for the post -->
                <img @click="OpenImage((ThePost as any).files_url.original_cover_url)"
                    v-if="(ThePost as any).files_url.image_files_url.length > 1" class="DisplayedImage"
                    :src="(ThePost as any).files_url.original_cover_url" />
                <!-- Comment #8: This is the cover image for the post, which will be displayed if there is only one image in the post -->
                <div v-for="items of (ThePost as any).files_url.image_files_url">
                    <img @click="OpenImage(items)" class="DisplayedImage" :src="items" />
                </div>
                <!-- Comment #9: This loop is used to display any additional images uploaded for the post -->
            </div>
            <div class="RemarksArea">
                <!-- Comment #10: This div contains the post information and the list of remarks -->
                <div class="InfoBox">
                    <!-- Comment #11: This div contains the post information, such as the post title, author name, description, and number of likes -->
                    <h1 class="InfoTitlte">{{ (ThePost as any).post_title }}</h1>
                    <!-- Comment #12: This is the title of the post -->
                    <p class="InfoDescription">
                        Author: <b style="color: #7C4DFF;">{{ (ThePost as any).user_name }}</b>
                        <br />
                        {{ (ThePost as any).description }}
                        <br />
                        <b style="color: #7C4DFF;">{{ (ThePost as any).dots }} likes in total</b>
                    </p>
                    <!-- Comment #13: This is the description of the post, which includes the author name and number of likes -->
                    <div class="InfoBoxFoot">
                        <p class="PublishDate">{{ TimeZoneCaculator.CaculateTheCorrectDate((ThePost as any).date) }}</p>
                        <button class="LikeButton" @click="SentLikeRequest"
                            v-if="(LikesData as any) == false || (LikesData as any).liked == false">Like</button>
                        <button class="LikedButton" @click="SentLikeRequest" v-else>Liked!</button>
                        <!-- Comment #14: This button is used to like the post -->
                        <button class="CommentButton" @click="OpenRemarkPanel">Comment</button>
                        <!-- Comment #15: This button is used to open the RemarkPanel component for submitting a new remark -->
                    </div>
                </div>
                <div class="CommentDisplayArea">
                    <div class="CommentBox" v-for="items in Remarks">
                        <!-- Comment #16: This div is used to display all the remarks, which are represented by the items in the Remarks array -->
                        <img class="UserAvatar" :src="(items as any).avatar" />
                        <!-- Comment #17: This is the avatar of the user who submitted the remark -->
                        <h1 class="CommentUserName">{{ (items as any).user_name }}</h1>
                        <!-- Comment #18: This is the username of the user who submitted the remark -->
                        <p class="CommentText">{{ (items as any).content }}</p>
                        <!-- Comment #19: This is the content of the remark -->
                        <button class="ReplyButton" @click="ReplyAComment((items as any).remark_uuid)">Reply</button>
                        <!-- Comment #20: This button is used to open the ReplyPanel component for submitting a reply to an existing remark -->
                        <span class="CommentTime">{{ TimeZoneCaculator.CaculateTheCorrectDate((items as any).date) }}</span>
                        <!-- Comment #21: This is the date on which the remark was submitted -->
                    </div>
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikeButton:hover {
        background-color: #ffaab8;
        color: #FFFFFF;
        transition: background-color 0.5s ease;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikedButton {
        width: 50px;
        height: 50px;
        background-color: #ffaab8;
        color: #FFFFFF;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        border: solid 1px #ffaab8;
        outline: none;
        border-radius: 10px;
        margin-left: auto;
        cursor: pointer;
        transition: background-color 0.5s ease;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikedButton:hover {
        background-color: #FFFFFF;
        color: #ffaab8;
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
        animation: FadeIn 0.5s;
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
        background-color: #FFFFFF;
    }


    .ImageDisplayArea {
        width: 80%;
        height: auto;
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
        animation: CommentLoader 0.5s;
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

    .CommentDisplayArea {
        width: 100%;
        height: 700px;
        overflow-y: scroll;
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .ReplyButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }
}

@media only screen and (max-width: 768px) {
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikeButton:hover {
        background-color: #ffaab8;
        color: #FFFFFF;
        transition: background-color 0.5s ease;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikedButton {
        width: 50px;
        height: 50px;
        background-color: #ffaab8;
        color: #FFFFFF;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        border: solid 1px #ffaab8;
        outline: none;
        border-radius: 10px;
        margin-left: auto;
        cursor: pointer;
        transition: background-color 0.5s ease;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .LikedButton:hover {
        background-color: #FFFFFF;
        color: #ffaab8;
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .CommentButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }

    .RemarkContainer {
        width: 100%;
        height: auto;
        /* min-height: 90vh; */
        display: flex;
        justify-content: center;
        animation: FadeIn 0.5s;
    }

    .RemarkBox {
        width: 100%;
        height: auto;
        /* min-height: 90vh; */
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        margin: 5px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        transition: 1s ease-in-out;
        background-color: #FFFFFF;
    }

    .ImageDisplayArea {
        width: 100%;
        height: auto;
        /* min-height: 90vh; */
        /* background-color: #3F51B5; */
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
        position: relative;
        bottom: 0;
    }

    .DisplayedImage {
        width: 100%;
        height: auto;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
    }

    .RemarksArea {
        margin-bottom: 15px;
        width: 100%;
        height: auto;
        /* min-height: 90vh; */
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
        animation: CommentLoader 0.5s;
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

    .CommentDisplayArea {
        width: 100%;
        height: auto;
        overflow-y: scroll;
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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .ReplyButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }
}
</style>