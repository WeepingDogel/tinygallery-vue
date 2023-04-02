<script lang="ts">
export default {

}
</script>

<template>
    <div class="Mask">
        <div class="ReplyPanel">
            <div class="TopControl">
                <button class="CloseButton">X</button>
                <div class="OriginalRemarkDisplay">
                    <img />
                    <h2>UserName</h2>
                    <p>Remark Content</p>
                </div>
            </div>
            <div class="MidControl">
                <!-- Replies display -->
            </div>
            <div class="FootControl">
                <div class="ReplySender">
                    <input placeholder="ReplyTo" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Mask{
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.ReplyPanel{
    width: 800px;
    height: 600px;
    background-color: #FFFFFF;
    border-radius: 10px;
}

.TopControl{

}

.MidControl {

}

.FootControl {

}



</style>