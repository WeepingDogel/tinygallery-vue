<!-- @/components/Upload/Uploader.vue -->
<script lang="ts">
import { Authentication } from '@/stores/Authentication';

export default {
    
}
</script>

<template>
    <div class="Mask">
        <div class="UploaderPanel">

        </div>
    </div>
</template>

<style>

.Mask {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.UploaderPanel {
    width: 400px;
    height: 500px;
    background-color: #FFFFFF;
}
</style>