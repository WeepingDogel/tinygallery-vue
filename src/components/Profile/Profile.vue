<!-- 
    Profile.vue


    
 -->
<script lang="ts">
import SettingsPanel from "@/components/Profile/SettingsPanel.vue";
import axios from "axios";

export default {
  components: {
    SettingsPanel,
  },
  data() {
    return {
      SettingsON: false,
      UserName: "",
      AvatarLink: "",
      BackgroundImageLink: "",
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
        .get(
          "/userdata/get/username",      
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          const username = response.data.username;
          if (username == false) {
            this.UserName = "Please relogin.";
          } else {
            this.UserName = username;
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
    // getUserAvatar(){

    // },
  },
  mounted() {
    this.getUserInfo();
    // this.getUserAvatar()
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
      <button @click="openSettings" class="ProfileEditButton">Edit</button>
    </div>
    <SettingsPanel v-model="SettingsON" />
    <div class="ProfileArtWorks"></div>
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
    height: 500px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 5px auto;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
    background-color: #ffffff;
  }
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
    height: 500px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    margin: 5px auto;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
    background-color: #ffffff;
  }
}
</style>
