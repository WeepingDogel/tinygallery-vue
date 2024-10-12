<script lang="ts">
import axios from "axios";

interface Comment {
  id: number;
  remark_uuid: string;
  post_uuid: string;
  user_name: string;
  content: string;
  date: string;
}

export default {
  props: {
    comment_uuid: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'comment-updated'],
  data() {
    return {
      comment: {} as Comment,
      errorMessage: "",
    };
  },
  methods: {
    fetchCommentData() {
      const Token = localStorage.getItem("Token");
      axios
        .get<Comment>(`/admin/comments/${this.comment_uuid}`, {
          headers: {
            Authorization: "Bearer " + Token,
          },
        })
        .then((response) => {
          this.comment = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comment data:", error);
          this.errorMessage = "Failed to fetch comment data";
        });
    },
    updateComment() {
      const Token = localStorage.getItem("Token");
      const updateData = {
        content: this.comment.content,
      };
      axios
        .put(`/admin/comments/${this.comment_uuid}`, updateData, {
          headers: {
            Authorization: "Bearer " + Token,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$emit("comment-updated");
          this.closeEditor();
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
          this.errorMessage = "Failed to update comment: " + (error.response?.data?.detail || error.message);
        });
    },
    closeEditor() {
      this.$emit('update:modelValue', false);
    },
  },
  mounted() {
    this.fetchCommentData();
  },
};
</script>

<template>
  <div class="mask" v-if="modelValue">
    <div class="EditBox">
      <div class="MidControl">
        <p class="UUID">评论 UUID: {{ comment.remark_uuid }}</p>
        <p class="POST-UUID">帖子 UUID: {{ comment.post_uuid }}</p>
        <p class="AUTHOR">作者: {{ comment.user_name }}</p>
        <textarea
          class="CONTENT"
          placeholder="评论内容"
          v-model="comment.content"
        ></textarea>
        <p class="DATE">日期: {{ comment.date }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="FootControl">
        <button class="Submit" @click="updateComment">提交</button>
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

.UUID, .AUTHOR, .CONTENT, .DATE {
  width: 100%;
  margin-bottom: 12px;
}

.UUID {
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.CONTENT {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
  resize: vertical;
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