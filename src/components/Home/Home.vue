<script lang="ts">
export default {
    methods: {
        BackToTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<template>
    <div class="Container">
        <div class="Card">
            <img class="displayImage"
                src="https://avatars.githubusercontent.com/u/44858874?s=400&u=1749c0f158a1b0feedeeeb7c2a82f42099a3e1dc&v=4"
                alt="" />
            <h2 class="ImageTitle">Title Test</h2>
            <p class="ImageDescription">Description</p>
        </div>
    </div>
    <div class="BackToTop">
        <button @click="BackToTop" class="TopButton">Top</button>
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


.Container {
    width: 100%;
    /* height: 200vh; */
    /* Test ScrollTop */
    display: flex;
    justify-content: space-around;
    animation: FadeIn 1s;
    flex-wrap: wrap;
}

.Card {
    width: 450px;
    height: 500px;
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: 0.5s ease-in-out;
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
    cursor: pointer;
}

.displayImage {
    width: 100%;
    height: 300px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    text-overflow: ellipsis;
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
    white-space: pre-line;
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
}

.TopButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>