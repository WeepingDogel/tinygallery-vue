<script lang="ts">
import axios from "axios";
import UserEditor from "./UserEditor.vue";

interface User {
  id: number;
  user_name: string;
  email: string;
  date: string;
  users_uuid: string;
}

export default {
  components: {
    UserEditor,
  },
  data() {
    return {
      UserDataList: [] as User[],
      UserEditorSwitch: false,
      QueriedUserUUID: "",
    };
  },
  methods: {
    fetchUserData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<User[]>("/admin/users", {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.UserDataList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    SwiftUpUserEditor(user_uuid: string) {
      this.QueriedUserUUID = user_uuid;
      this.UserEditorSwitch = true;
    },
    deleteUser(user_uuid: string) {
      // Add confirmation dialog
      if (confirm("Are you sure you want to delete this user?")) {
        const Token = localStorage.getItem("Token");
        axios
          .delete(`/admin/users/${user_uuid}`, {
            headers: {
              Authorization: "Bearer " + Token,
            },
          })
          .then(() => {
            this.fetchUserData();
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<template>
  <div class="DataManagement">
    <div class="UsersManage">
      <h1 class="ManagementTitle">用户管理</h1>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in UserDataList" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.date }}</td>
            <td>
              <button class="editButton" @click="SwiftUpUserEditor(item.users_uuid)">
                编辑
              </button>
              <button class="deleteButton" @click="deleteUser(item.users_uuid)">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserEditor
    v-if="UserEditorSwitch"
    v-model="UserEditorSwitch"
    :user_uuid="QueriedUserUUID"
    @user-updated="fetchUserData"
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
  z-index: 1;
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
