<script lang="ts">
import axios from "axios";
import CommentsEditor from "./CommentsEditor.vue";

interface Comment {
  id: number;
  remark_uuid: string;
  post_uuid: string;
  user_name: string;
  content: string;
  date: string;
}

export default {
  components: {
    CommentsEditor,
  },
  data() {
    return {
      CommentsDataList: [] as Comment[],
      CommentEditorSwitch: false,
      QueriedCommentUUID: "",
    };
  },
  methods: {
    fetchCommentsData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<Comment[]>("/admin/comments", {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.CommentsDataList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comments data:", error);
        });
    },
    openCommentEditor(comment_uuid: string) {
      this.QueriedCommentUUID = comment_uuid;
      this.CommentEditorSwitch = true;
    },
    deleteComment(comment_uuid: string) {
      // Add confirmation dialog
      if (confirm("Are you sure you want to delete this comment?")) {
        const Token = localStorage.getItem("Token");
        axios
          .delete(`/admin/comments/${comment_uuid}`, {
            headers: {
              Authorization: "Bearer " + Token,
            },
          })
          .then(() => {
            this.fetchCommentsData();
          })
          .catch((error) => {
            console.error("Error deleting comment:", error);
          });
      }
    },
  },
  mounted() {
    this.fetchCommentsData();
  },
};
</script>

<template>
  <div class="DataManagement">
    <div class="CommentsManage">
      <h1 class="ManagementTitle">评论和回复管理</h1>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>用户</th>
            <th>内容</th>
            <th>帖子 UUID</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in CommentsDataList" :key="item.remark_uuid">
            <td>{{ item.id }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.post_uuid }}</td>
            <td>{{ item.date }}</td>
            <td>
              <button class="editButton" @click="openCommentEditor(item.remark_uuid)">编辑</button>
              <button class="deleteButton" @click="deleteComment(item.remark_uuid)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CommentsEditor
    v-if="CommentEditorSwitch"
    v-model="CommentEditorSwitch"
    :comment_uuid="QueriedCommentUUID"
    @comment-updated="fetchCommentsData"
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