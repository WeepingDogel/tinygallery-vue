<script lang="ts">
import axios from "axios";

export default {
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  data() {
    return {
      newUserName: "",
      backgroundImage: null,
      avatarFile: null,
      Timezone: "",
      previousPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "", // New data property for error messages
      successMessage: "", // New data property for success messages
    };
  },
  methods: {
    loadAvatar(event: any) {
      this.avatarFile = event.target.files[0];
      console.log(this.avatarFile);
    },
    loadBackground(event: any) {
      this.backgroundImage = event.target.files[0];
      console.log(this.backgroundImage);
    },
    CloseAndSaveSettings() {
      // This function will close the Settings Panel and save the profile.
      if (this.newUserName != "") {
        /* empty */
      } else if (this.avatarFile != null) {
        const token = localStorage.getItem("Token");
        const BodyFormData = new FormData();
        const config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        BodyFormData.append("avatar", this.avatarFile);
        axios
          .put("/userdata/set/avatar", BodyFormData, config)
          .then((response) => {
            console.log(response.data.status);
          });
      }
      if (this.backgroundImage != null) {
        const token = localStorage.getItem("Token");
        const BodyFormData = new FormData();
        const config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        BodyFormData.append("background", this.backgroundImage);
        axios
          .put("/userdata/set/background", BodyFormData, config)
          .then((response) => {
            console.log(response.data.status);
          });
      } else if (this.Timezone != "") {
        console.log(this.Timezone);
      }
      this.newUserName = "";
      this.avatarFile = null;
      this.backgroundImage = null;
      this.$emit("update:modelValue", false);
    },
    DiscardSettings() {
      // This function will not save any information when user clicked and close the Settings Panel.
      this.$emit("update:modelValue", false);
    },
    changePassword() {
      this.errorMessage = ""; // Reset error message before validation
      this.successMessage = ""; // Reset success message before validation
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "新密码和确认密码不匹配。";
        return;
      }

      const token = localStorage.getItem("Token");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const data = {
        previous_password: this.previousPassword,
        new_password: this.newPassword,
        confirm_password: this.confirmPassword,
      };
      axios
        .post("http://localhost:8000/userdata/change-password", data, config)
        .then((response) => {
          console.log(response.data);
          // Handle success (e.g., show a success message)
          this.successMessage = "密码已成功更改！"; // Set success message
          // Clear the form fields
          this.previousPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            // Check for specific error message from backend
            if (error.response.data.detail) {
              this.errorMessage = error.response.data.detail; // Display detailed error message
            } else {
              this.errorMessage = "发生错误。请重试。";
            }
          } else {
            this.errorMessage = "发生错误。请重试。";
          }
        });
    },
  },
};
</script>

<template>
  <div v-if="modelValue" class="ProfileSettings">
    <div class="SettingsBox">
      <h2 class="ProfileSettingsTitle">基本信息</h2>
      <p class="ProfileText">
        头像：
        <input
          @change="loadAvatar"
          class="ProfileTextFile"
          placeholder="更改头像"
          type="file"
        />
      </p>
      <p class="ProfileText">
        背景：
        <input
          @change="loadBackground"
          class="ProfileTextFile"
          placeholder="更改背景"
          type="file"
        />
      </p>
    </div>
    <button @click="CloseAndSaveSettings" class="ProfileFinishButton">
      应用
    </button>
    <button @click="DiscardSettings" class="ProfileFinishButton">
      放弃
    </button>
    <div class="PasswordChange">
      <h2>更改密码</h2>
      <div class="PasswordInputGroup">
        <label>之前的密码：</label>
        <input v-model="previousPassword" type="password" placeholder="输入之前的密码" class="PasswordInput" />
      </div>
      <div class="PasswordInputGroup">
        <label>新密码：</label>
        <input v-model="newPassword" type="password" placeholder="输入新密码" class="PasswordInput" />
      </div>
      <div class="PasswordInputGroup">
        <label>确认新密码：</label>
        <input v-model="confirmPassword" type="password" placeholder="确认新密码" class="PasswordInput" />
      </div>
      <button @click="changePassword" class="ProfileFinishButton">更改密码</button>
      <p v-if="errorMessage" class="ErrorMessage">{{ errorMessage }}</p> <!-- Display error message -->
      <p v-if="successMessage" class="SuccessMessage">{{ successMessage }}</p> <!-- Display success message -->
    </div>
  </div>
</template>

<style scoped>
@media only screen and (min-width: 768px) {
  @keyframes SlideIn {
    from {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0%);
    }
  }

  .SettingsBox {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 25px;
  }

  .ProfileText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #212121;
    text-align: justify;
  }

  .NoteText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #ff0000;
    text-align: justify;
  }

  .ProfileTextFile {
    width: 300px;
    color: #212121;
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
  }

  .ProfileTextFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    background-color: #7c4dff;
    color: #ffffff;
    padding: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileTextFile::file-selector-button:hover {
    background-color: #303f9f;
    color: #c5cae9;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
  }

  .ProfileTextInputer {
    width: 300px;
    color: #212121;
    border: none;
    border-bottom: solid 1px #bdbdbd;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
  }

  .ProfileTextInputer::placeholder {
    color: #757575;
  }

  .ProfileTextInputer:focus {
    border-bottom: solid 1px #212121;
  }

  .ProfileSettingsTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 24px;
    line-height: 50px;
    padding: 10px;
  }

  .ProfileSettings {
    width: 70%;
    height: auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    animation: FadeIn 0.5s;
    animation: SlideIn 0.5s;
    margin: 5px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
  }

  .ProfileFinishButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7c4dff;
    padding: 12px;
    margin: 12px;
    color: #ffffff;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileFinishButton:hover {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }
}

@media only screen and (max-width: 768px) {
  @keyframes SlideIn {
    from {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0%);
    }
  }

  .SettingsBox {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    /* padding: 25px; */
  }

  .ProfileText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #212121;
    /* text-align: justify; */
  }

  .NoteText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #ff0000;
    text-align: justify;
  }

  .ProfileTextFile {
    width: 300px;
    color: #212121;
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
  }

  .ProfileTextFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    background-color: #7c4dff;
    color: #ffffff;
    padding: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileTextFile::file-selector-button:hover {
    background-color: #303f9f;
    color: #c5cae9;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
  }

  .ProfileTextInputer {
    width: 300px;
    color: #212121;
    border: none;
    border-bottom: solid 1px #bdbdbd;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
  }

  .ProfileTextInputer::placeholder {
    color: #757575;
  }

  .ProfileTextInputer:focus {
    border-bottom: solid 1px #212121;
  }

  .ProfileSettingsTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 24px;
    line-height: 50px;
    padding: 10px;
  }

  .ProfileSettings {
    width: 95%;
    height: auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    animation: FadeIn 0.5s;
    animation: SlideIn 0.5s;
    margin: 5px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
  }

  .ProfileFinishButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7c4dff;
    padding: 12px;
    margin: 12px;
    color: #ffffff;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .ProfileFinishButton:hover {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }
}

.PasswordChange {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.PasswordChange h2 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 15px;
  color: #212121;
}

.PasswordInputGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.PasswordInputGroup label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
}

.PasswordInput {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.PasswordInput::placeholder {
  color: #757575;
}

.PasswordInput:focus {
  border-color: #7c4dff;
  outline: none;
}

.SuccessMessage {
  color: #4caf50; /* Green color for success messages */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin-top: 10px;
}

.ErrorMessage {
  color: #ff0000; /* Red color for error messages */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin-top: 10px;
}
</style>
