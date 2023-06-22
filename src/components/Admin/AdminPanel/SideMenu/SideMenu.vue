<script lang="ts">

export default {

}
</script>

<template>
    <div class="sideMenu">
        <h3 class="MenuTitle">Management</h3>
        <div class="AvatarCircle">
        </div>
        <p class="MenuPara">
            Hi, respective <span class="userNameText">[Admin Username]</span>!
        </p>
        <button class="MenuItemButton">Overview</button>
        <button class="MenuItemButton">Data Managment</button>
        <button class="MenuItemButton">Exit</button>
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

.AvatarCircle {
    width: 200px;
    height: 200px;
    background-color: #7C4DFF;
    border-radius: 100%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    animation: FadeIn 1s;
}
.MenuPara {
    margin-top: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    animation: FadeIn 1s;
}

.userNameText {
    color: #7C4DFF;
}

.sideMenu {
    width: 400px;
    height: 100%;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    animation: FadeIn 1s;
}

.MenuTitle {
    color: #212121;
    line-height: 50px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border-bottom: #BDBDBD solid 1px;
    animation: FadeIn 500ms;
}


.MenuItemButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    line-height: 50px;
    color: #212121;
    margin-top: 10px;
    outline: none;
    border: none;
    background-color: #f7f7f7;
    cursor: pointer;
    transition: ease-in-out 500ms;
    animation: FadeIn 1s;
}

.MenuItemButton:hover {
    background-color: #dad8d8;
    transition: ease-in-out 500ms;
}

.MenuItemButtonSelected { 
    background-color: #dad8d8;
    transition: ease-in-out 500ms;
}
</style>