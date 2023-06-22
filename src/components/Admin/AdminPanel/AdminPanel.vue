<script lang="ts">
import SideMenu from './SideMenu/SideMenu.vue';
import Overview from './Overview/Overview.vue';
import DataManagement from './DataManagement/DataManagement.vue';

export default {
    components: {
        SideMenu,
        Overview,
        DataManagement
    }
}

</script>

<template>
    <div class="AdminPanel">
        <SideMenu />
        <div class="ManagementDisplay">
            <Overview />
            <DataManagement />
        </div>
    </div>
</template>

<style scoped>
.AdminPanel {
    width: 100%;
    height: 90vh;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
}

.ManagementDisplay {
    width: 100%;
    height: 100%;
    display: flex;
}

</style>