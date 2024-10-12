<script lang="ts">
import axios from "axios";

interface User {
  id: number;
  users_uuid: string;
  user_name: string;
  email: string;
  date: string;
  avatar: string;
}

interface UpdateData {
  user_name: string;
  email: string;
  password?: string;
}

export default {
  props: {
    user_uuid: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'user-updated'],
  data() {
    return {
      user: {} as User,
      newPassword: "",
      avatarFile: null as File | null,
      avatarPreview: null as string | null,
      errorMessage: "",
    };
  },
  methods: {
    fetchUserData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<User>(`/admin/users/${this.user_uuid}`, {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMessage = "Failed to fetch user data";
        });
    },
    updateUser() {
      const Token = localStorage.getItem("Token");
      const updateData: UpdateData = {
        user_name: this.user.user_name,
        email: this.user.email,
      };
      if (this.newPassword) {
        updateData.password = this.newPassword;
      }
      axios
        .put(`/admin/users/${this.user_uuid}`, updateData, {
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$emit("user-updated");
          if (this.avatarFile) {
            this.updateAvatar();
          } else {
            this.closeEditor();
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          this.errorMessage = "Failed to update user: " + (error.response?.data?.detail || error.message);
        });
    },
    updateAvatar() {
      if (!this.avatarFile) return;

      const Token = localStorage.getItem("Token");
      const formData = new FormData();
      formData.append("avatar", this.avatarFile);

      axios
        .put(`/admin/users/${this.user_uuid}/avatar`, formData, {
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$emit("user-updated");
          this.closeEditor();
        })
        .catch((error) => {
          console.error("Error updating avatar:", error);
          this.errorMessage = "Failed to update avatar: " + (error.response?.data?.detail || error.message);
        });
    },
    handleAvatarChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.avatarFile = target.files[0];
        this.previewAvatar();
      }
    },
    previewAvatar() {
      if (this.avatarFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target?.result as string;
        };
        reader.readAsDataURL(this.avatarFile);
      }
    },
    closeEditor() {
      this.$emit('update:modelValue', false);
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<template>
  <div class="mask" v-if="modelValue">
    <div class="EditBox">
      <div class="MidControl">
        <img :src="avatarPreview || user.avatar" class="USER-AVATAR" />
        <p class="UUID">{{ user.users_uuid }}</p>
        <input
          type="text"
          class="USERNAME"
          placeholder="用户名"
          v-model="user.user_name"
        />
        <input
          type="password"
          class="PASSWORD"
          placeholder="新密码"
          v-model="newPassword"
        />
        <input
          type="email"
          class="EMAIL"
          placeholder="电子邮件"
          v-model="user.email"
        />
        <input
          type="text"
          class="DATE"
          placeholder="日期"
          v-model="user.date"
          disabled
        />
        <input
          type="file"
          class="AVATAR-INPUT"
          accept="image/*"
          @change="handleAvatarChange"
        />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="FootControl">
        <button class="Submit" @click="updateUser">提交</button>
        <button class="Cancel" @click="closeEditor">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  animation: FadeIn 0.5s;
}

.EditBox {
  width: 400px;
  background-color: white;
  display: flex;
  animation: WipeFromRight 1s;
  flex-direction: column;
  border-radius: 8px;
  padding: 20px;
}

.MidControl {
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

.USER-AVATAR {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto 15px;
}

.UUID, .USERNAME, .PASSWORD, .EMAIL, .DATE, .AVATAR-INPUT {
  width: 100%;
  margin-bottom: 12px;
}

.UUID {
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.USERNAME, .PASSWORD, .EMAIL, .DATE {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.DATE {
  background-color: #f0f0f0;
}

.AVATAR-INPUT {
  margin-top: 8px;
}

.FootControl {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.Submit, .Cancel {
  padding: 8px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.Submit {
  background-color: #7c4dff;
  color: white;
}

.Cancel {
  background-color: #f0f0f0;
  color: #333;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 8px;
}

@keyframes FadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes WipeFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
}
</style>