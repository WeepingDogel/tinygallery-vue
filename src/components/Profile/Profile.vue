
<script lang="ts">

</script>

<template>
    <div class="ProfileContainer">
        <div class="ProfileCard">
            <div class="UserCover">
                <img src="" />
            </div>
            <div class="ProfileAvatar">
                <img />
            </div>
            <div class="ProfileUserNameContainerBox">
                <h2 class="ProfileUserName">UserName</h2>
            </div>
            <button class="ProfileBackGroundEditButton">Edit background</button>
        </div>
        <div class="ProfileArtWorks">

        </div>
    </div>
</template>

<style>
.ProfileContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    animation: FadeIn 0.5s;
}

.ProfileCard {
    width: 80%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 10px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}

.UserCover {
    width: 100%;
    height: 300px;
    background-color: #3F51B5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.ProfileAvatar {
    width: 200px;
    height: 200px;
    border: solid 1px #BDBDBD;
    border-radius: 10px;
    position: relative;
    margin: 0 50px;
    top: -10%;
    background-color: #FFFFFF;
}

.ProfileUserName {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 30px;
    color: #212121;
}

.ProfileUserNameContainerBox {
    position: relative;
    left: 280px;
    top: -160px;
}

.ProfileBackGroundEditButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7C4DFF;
    padding: 13px;
    color: #FFFFFF;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    top: -200px;
    right: 20px;
    float: right;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ProfileBackGroundEditButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.ProfileArtWorks {
    width: 80%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 0px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}
</style>