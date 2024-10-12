<!-- @/components/Upload/Uploader.vue -->
<!-- 
    The code you provided is a TypeScript file that exports a Vue.js component. 
    The component is responsible for displaying an uploader panel allowing users to upload images and create a post.

    Let's go through the code to understand how the component works:

        import statements are used to bring in functionality from other modules that the component depends on.

        The props option defines the properties that can be passed to this component from its parent component. 
        In this case, there is only one prop called modelValue of type Boolean.
        
        The emits option defines the events emitted by this component. 
        In this case, only one event called 'update:modelValue' is defined.
        
        The data function initializes the component's data properties. 
        In this case, it sets the initial values for 
        CustomCover, is_nsfw, uploadImagesFile, coverFile, post_title, and description.
        
        The methods object defines the functions that can be called from the template or within the component. 
        In this case, the component has four methods: 
        closeUploader(), test(), loadFile(event:any), loadCoverFile(event:any), and uploadPost().
        
        The template section defines the HTML structure and the dynamic bindings of the component.

    Overall, the component allows users to select image files to upload, specify a title and description for their post, and optionally mark it as NSFW (not safe for work). When the user clicks the "Upload" button, the component sends a POST request to the /posts/create endpoint with the selected files and fields as form data. If the server responds with a success status, the uploaded images are displayed on the website and the user is redirected to the homepage.

 -->
<script lang="ts">
import { UpdateImages } from "@/stores/UpdateImages"; // Import a module called 'UpdateImages' from a local file in the project.
import axios from "axios"; // Import the Axios library for making HTTP requests.
import moment from 'moment-timezone';

export default {
  name: 'UploaderComponent', // Changed to multi-word component name
  props: {
    modelValue: Boolean, // Define a prop called 'modelValue' of type Boolean. This allows data to be passed into the component from its parent component.
  },
  emits: ["update:modelValue"], // Define an event called 'update:modelValue', which can be emitted by this component.
  data() {
    return {
      CustomCover: false, // Initialize a data property called 'CustomCover' to false.
      is_nsfw: "", // Initialize a data property called 'is_nsfw' to an empty string.
      uploadImagesFile: [], // Initialize a data property called 'uploadImagesFile' to a variable of type 'FileList'.
      coverFile: null, // Initialize a data property called 'coverFile' to null.
      post_title: "", // Initialize a data property called 'post_title' to an empty string.
      description: "", // Initialize a data property called 'description' to an empty string.
    };
  },
  methods: {
    closeUploader() {
      // Define a method called 'closeUploader' that emits the 'update:modelValue' event with a value of false.
      this.$emit("update:modelValue", false);
    },
    test() {
      // Define a method called 'test' that logs the current value of the 'is_nsfw' data property to the console.
      console.log(this.is_nsfw);
    },
    loadFile(event: any) {
      // Define a method called 'loadFile' that sets the 'uploadImagesFile' data property to the files selected by the user.
      this.uploadImagesFile = event.target.files;
      console.log(this.uploadImagesFile);
    },
    loadCoverFile(event: any) {
      // Define a method called 'loadCoverFile' that sets the 'coverFile' data property to the file selected by the user for the post cover.
      this.coverFile = event.target.files[0];
      console.log(this.coverFile);
    },
    uploadPost() {
      // Define a method called 'uploadPost' that sends a POST request to the server with the form data entered by the user.
      if (this.post_title == "" || this.description == "") {
        // If the 'post_title' or 'description' data properties are empty, log an error message to the console.
        console.log("Title and Dercription can't be empty!");
      } else {
        const token = localStorage.getItem("Token"); // Get the JWT token from local storage and store it in a variable called 'token'.
        const config = {
          // Define an object called 'config' with headers that include the JWT token and set the content type to 'multipart/form-data'.
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "multipart/form-data",
          },
        };
        let is_nsfw; // Declare a variable called 'is_nsfw'.
        let bodyFormData = new FormData(); // Create a new instance of the FormData class and store it in a variable called 'bodyFormData'.
        if (this.is_nsfw) {
          // Check whether the 'is_nsfw' data property is true. If so, set 'is_nsfw' to "true"; otherwise, set it to "false".
          is_nsfw = "true";
        } else {
          is_nsfw = "false";
        }
        bodyFormData.append("is_nsfw", is_nsfw); // Append the 'is_nsfw' value to the form data object.
        bodyFormData.append("post_title", this.post_title); // Append the 'post_title' value to the form data object.
        bodyFormData.append("description", this.description); // Append the 'description' value to the form data object.
        if (this.CustomCover) {
          // If the 'CustomCover' data property is true, append the cover file selected by the user to the form data object; otherwise, append an empty string.
          bodyFormData.append("cover", this.coverFile as any);
        } else {
          bodyFormData.append("cover", "");
        }
        for (let i = 0; i < this.uploadImagesFile.length; i++) {
          // Loop through the array of uploaded images and append each one to the form data object.
          console.log(this.uploadImagesFile[i]);
          bodyFormData.append("uploaded_file", this.uploadImagesFile[i]);
        }
        const currentDate = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        bodyFormData.append("date", currentDate);
        console.log(bodyFormData); // Log the final form data object to the console.
        axios
          .post("/posts/create", bodyFormData, config) // Send a POST request to the '/posts/create' endpoint with the form data as the payload.
          .then((response) => {
            // If the request is successful...
            console.log(response); // Log the response to the console for debugging purposes.
            if (response.data.status === "success") {
              // Check if the server responded with a success status.
              this.$emit("update:modelValue", false); // Emit the 'update:modelValue' event with a value of false to close the uploader panel.
              UpdateImages().Update(1); // Call the 'UpdateImages' function to update the images displayed on the website.
              this.$router.push("/"); // Redirect the user to the homepage.
            }
          })
          .catch((error) => {
            // If there was an error...
            console.error(error); // Log the error to the console for debugging purposes.
            alert(error.response.data.detail); // Display an alert with details about the error.
          });
      }
      this.post_title = ""; // Reset the 'post_title' data property to an empty string.
      this.description = ""; // Reset the 'description' data property to an empty string.
      this.is_nsfw = ""; // Reset the 'is_nsfw' data property to an empty string.
      this.CustomCover = false; // Reset the 'CustomCover' data property to false.
    },
  },
};
</script>

<template>
  <div class="Mask" v-if="modelValue">
    <div class="UploaderPanel">
      <h1 class="UploaderTitle">上传您的创意</h1>
      <button @click="closeUploader" class="CloseButton">X</button>
      <input
        v-model="post_title"
        class="TitleInputer"
        placeholder="输入您作品的标题。"
      />
      <textarea
        v-model="description"
        class="DescriptionText"
        placeholder="描述"
      ></textarea>
      <div class="FileSelectionContainer">
        <input @change="loadFile" class="UploaderFile" type="file" multiple />
        <div class="CheckboxContainer">
          <input type="checkbox" v-model="is_nsfw" id="isNSFW" />
          <label class="CheckboxLabel" for="isNSFW">成人内容</label>
        </div>
        <div class="CheckboxContainer">
          <input type="checkbox" v-model="CustomCover" id="CustomCover" />
          <label class="CheckboxLabel" for="CustomCover">自定义封面</label>
        </div>
      </div>
      <div class="FileSelectionContainer" v-if="CustomCover">
        <input
          @change="loadCoverFile"
          class="UploaderFile"
          type="file"
        />
      </div>
      <div class="UploaderButtonContainer">
        <button @click="uploadPost" class="UploaderFunctionButton">
          上传
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Mask {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
  left: 0;
}

.UploaderPanel {
  width: 90%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 45px;
  position: relative;
  animation: FadeIn 0.3s ease-out;
}

.UploaderTitle {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.CloseButton {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.TitleInputer, .DescriptionText {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.DescriptionText {
  height: 100px;
  resize: vertical;
}

.FileSelectionContainer {
  margin-bottom: 15px;
}

.UploaderFile {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.CheckboxContainer {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.CheckboxLabel {
  margin-left: 5px;
  font-size: 14px;
  color: #333;
}

.UploaderButtonContainer {
  text-align: center;
  margin-top: 20px;
}

.UploaderFunctionButton {
  background-color: #7c4dff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.UploaderFunctionButton:hover {
  background-color: #6c3ce6;
}

@keyframes FadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .UploaderPanel {
    width: 95%;
    padding: 15px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .UploaderTitle {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .CloseButton {
    top: 5px;
    right: 5px;
    font-size: 18px;
  }

  .TitleInputer, .DescriptionText, .UploaderFile {
    font-size: 14px;
    padding: 8px;
    margin-bottom: 10px;
  }

  .DescriptionText {
    height: 80px;
  }

  .CheckboxContainer {
    margin-top: 5px;
  }

  .CheckboxLabel {
    font-size: 12px;
  }

  .UploaderButtonContainer {
    margin-top: 15px;
  }

  .UploaderFunctionButton {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>