<script lang="ts">
import SideMenu from './SideMenu/SideMenu.vue';
import Overview from './Overview/Overview.vue';
import UserManagement from './DataManagement/UserManagement.vue';
import PostsManagement from './DataManagement/PostsManagement.vue';
import CommentsAndRepliesManagement from './DataManagement/CommentsAndRepliesManagement.vue';

export default {
    components: {
    SideMenu,
    Overview,
    UserManagement,
    PostsManagement,
    CommentsAndRepliesManagement
},
    data(){
        return {
            PanelOpen: 0,
        }
    },
    methods: {
        UpdatePanelOpen(OpenNum: number){
            this.PanelOpen = OpenNum;
        }
    }
}

</script>

<template>
    <div class="AdminPanel">
        <SideMenu :child-open-num="PanelOpen" @update-open-num="UpdatePanelOpen"/>
        <div class="ManagementDisplay">
            <Overview v-if="PanelOpen == 0"/>
            <UserManagement v-if="PanelOpen == 1" />
            <PostsManagement v-if="PanelOpen == 2" />
            <CommentsAndRepliesManagement v-if="PanelOpen == 3"/>
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
    flex-direction: column;
}

</style>