<script lang="ts">
import axios from 'axios';
import { UpdateImages } from "@/stores/UpdateImages"
import { storeToRefs } from 'pinia';

export default {
    data() {
        return {
            pages: 1,
            displayData: [],
        }
    },
    setup() {
        const PostsUpdate = UpdateImages();
        const PostUpdateStatus = storeToRefs(PostsUpdate);

        return {
            PostsUpdate, PostUpdateStatus
        }
    },
    methods: {
        BackToTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        displayIamges() {
            this.pages = 1
            axios.get('/resources/posts/' + this.pages, {
            }).then((response) => {
                const TextOfDisplayData = response.request.response;
                const DisplayDataToJSON = JSON.parse(TextOfDisplayData);
                console.log(DisplayDataToJSON);
                this.displayData = DisplayDataToJSON;
            })
        },
        lazyLoading() {
            // Lazy loading
            // Get the scroll loacation
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // Get the client height 
            let clientHeight = document.documentElement.clientHeight;
            // Get the whole scroll height
            let scrollHeight = document.documentElement.scrollHeight;
            // If scroll top and client height is more than scroll height, then update more post datas.
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log("到底了");
                this.fetchData();
            }
        },
        async fetchData() {
            // Fetch new data.
            // Add the page.
            this.pages = this.pages + 1;
            // Sent the get request to the server.
            const response = await axios.get('/resources/posts/' + this.pages);
            // Deal with the data.
            const newData = JSON.parse(response.request.response);
            if (newData[0] == null) { // If the first file is null,
                this.pages = this.pages - 1; // then decrease the page.
            } else { // if it's not null
                for (let i = 0; i < newData.length; i++) { // then add new posts to the display Data.
                    this.displayData.push(newData[i])
                }
            }
            // console.log(this.displayData);
        },
        OpenRemarkBySingleUUID(post_uuid: any) {

            this.$router.push("/remark/" + post_uuid)
        }
        // test() {
        //     console.log(this.pages)
        // }
    },
    created() {
        // Createred the event listener to obersve the scroling event to load more datas.
        window.addEventListener('scroll', this.lazyLoading);
    },
    mounted() {
        // When the componets mounted, update the datas.
        this.displayIamges();
    },
    unmounted() {
        // Remove the event listener.
        window.removeEventListener('scroll', this.lazyLoading);
    },
    watch: {
        // Watch the original varaible to check if new posts appeared.
        'PostsUpdate.update'(newValue, oldValue) {
            this.displayData = []
            this.displayIamges()
        }
    }
}
</script>

<template>
    <div class="Container">
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
    <div class="BackToTop">
        <button @click="BackToTop" class="TopButton">Top</button>
    </div>
    <!-- <button @click="test">test</button> -->
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
    animation: FadeIn 1s;
}

.Card {
    width: 450px;
    height: 500px;
    border-radius: 10px;
    margin: 10px auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: 0.5s ease-in-out;
    animation: FlashIn 1s;
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