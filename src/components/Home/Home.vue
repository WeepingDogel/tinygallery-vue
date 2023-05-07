<!-- Home -->
<!-- 
    This is a Vue.js component that displays a set of images on a page and allows the user to lazy load more images, 
    scroll back to the top of the page, and open a specific image as a "Remark" component.
 -->
<script lang="ts">
import axios from 'axios'; // Import axios for making HTTP requests
import { UpdateImages } from "@/stores/UpdateImages"; // Import the Pinia store
import { storeToRefs } from 'pinia'; // Import the `storeToRefs` function from Pinia

export default {
    data() {
        return {
            pages: 1, // The current page number
            displayData: [], // An array to store the displayed images
        }
    },
    // Setup hook for Pinia store
    setup() {
        const PostsUpdate = UpdateImages(); // Get the UpdateImages Pinia store
        const PostUpdateStatus = storeToRefs(PostsUpdate); // Convert the store to refs

        return {
            PostsUpdate, PostUpdateStatus // Return the store and its refs
        }
    },
    methods: {
        BackToTop() { // Scroll to the top of the page
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        displayIamges() { // Display images on the page
            this.pages = 1; // Reset the current page number to 1
            axios.get('/resources/posts/' + this.pages).then((response) => { // Make a GET request to the server API
                const TextOfDisplayData = response.request.response; // Get the response text
                const DisplayDataToJSON = JSON.parse(TextOfDisplayData); // Parse the response text to JSON format
                console.log(DisplayDataToJSON); // Log the response data
                this.displayData = DisplayDataToJSON; // Set the display data to the response data
            })
        },
        lazyLoading() { // Lazy load more images when the user scrolls to the bottom of the page
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // Get the current scroll location
            let clientHeight = document.documentElement.clientHeight; // Get the client height of the window
            let scrollHeight = document.documentElement.scrollHeight; // Get the total scroll height of the page
            if (scrollTop + clientHeight >= scrollHeight) { // If the user has scrolled to the bottom of the page
                console.log("到底了"); // Log a message for testing purposes
                this.fetchData(); // Load more images
            }
        },
        async fetchData() { // Fetch more image data from the server
            this.pages = this.pages + 1; // Increment the current page number
            const response = await axios.get('/resources/posts/' + this.pages); // Make a GET request to the server API
            const newData = JSON.parse(response.request.response); // Parse the response text to JSON format
            if (newData[0] == null) { // If there is no new data
                this.pages = this.pages - 1; // Decrement the current page number
            } else { // Otherwise
                for (let i = 0; i < newData.length; i++) { // Loop over the new data and add it to the display data array
                    this.displayData.push(newData[i])
                }
            }
        },
        OpenRemarkBySingleUUID(post_uuid: any) { // Open a specific post by UUID in the "Remark" component
            this.$router.push("/remark/" + post_uuid) // Navigate to the "Remark" component with the specified UUID
        }
    },
    created() { // Called when the component is created
        window.addEventListener('scroll', this.lazyLoading); // Add a listener for scrolling events to trigger lazy loading
    },
    mounted() { // Called after the component is mounted and ready to use
        this.displayIamges(); // Display the initial set of images
    },
    unmounted() { // Called before the component is unmounted
        window.removeEventListener('scroll', this.lazyLoading); // Remove the scroll listener to prevent memory leaks
    },
    watch: { // Watch the Pinia store for updates and re-fetch data as necessary
        'PostsUpdate.update'(newValue, oldValue) {
            this.displayData = [] // Clear the display data array
            this.displayIamges() // Refetch the image data from the server
        }
    }
}
</script>

<template>
    <div class="Container">
        <!-- Loop over displayData and render each image as a "Card" on the page -->
        <div class="Card" v-for="items of displayData">
            <img @click="OpenRemarkBySingleUUID(items.post_uuid)" class="displayImage" :src="items.cover_url"
                :alt="items.post_uuid" />
            <h2 class="ImageTitle">{{ items.post_title }}</h2>
            <p class="ImageDescription">{{ items.description }}</p>
            <div class="UserInfoBar">
                <img class="UserAvatar" :src="items.avatar" />
                <p class="ImageUserName">{{ items.user_name }}</p>
                <p class="ImageDate">{{ items.date }}</p>
            </div>
        </div>
    </div>
    <!-- Button to scroll back to the top of the page -->
    <div class="BackToTop">
        <button @click="BackToTop" class="TopButton">Top</button>
    </div>
</template>

<style scoped>
/* CSS styling for the component */

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

@keyframes FlashIn {
    from {
        scale: 0.5;
        transform: translateY(90%);
    }

    to {
        scale: 1;
        transform: translateY(0%);
    }
}


.Container {
    width: 100%;
    /* height: 100vh; */
    /* height: 200vh; */
    /* Test ScrollTop */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    animation: FadeIn 0.5s;
}

.Card {
    width: 450px;
    height: 500px;
    border-radius: 10px;
    margin: 10px auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: 0.5s ease-in-out;
    animation: FlashIn 0.5s;
}

.Card:hover {
    scale: 0.9;
}

.ImageTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 25px;
    text-indent: 0.5em;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px #212121;
    position: relative;
    top: -40px;
    text-overflow: ellipsis;
    overflow: hidden;
}

.displayImage {
    width: 100%;
    height: 300px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    text-overflow: ellipsis;
    cursor: pointer;
}

.ImageDescription {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    color: #757575;
    position: relative;
    top: -15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 15px;
}

.BackToTop {
    position: fixed;
    float: right;
    right: 2%;
    top: 80%;
}

.TopButton {
    padding: 2px;
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #7C4DFF;
    color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.TopButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}


.ImageUserName {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #212121;
    padding: 10px;
    line-height: 40px;
}


.ImageDate {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #757575;
    padding: 10px;
    line-height: 40px;
    margin-left: auto;
}

.UserAvatar {
    width: 40px;
    height: 40px;
    border: solid 1px #BDBDBD;
    border-radius: 100%;
    margin: 5px;
}

.UserInfoBar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    bottom: -60px;
}
</style>