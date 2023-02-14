<script lang="ts">
export default{

}
</script>

<template>
    <div class="RemarkContainer">
        <div class="RemarkBox">
            <div class="ImageDisplayArea">
                <img src="" />
            </div>
            <div class="RemarksArea">

            </div>
        </div>
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

.RemarkContainer{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    animation: FadeIn 0.5s;
}

.RemarkBox{
    width: 100%;
    height: 90vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    margin: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    transition: 0.5s ease-in-out;
}

.ImageDisplayArea{
    width: 80%;
    height: 90vh;
    background-color: #3F51B5;
    border-top-left-radius: 5px;
}

.RemarksArea{
    width: 20%;
    height: 90vh;
    background-color: #C5CAE9;
    border-top-right-radius: 5px;
}

</style>