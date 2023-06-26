<script lang="ts">
import axios from 'axios';


export default {
    data() {
        return {
            CommentsDataList: [],
            RepliesDataList: []
        }
    },
    methods: {
        fetchCommentsData() {
            const Token = localStorage.getItem('Token');
            axios.get('/admin/get_all_comments', {
                headers: {
                    "Authorization": "Bearer " + Token
                }
            })
                .then(
                    (response) => {
                        this.CommentsDataList = response.data;
                    }
                )
        },
        fetchRepliesData() {
            const Token = localStorage.getItem('Token');
            axios.get('/admin/get_all_replies', {
                headers: {
                    "Authorization": "Bearer " + Token
                }
            })
                .then(
                    (response) => {
                        this.RepliesDataList = response.data;
                    }
                )
        }
    },
    mounted() {
        this.fetchCommentsData();
        this.fetchRepliesData();
    },
}
</script>

<template>
    <div class="DataManagement">
        <div class="CommentsManage">
            <h1 class="ManagementTitle">Comments</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UUID</th>
                        <th>User</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in CommentsDataList" :key="index">
                        <td>{{ (item as any).id }}</td>
                        <td>{{ (item as any).remark_uuid }}</td>
                        <td>{{ (item as any).user_name }}</td>
                        <td>{{ (item as any).content }}</td>
                        <td>{{ (item as any).date }}</td>
                        <td>
                            <button class="editButton" @click="">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="RepliesManage">
            <h1 class="ManagementTitle">Replies</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UUID</th>
                        <th>User</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in RepliesDataList" :key="index">
                        <td>{{ (item as any).id }}</td>
                        <td>{{ (item as any).reply_uuid }}</td>
                        <td>{{ (item as any).user_name }}</td>
                        <td>{{ (item as any).content }}</td>
                        <td>{{ (item as any).date }}</td>
                        <td>
                            <button class="editButton" @click="">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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

.DataManagement {
    width: 90%;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    animation: FadeIn 1s;
    overflow-y: scroll;
    scrollbar-width: none;
}

.ManagementTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 25px;
    animation: FadeIn 1s;
    line-height: 80px;
}

table {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    border-collapse: collapse;
    width: 100%;
    /* max-width: 800px; */
    margin: 0 auto;
    border: 1px solid #ddd;
}

th,
td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.editButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7C4DFF;
    color: #FFFFFF;
    padding: 5px;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.editButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>