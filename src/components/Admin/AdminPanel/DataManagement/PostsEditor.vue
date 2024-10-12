<script lang="ts">
import axios from "axios";

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
  props: {
    post_uuid: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'post-updated'],
  data() {
    return {
      post: {} as Post,
      errorMessage: "",
    };
  },
  methods: {
    fetchPostData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<Post>(`/admin/posts/${this.post_uuid}`, {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.post = response.data;
        })
        .catch((error) => {
          console.error("Error fetching post data:", error);
          this.errorMessage = "Failed to fetch post data";
        });
    },
    updatePost() {
      const Token = localStorage.getItem("Token");
      const updateData = {
        post_title: this.post.post_title,
        description: this.post.description,
        nsfw: this.post.nsfw,
      };
      axios
        .put(`/admin/posts/${this.post_uuid}`, updateData, {
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$emit("post-updated");
          this.closeEditor();
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          this.errorMessage = "Failed to update post: " + (error.response?.data?.detail || error.message);
        });
    },
    closeEditor() {
      this.$emit('update:modelValue', false);
    },
  },
  mounted() {
    this.fetchPostData();
  },
};
</script>

<template>
  <div class="mask" v-if="modelValue">
    <div class="EditBox">
      <div class="MidControl">
        <img :src="post.image_link" class="POST-IMAGE" />
        <p class="UUID">{{ post.post_uuid }}</p>
        <input
          type="text"
          class="POSTTITLE"
          placeholder="帖子标题"
          v-model="post.post_title"
        />
        <textarea
          class="DESCRIPTION"
          placeholder="描述"
          v-model="post.description"
        ></textarea>
        <div class="NSFW-TOGGLE">
          <label>
            <input type="checkbox" v-model="post.nsfw" />
            NSFW
          </label>
        </div>
        <p class="AUTHOR">作者: {{ post.user_name }}</p>
        <p class="LIKES">点赞: {{ post.dots }}</p>
        <p class="SHARES">分享: {{ post.share_num }}</p>
        <p class="DATE">日期: {{ post.date }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="FootControl">
        <button class="Submit" @click="updatePost">提交</button>
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

.POST-IMAGE {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 0 auto 15px;
}

.UUID, .POSTTITLE, .DESCRIPTION, .NSFW-TOGGLE, .AUTHOR, .LIKES, .SHARES, .DATE {
  width: 100%;
  margin-bottom: 12px;
}

.UUID {
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.POSTTITLE, .DESCRIPTION {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.DESCRIPTION {
  height: 100px;
  resize: vertical;
}

.NSFW-TOGGLE {
  display: flex;
  align-items: center;
}

.NSFW-TOGGLE input {
  margin-right: 5px;
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