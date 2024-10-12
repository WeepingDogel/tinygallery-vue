<!-- 
    UserProfile.vue
 -->
<script lang="ts">
import SettingsPanel from "@/components/Profile/SettingsPanel.vue";
import EditPost from "@/components/Profile/EditPost.vue";
import axios from "axios";

// Define the Post type based on the JSON data from the backend
interface Post {
  post_uuid: string;
  post_title: string;
  description: string;
  // Add other properties as needed
}

export default {
  name: "UserProfile", // Multi-word component name
  components: {
    SettingsPanel,
    EditPost,
  },
  data() {
    return {
      SettingsON: false,
      UserName: "",
      AvatarLink: "",
      BackgroundImageLink: "",
      posts: [] as Post[],
      isEditing: false,
      currentPost: null as Post | null,
    };
  },
  methods: {
    openSettings() {
      this.SettingsON = true;
    },
    async getUserInfo() {
      const token = localStorage.getItem("Token");
      // GetUserName
      axios
        .get("/userdata/get/username", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          const username = response.data.username;
          if (username == false) {
            this.UserName = "Please relogin.";
          } else {
            this.UserName = username;
            this.fetchUserPosts(username); // Fetch posts for the user
            axios.get("/resources/avatar/" + username, {}).then((response) => {
              console.log(response.data);
              this.AvatarLink = response.data.avatar_200px;
            });
            axios
              .get("/resources/profile/background/" + username, {})
              .then((response) => {
                console.log(response.data);
                this.BackgroundImageLink = response.data.background;
              });
          }
          console.log(username);
        });
    },
    async fetchUserPosts(username: string) {
      const token = localStorage.getItem("Token");
      const response = await axios.get<Post[]>(
        `/resources/posts/getAllPostsBelongToUser/1?user_name=${username}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.posts = response.data;
    },
    startEditing(post: Post) {
      this.currentPost = post;
      this.isEditing = true;
    },
    removePost(postUuid: string) {
      const token = localStorage.getItem("Token"); // Retrieve the token from local storage
      console.log(`Removing post with UUID: ${postUuid}`);
      // Call the backend API to remove the post
      axios
        .delete(`/posts/remove/${postUuid}`, {
          headers: {
            Authorization: "Bearer " + token, // Include the token in the headers
          },
        })
        .then((response) => {
          console.log(response.data);
          this.fetchUserPosts(this.UserName); // Refresh the posts list
        })
        .catch((error) => {
          console.error("Error removing post:", error);
        });
    },
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {
    SettingsON(newValue, oldValue) {
      for (let index = 0; index <= 5; index++) {
        this.getUserInfo();
      }
    },
  },
};
</script>

<template>
  <div class="ProfileContainer">
    <div class="ProfileCard">
      <div class="UserCover">
        <img :src="BackgroundImageLink" />
      </div>
      <div class="ProfileAvatar">
        <img :src="AvatarLink" />
      </div>
      <div class="ProfileUserNameContainerBox">
        <h2 class="ProfileUserName">{{ UserName }}</h2>
      </div>
      <button @click="openSettings" class="ProfileEditButton">编辑</button>
    </div>
    <SettingsPanel v-model="SettingsON" />
    <div class="ProfileArtWorks">
      <h3 class="ProfileArtWorksTitle">你的帖子</h3>
      <div v-if="posts.length === 0" class="NoPosts">没有可用的帖子。</div>
      <div v-for="post in posts" :key="post.post_uuid" class="PostItem">
        <h4>{{ post.post_title }}</h4>
        <p>{{ post.description }}</p>
        <button @click="startEditing(post)" class="ActionButton">
          编辑
        </button>
        <button @click="removePost(post.post_uuid)" class="ActionButton">
          删除
        </button>
      </div>
    </div>
    <EditPost v-if="isEditing" :post="currentPost!" @close="isEditing = false" />
  </div>
</template>

<style scoped>
@media only screen and (min-width: 768px) {
  @keyframes FadeIn {
    from {
      opacity: 0;
      top: 10px;
    }

    to {
      opacity: 1;
      top: 0px;
    }
  }

  .ProfileContainer {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    animation: FadeIn 0.5s;
  }

  .ProfileCard {
    width: 70%;
    height: 75vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    /* margin: 10px auto; */
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
    background-color: #ffffff;
  }

  .UserCover {
    width: 100%;
    height: 300px;
    background-color: #3f51b5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .UserCover img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .ProfileAvatar {
    width: 200px;
    height: 200px;
    border: solid 1px #bdbdbd;
    border-radius: 10px;
    position: relative;
    margin: 0 50px;
    top: -10%;
    background-color: #ffffff;
  }

  .ProfileAvatar img {
    width: 200px;
    height: auto;
    border-radius: 10px;
  }

  .ProfileUserName {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 30px;
    color: #212121;
  }

  .ProfileUserNameContainerBox {
    position: relative;
    left: 280px;
    top: -160px;
  }

  .ProfileEditButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7c4dff;
    padding: 13px;
    color: #ffffff;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    top: -200px;
    right: 50px;
    float: right;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileEditButton:hover {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }

  .ProfileArtWorks {
    width: 70%;
    margin: 20px auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f9f9f9;
  }

  .PostItem {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
  }

  .PostItem button {
    margin-right: 10px;
  }
}

.NoPosts {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 30px;
  color: #212121;
  padding: 10px;
}

.ProfileArtWorksTitle {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 30px;
  color: #212121;
  padding: 10px;
}

@media only screen and (max-width: 768px) {
  @keyframes FadeIn {
    from {
      opacity: 0;
      top: 10px;
    }

    to {
      opacity: 1;
      top: 0px;
    }
  }

  .ProfileContainer {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    animation: FadeIn 0.5s;
  }

  .ProfileCard {
    width: 95%;
    height: 50vh;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    /* margin: 10px auto; */
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
    background-color: #ffffff;
  }

  .UserCover {
    width: 100%;
    height: 200px;
    background-color: #3f51b5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .UserCover img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .ProfileAvatar {
    width: 100px;
    height: 100px;
    border: solid 1px #bdbdbd;
    border-radius: 10px;
    position: relative;
    /* margin: 0 50px; */
    margin-left: 20px;
    top: -8%;
    background-color: #ffffff;
  }

  .ProfileAvatar img {
    width: 100px;
    height: auto;
    border-radius: 10px;
  }

  .ProfileUserName {
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 20px;
    color: #212121;
  }

  .ProfileUserNameContainerBox {
    width: 50%;
    position: relative;
    left: 135px;
    top: -90px;
  }

  .ProfileEditButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7c4dff;
    padding: 13px;
    color: #ffffff;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    top: -120px;
    right: 10px;
    float: right;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileEditButton:hover {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }

  .ProfileArtWorks {
    width: 95%;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #f9f9f9;
  }

  .PostItem {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
  }

  .PostItem button {
    margin-right: 10px;
  }
}

.ActionButton {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  border: none;
  background-color: #7c4dff;
  padding: 13px;
  color: #ffffff;
  letter-spacing: 2px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px; /* Space between buttons */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.ActionButton:hover {
  background-color: #303f9f; /* Darker shade on hover */
}
</style>