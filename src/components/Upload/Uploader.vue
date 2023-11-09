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

export default {
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
        console.log(bodyFormData); // Log the final form data object to the console.
        axios
          .post("/posts/create", bodyFormData, config) // Send a POST request to the '/posts/create' endpoint with the form data as the payload.
          .then((response) => {
            // If the request is successful...
            console.log(response); // Log the response to the console for debugging purposes.
            if ((response.data.status = "success")) {
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
    <!-- Display the uploader panel only if the 'modelValue' prop is true -->
    <div class="UploaderPanel">
      <!-- <button @click="test">test</button> -->
      <h1 class="UploaderTitle">Upload Your Creativity</h1>
      <!-- Display a title for the uploader panel -->
      <button @click="closeUploader" class="closeButton">X</button>
      <!-- Display a close button to hide the uploader panel -->
      <input
        v-model="post_title"
        class="TitleInputer"
        placeholder="Type Your Title of your artwork."
      />
      <!-- Display an input field for the user to enter the post title -->
      <textarea
        v-model="description"
        class="DescriptionText"
        placeholder="Description"
      ></textarea>
      <!-- Display a text area for the user to enter the post description -->
      <div class="FileSelectionContainer">
        <input @change="loadFile" class="UploaderFile" type="file" multiple />
        <!-- Display a file input field for the user to select images to upload -->
        <input type="checkbox" v-model="(is_nsfw as any)" id="isNSFW" />
        <label class="NSFW" for="isNSFW">NSFW</label>
        <!-- Display a checkbox for the user to mark the post as NSFW (not safe for work) -->
        <input type="checkbox" v-model="CustomCover" id="CustomCover" />
        <label class="NSFW" for="CustomCover">CustomCover</label>
        <!-- Display a checkbox for the user to choose whether to use a custom cover image for the post -->
      </div>
      <div class="FileSelectionContainer">
        <input
          v-if="CustomCover"
          @change="loadCoverFile"
          class="UploaderFile"
          type="file"
        />
        <!-- If the 'CustomCover' data property is true, display a file input field for the user to select a cover image for the post -->
      </div>
      <div class="UploaderButtonContainer">
        <button @click="uploadPost" class="UploaderFunctionButton">
          Upload
        </button>
        <!-- Display a button that triggers the 'uploadPost' method when clicked -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS styling for the component */

@media only screen and (min-width: 768px) {
  @keyframes FadeIn {
    from {
      opacity: 0;
      scale: 0.8;
      margin-top: 200px;
    }

    to {
      opacity: 1;
      scale: 1;
      margin-top: 0px;
    }
  }

  .NSFW {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin: 10px;
  }

  .FileSelectionContainer {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }

  .UploaderFile {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin-top: 10px;
  }

  .UploaderFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    border: solid 1px #bdbdbd;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
  }

  .closeButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;
    left: 575px;
    top: -100px;
    transition: 1000ms;
  }

  .UploaderFunctionButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    border: solid 1px #bdbdbd;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
  }

  .UploaderFile::file-selector-button:hover,
  .closeButton:hover,
  .UploaderFunctionButton:hover {
    background-color: #7c4dff;
    color: #ffffff;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
  }

  .UploaderFile::file-selector-button:active,
  .closeButton:active,
  .UploaderFunctionButton:active {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }

  .UploaderTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: lighter;
    line-height: 100px;
    text-align: center;
    text-transform: uppercase;
    color: #212121;
  }

  .TitleInputer {
    width: 70%;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 28px;
    margin: auto;
    color: #212121;
    border: none;
    border-bottom: solid 2px #bdbdbd;
    outline: none;
    transition: 1000ms;
    padding: 5px;
  }

  .TitleInputer:focus {
    transition: 1000ms;
    border-bottom: solid 2px #212121;
  }

  .TitleInputer::placeholder {
    color: #757575;
  }

  .DescriptionText {
    width: 69%;
    height: 200px;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 20px;
    text-align: justify;
    padding: 10px;
    outline: none;
    color: #212121;
    border: solid 2px #bdbdbd;
    transition: 1000ms;
    border-radius: 8px;
  }

  .DescriptionText:focus {
    transition: 1000ms;
    border: solid 2px #212121;
  }

  .DescriptionText::placeholder {
    color: #757575;
  }

  .Mask {
    position: fixed;
    width: 100%;
    height: 120vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    top: -100px;
  }

  .UploaderPanel {
    width: 1200px;
    height: 800px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .UploaderButtonContainer {
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}

@media only screen and (max-width: 768px) {
  @keyframes FadeIn {
    from {
      opacity: 0;
      /* scale: 0.8; */
      margin-top: 200px;
    }

    to {
      opacity: 1;
      /* scale: 1; */
      margin-top: 0px;
    }
  }

  .NSFW {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    margin: 10px;
  }

  .FileSelectionContainer {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }

  .UploaderFile {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    margin-top: 10px;
  }

  .UploaderFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    border: solid 1px #bdbdbd;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
  }

  .closeButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;
    right: -180px;
    top: -100px;
    transition: 1000ms;
  }

  .UploaderFunctionButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    width: 150px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #212121;
    background-color: #ffffff;
    border: solid 1px #bdbdbd;
    margin: auto 30px;
    cursor: pointer;
    transition: 1000ms;
  }

  .UploaderFile::file-selector-button:hover,
  .closeButton:hover,
  .UploaderFunctionButton:hover {
    background-color: #7c4dff;
    color: #ffffff;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
  }

  .UploaderFile::file-selector-button:active,
  .closeButton:active,
  .UploaderFunctionButton:active {
    background-color: #303f9f;
    color: #c5cae9;
    transition: background-color 0.5s ease;
  }

  .UploaderTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: lighter;
    line-height: 100px;
    text-align: center;
    text-transform: uppercase;
    color: #212121;
  }

  .TitleInputer {
    width: 80%;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    margin: 10px auto;
    color: #212121;
    border: none;
    border-bottom: solid 2px #bdbdbd;
    outline: none;
    transition: 1000ms;
    padding: 5px;
  }

  .TitleInputer:focus {
    transition: 1000ms;
    border-bottom: solid 2px #212121;
  }

  .TitleInputer::placeholder {
    color: #757575;
  }

  .DescriptionText {
    width: 80%;
    height: 100px;
    resize: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 16px;
    text-align: justify;
    padding: 10px;
    outline: none;
    color: #212121;
    border: solid 2px #bdbdbd;
    transition: 1000ms;
    border-radius: 8px;
  }

  .DescriptionText:focus {
    transition: 1000ms;
    border: solid 2px #212121;
  }

  .DescriptionText::placeholder {
    color: #757575;
  }

  .Mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    /* background-color: rgba(0, 0, 0, 0.3); */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* top: -100px; */
  }

  .UploaderPanel {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: FadeIn 0.5s;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .UploaderButtonContainer {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    justify-content: flex-start;
  }
}
</style>
