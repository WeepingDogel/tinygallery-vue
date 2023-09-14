<!-- @/view/AuthView.vue -->
<!-- 
    v-if="displayStatus": This directive displays the content of the div if the displayStatus variable is set to true. 
    In this case, it displays the login form.

    v-else: This directive displays the content of the div if the displayStatus variable is set to false. 
    In this case, it displays the registration form.
    
    ref="register_box", ref="login_box" and ref="form_box": 
    These attributes add a reference to each box element so that the selectToRegister() and selectToLogin() methods 
    can access them and change their position on the screen.

    @click="LoginAccount": This attribute binds the LoginAccount() method to the click event of the login button, 
    so that when the user clicks the button, the method is called.

    @click="RegisterAccount": This attribute binds the RegisterAccount() method to the click event of the register button, 
    so that when the user clicks the button, the method is called.

    {{ Result }}: This expression displays the value of the Result variable in the template. 
    The Result variable is updated by the methods depending on the success or failure of the HTTP requests.
    Overall, this component provides a basic implementation for user authentication and registration using Vue.js and Axios.
-->
<script lang="ts">
import axios from 'axios'; // Import the Axios library
import { Authentication } from '@/stores/Authentication'; // Import the `Authentication` store

export default {
    data() {
        return {
            displayStatus: true, // A boolean value indicating whether the login or registration form is displayed
            logUserName: '', // The username to login
            logPassWord: '', // The password to login
            regUserName: '', // The username to register
            regPassWord: '', // The password to register
            regConfirmPassword: '', // Confirm the password
            regEmail: '', // The email address used for password recovery and user contact
            Result: '', // The response result from backend
        }
    },
    methods: { // The Methods to deal with the user actions.
        // Switch to the registration form
        selectToRegister() {
            (this.$refs as any).form_box.style.transform = 'translateX(80%)';
            this.displayStatus = false;
            this.Result = "";
        },
        // Switch to the login form
        selectToLogin() {
            (this.$refs as any).form_box.style.transform = 'translateX(0%)';
            this.displayStatus = true;
            this.Result = "";
        },
        // Action to register a new account
        RegisterAccount() {
            if (this.regPassWord == this.regConfirmPassword) { // Check if two passwords are the same
                axios.post(
                    '/user/register',
                    {
                        user_name: this.regUserName,
                        password: this.regPassWord,
                        email: this.regEmail
                    }
                ).then((response: any) => {
                    console.log(response.data.status);
                    this.selectToLogin();

                }).catch((error: any) => {
                    this.Result = error.response.data.detail
                    console.log(error.response.data.detail);
                });
            } else {
                this.Result = "The password typed twice are different!";
                // If two passwords inputed are different, refuse to send the request to the server.
            }

            // clean the input boxes
            this.regUserName = "";
            this.regPassWord = "";
            this.regConfirmPassword = "";
            this.regEmail = "";
        },
        // Action to login an existing account
        LoginAccount() {
            if (this.logUserName == "" || this.logPassWord == "") { // Check if username and password are empty
                this.Result = "Username or password can't be empty!"
                console.log("Username or password can't be empty!")
            } else {
                let bodyFormData = new FormData();
                bodyFormData.append('username', this.logUserName);
                bodyFormData.append('password', this.logPassWord);

                axios({
                    method: "post",
                    url: "/user/token",
                    data: bodyFormData,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }).then((response: any) => {
                    console.log(response.data.access_token);
                    // Create an object to store the username and token.
                    const token = response.data.access_token;
                    window.localStorage.setItem("Token", token)
                    // Set logging status.
                    Authentication().setLogStatus(true)
                    // Output logging status
                    console.log(Authentication().isLogged)
                    // Clean the input boxes.
                    this.logUserName = "";
                    this.logPassWord = "";
                    // Clean the result Text.
                    this.Result = "";
                    // Back to homepage.
                    this.$router.push("/");

                }).catch((error: any) => {
                    // Return the errors.
                    this.Result = error.response.data.detail;
                    console.log(error.response.data.detail);
                });
            }
        }
    }
}
</script>

<template>
    <div class="root">
        <div class="container">
            <div ref="form_box" id="form_box" class="form-box"> <!-- The form box contains the login and register boxes -->
                <!-- Login Box -->
                <div v-if="displayStatus" ref="login_box" id="login_box" class="login-box">
                    <!-- If the 'displayStatus' data property is true, display the login box -->
                    <h1>Login</h1>
                    <input v-model="logUserName" type="text" placeholder="Username" />
                    <!-- Display an input field for the user to enter their username -->
                    <input v-model="logPassWord" type="password" placeholder="Password" />
                    <!-- Display an input field for the user to enter their password -->
                    <button @click="LoginAccount" type="button">Login</button>
                    <!-- Display a button that triggers the 'LoginAccount' method when clicked -->
                    <span class="StatusMessage">{{ Result }}</span>
                    <!-- Display the result message from the server, if any -->
                </div>
                <!-- Register Box -->
                <div v-else ref="register_box" id="register_box" class="register-box hidden">
                    <!-- If the 'displayStatus' data property is false, display the register box -->
                    <h1>Register</h1>
                    <input v-model="regUserName" type="text" placeholder="Username" />
                    <!-- Display an input field for the user to enter their desired username -->
                    <input v-model="regPassWord" type="password" placeholder="Password" />
                    <!-- Display an input field for the user to enter their desired password -->
                    <input v-model="regConfirmPassword" type="password" placeholder="Confirm password" />
                    <!-- Display an input field for the user to confirm their password -->
                    <input v-model="regEmail" type="email" placeholder="Email" />
                    <!-- Display an input field for the user to enter their email address -->
                    <button @click="RegisterAccount" type="button">Register</button>
                    <!-- Display a button that triggers the 'RegisterAccount' method when clicked -->
                    <span class="StatusMessage">{{ Result }}</span>
                    <!-- Display the result message from the server, if any -->
                </div>
            </div>
            <div class="con-box left">
                <h2>Welcome to <span>TinyGallery</span></h2>
                <p>Share your artworks! </p>
                <img src="@/assets/TinyGallery_Logo.png" />
                <p>Had an account already?</p>
                <button @click="selectToLogin" type="button">Go to login!</button>
                <!-- Display a button that sets the 'displayStatus' data property to true, showing the login box -->
            </div>
            <div class="con-box right">
                <h2>Welcome to <span>TinyGallery</span></h2>
                <p>Share your artworks! </p>
                <img src="@/assets/TinyGallery_Logo.png" />
                <p>Don't have an account?</p>
                <button @click="selectToRegister" type="button">Go to register!</button>
                <!-- Display a button that sets the 'displayStatus' data property to false, showing the register box -->
            </div>
        </div>
    </div>
</template>

<style scoped>
/* CSS styling for the component */

@keyframes ContainerLoadIn {

    /* Define a keyframe animation called 'ContainerLoadIn' */
    from {
        opacity: 0;
        transform: translateX(90%);
    }

    to {
        opacity: 1;
        transform: translateX(0%);
    }
}

@keyframes formBoxLoadIn {

    /* Define a keyframe animation called 'formBoxLoadIn' */
    from {
        opacity: 0;
        transform: translateY(-90%);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes FadeIn {

    /* Define a keyframe animation called 'FadeIn' */
    from {
        opacity: 0;
        top: 10px;
    }

    to {
        opacity: 1;
        top: 0px;
    }
}


.root {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #C5CAE9;
    width: 650px;
    height: 415px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: FadeIn 0.5s;
    /* Apply the 'FadeIn' animation when the component is loaded */
    animation: ContainerLoadIn 0.5s;
    /* Apply the 'ContainerLoadIn' animation when the component is loaded */
}

.form-box {
    position: absolute;
    top: -10%;
    left: 5%;
    background-color: #3F51B5;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transition: 0.5s ease-in-out;
    animation: formBoxLoadIn 0.5s;
    /* Apply the 'formBoxLoadIn' animation when the component is loaded */
}

.register-box,
.login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: FadeIn 0.5s;
    /* Apply the 'FadeIn' animation when the component is loaded */
}



.login-box,
.register-box h1 {
    text-align: center;
    line-height: 50px;
    text-transform: uppercase;
    color: #FFFFFF;
    letter-spacing: 5px;
    font-family: Arial, Helvetica, sans-serif;
}

input {
    font-family: Arial, Helvetica, sans-serif;
    background-color: transparent;
    width: 70%;
    color: #FFFFFF;
    border: none;
    border-bottom: 1px solid #FFFFFF;
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
}

input::placeholder {
    color: #C5CAE9;
}

input:focus {
    outline: none;
}

input:focus::placeholder {
    opacity: 0;
}

.form-box button {
    font-family: Arial, Helvetica, sans-serif;
    width: 70%;
    margin-top: 35px;
    background-color: #7C4DFF;
    outline: none;
    border-radius: 8px;
    padding: 13px;
    color: #FFFFFF;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}



span.StatusMessage {
    position: relative;
    top: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 12px;
    text-transform: none;
    line-height: 20px;
    letter-spacing: 0px;
    color: #FFFFFF;
}

.form-box button:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.con-box {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.con-box.left {
    left: -2%;
}

.con-box.right {
    right: -2%;
}

.con-box h2 {
    color: #212121;
    font-size: 25px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    color: #757575;
    text-align: center;
}

.con-box span {
    font-family: Arial, Helvetica, sans-serif;
    color: #7C4DFF;
}

.con-box img {
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}

.con-box button {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 3%;
    background-color: #C5CAE9;
    color: #7C4DFF;
    border: 1px solid #7C4DFF;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
}

.con-box button:hover {
    background-color: #7C4DFF;
    color: #fff;
}
</style>