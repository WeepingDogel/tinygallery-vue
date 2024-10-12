<template>
  <div class="EditPostContainer">
    <div class="EditPostCard">
      <h2>编辑帖子</h2>
      <form @submit.prevent="updatePost">
        <div>
          <label for="postTitle">标题：</label>
          <input type="text" v-model="postTitle" required />
        </div>
        <div>
          <label for="description">描述：</label>
          <textarea v-model="description" required></textarea>
        </div>
        <div>
          <label for="isNsfw">NSFW：</label>
          <select v-model="isNsfw">
            <option value="false">否</option>
            <option value="true">是</option>
          </select>
        </div>
        <div>
          <label for="cover">封面图片：</label>
          <input type="file" @change="handleFileUpload" />
        </div>
        <div>
          <label for="uploadedFiles">附加文件：</label>
          <input type="file" multiple @change="handleAdditionalFilesUpload" />
        </div>
        <div class="ButtonContainer">
          <button type="submit" class="PrimaryButton">更新帖子</button>
          <button type="button" class="SecondaryButton" @click="$emit('close')">取消</button> <!-- 关闭按钮 -->
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

interface Post {
  post_uuid: string;
  post_title: string;
  description: string;
  // Add other properties as needed
}

export default {
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  data() {
    return {
      postTitle: this.post.post_title,
      description: this.post.description,
      isNsfw: "false",
      cover: null as File | null,
      uploadedFiles: [] as File[],
    };
  },
  methods: {
    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.cover = target.files[0];
      }
    },
    handleAdditionalFilesUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.uploadedFiles = Array.from(target.files);
      }
    },
    async updatePost() {
      const token = localStorage.getItem("Token");
      const formData = new FormData();
      formData.append("post_title", this.postTitle);
      formData.append("description", this.description);
      formData.append("is_nsfw", this.isNsfw);
      if (this.cover) {
        formData.append("cover", this.cover);
      }
      formData.append("supplementary_mode", "false");

      this.uploadedFiles.forEach(file => {
        formData.append("uploaded_file", file);
      });

      try {
        await axios.put(`/posts/update/${this.post.post_uuid}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Post updated successfully!");
        this.$emit('close');
      } catch (error) {
        console.error("Error updating post:", error);
        alert("Failed to update post. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.EditPostContainer {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.EditPostCard {
  width: 70%; /* Match the width of ProfileCard */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px;
}

.EditPostCard h2 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 24px;
  color: #212121;
  margin-bottom: 20px;
}

.EditPostCard label {
  margin: 10px 0 5px;
}

.EditPostCard input,
.EditPostCard textarea,
.EditPostCard select {
  padding: 10px;
  margin-bottom: 10px;
  width: 100%; /* Full width for inputs */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.ButtonContainer {
  display: flex;
  justify-content: space-between; /* Space between buttons */
}

.EditPostCard button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1; /* Allow buttons to grow */
  margin-right: 10px; /* Space between buttons */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.EditPostCard button:last-child {
  margin-right: 0; /* Remove margin for the last button */
}

.PrimaryButton {
  background-color: #7c4dff;
  color: white;
}

.PrimaryButton:hover {
  background-color: #303f9f;
}

.SecondaryButton {
  background-color: #f44336; /* Red color for cancel button */
  color: white;
}

.SecondaryButton:hover {
  background-color: #c62828; /* Darker red on hover */
}
</style>