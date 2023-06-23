<script lang="ts">
import axios from 'axios';


export default {
    data() {
        return {
            user_num: String,
            posts_num: String,
            comments_num: String
        }
    },
    methods: {
        GetTheData() {
            axios.get('/userdata/get/user_num')
                .then(
                    (response) => {
                        this.user_num = response.data.toLocaleString();
                    }
                );
            axios.get('/userdata/get/posts_num')
                .then(
                    (response) => {
                        this.posts_num = response.data.toLocaleString();
                    }
                )
            axios.get('/userdata/get/comments_num')
                .then(
                    (response) => {
                        this.comments_num = response.data.toLocaleString();
                    }
                )
            console.log(this.user_num);
            console.log(this.posts_num);
            console.log(this.comments_num);
        }
    },
    mounted() {
        this.GetTheData();
    }
}
</script>

<template>
    <div class="OverviewPanel">
        <h1 class="OverviewTitle">Current Data Count</h1>
        <p class="OverviewPara">User count: {{ user_num }}</p>
        <p class="OverviewPara">Posts count: {{ posts_num }}</p>
        <p class="OverviewPara">Comments count: {{ comments_num }}</p>
        <h1 class="OverviewTitle">Tendency Of Users</h1>
        <h1 class="OverviewTitle">Tendency Of Posts</h1>
        <h1 class="OverviewTitle">Tendency Of Comments</h1>
    </div>
</template>

<style scoped>

@keyframes FadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.OverviewPanel {
    width: 90%;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    animation: FadeIn 1s;
}

.OverviewTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 25px;
    line-height: 60px;
    animation: FadeIn 1s;
}

.OverviewPara {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    text-align: justify;
    line-height: 10px;
    animation: FadeIn 1s;
}
</style>