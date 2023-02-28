<script lang="ts">
export default {
    props: {
        modelValue: Boolean
    },
    emits:['update:modelValue'],
    data(){
        return {

        }
    },
    methods: {
        CloseAndSaveSettings(){
            // This function will close the Settings Panel and save the profile.
            this.$emit('update:modelValue', false);
        },
        DiscardSettings(){
            // This function will not save any information when user clicked and close the Settings Panel.
            this.$emit('update:modelValue', false);
        }
    }
}

</script>


<template>
<div v-if="modelValue" class="ProfileSettings">
    <button @click="CloseAndSaveSettings" class="ProfileFinishButton"> Apply </button>
    <button @click="DiscardSettings" class="ProfileFinishButton">Discard</button>
</div>
</template>

<style>

@keyframes SlideIn{
    from {
        transform: translateY(-80%);
    }
    to {
        transform: translateY(0%);
    }
}

.ProfileSettings{
    width: 80%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background-color: #FFFFFF;
    animation: FadeIn 0.5s;
    animation: SlideIn 1s;
    margin: 5px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}

.ProfileFinishButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7C4DFF;
    padding: 13px;
    color: #FFFFFF;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ProfileFinishButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>