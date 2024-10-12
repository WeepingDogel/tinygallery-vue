<script lang="ts">
import axios from "axios";
import PostsEditor from "./PostsEditor.vue";

interface Post {
  id: number;
  post_uuid: string;
  user_name: string;
  post_title: string;
  description: string;
  nsfw: boolean;
  dots: number;
  share_num: number;
  date: string;
  image_link: string;
}

export default {
  components: {
    PostsEditor,
  },
  data() {
    return {
      PostsDataList: [] as Post[],
      PostEditorSwitch: false,
      QueriedPostUUID: "",
    };
  },
  methods: {
    fetchPostsData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<Post[]>("/admin/posts", {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.PostsDataList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts data:", error);
        });
    },
    openPostEditor(post_uuid: string) {
      this.QueriedPostUUID = post_uuid;
      this.PostEditorSwitch = true;
    },
    deletePost(post_uuid: string) {
      // Add confirmation dialog
      if (confirm("Are you sure you want to delete this post?")) {
        const Token = localStorage.getItem("Token");
        axios
          .delete(`/admin/posts/${post_uuid}`, {
            headers: {
              Authorization: "Bearer " + Token,
            },
          })
          .then(() => {
            this.fetchPostsData();
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      }
    },
  },
  mounted() {
    this.fetchPostsData();
  },
};
</script>

<template>
  <div class="DataManagement">
    <div class="PostsManage">
      <h1 class="ManagementTitle">帖子管理</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>描述</th>
            <th>作者</th>
            <th>成人内容</th>
            <th>点赞</th>
            <th>分享</th>
            <th>日期</th>
            <th>图片</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in PostsDataList" :key="item.post_uuid">
            <td>{{ item.id }}</td>
            <td>{{ item.post_title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.nsfw ? '是' : '否' }}</td>
            <td>{{ item.dots }}</td>
            <td>{{ item.share_num }}</td>
            <td>{{ item.date }}</td>
            <td><img :src="item.image_link" alt="帖子图片" style="width: 50px; height: 50px; object-fit: cover;" /></td>
            <td>
              <button class="editButton" @click="openPostEditor(item.post_uuid)">编辑</button>
              <button class="deleteButton" @click="deletePost(item.post_uuid)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PostsEditor
    v-if="PostEditorSwitch"
    v-model="PostEditorSwitch"
    :post_uuid="QueriedPostUUID"
    @post-updated="fetchPostsData"
  />
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
  background-color: #7c4dff;
  color: #ffffff;
  padding: 5px;
  letter-spacing: 2px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.editButton:hover {
  background-color: #303f9f;
  color: #c5cae9;
  transition: background-color 0.5s ease;
}

.deleteButton {
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  border: none;
  background-color: #ff0000;
  color: #ffffff;
  padding: 5px;
  letter-spacing: 2px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.deleteButton:hover {
  background-color: #ff3333;
  color: #ffffff;
  transition: background-color 0.5s ease;
}
</style>