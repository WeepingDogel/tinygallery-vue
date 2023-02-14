<script lang="ts">
import { RouterLink } from 'vue-router'
export default {
    
}
</script>

<template>
    <div id="bar">
        <h1 id="MainTitle">TinyGallery Vue Beta</h1>
        <div id="linkContainer">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
    </div>
</template>

<style>
#bar {
    width: 100%;
    height: 70px;
    background-color: #3F51B5;
    border-bottom: solid 1px #BDBDBD;
    display: flex;
    justify-content: space-between;
}

#MainTitle {
    line-height: 70px;
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 26px;
    text-indent: 0.5em;
}

#linkContainer {
    width: auto;
    height: 70px;
    display: flex;
    justify-content: space-around;
}

#linkContainer a {
    text-decoration: none;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    line-height: 70px;
    width: 100px;
    color: #C5CAE9;
    transition: 1000ms;
}

#linkContainer a:hover {
    transition: 1000ms;
    color: #FFFFFF;
}

#linkContainer .router-link-active,
.router-link-exact-active {
    transition: 1000ms;
    color: #FFFFFF;
}
</style>