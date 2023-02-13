<script lang="ts">
export default {
    data() {
        return {
            displayStatus: true
        }
    },
    methods: {
        selectToRegister() {
            this.$refs.form_box.style.transform = 'translateX(80%)';
            this.displayStatus = false;

        },
        selectToLogin() {
            this.$refs.form_box.style.transform = 'translateX(0%)';
            this.displayStatus = true;
        }
    }
}
</script>
<template>
    <div class="root">
        <div class="container">
            <div ref="form_box" id="form_box" class="form-box">
                <!-- Login Box -->
                <div v-if="displayStatus" ref="login_box" id="login_box" class="login-box">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="button">Login</button>
                </div>
                <!-- Register Box -->
                <div v-else ref="register_box" id="register_box" class="register-box hidden">
                    <h1>Register</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm passowrd" />
                    <input type="email" placeholder="Email" />
                    <button type="button">Register</button>
                </div>
            </div>
            <div class="con-box left">
                <h2>Welcome to <span>TinyGallery</span></h2>
                <p>Share your artworks! </p>
                <img src="../assets/TinyGallery_Logo.png" />
                <p>Had an account already?</p>
                <button @click="selectToLogin()" type="button">Go to login!</button>
            </div>
            <div class="con-box right">
                <h2>Welcome to <span>TinyGallery</span></h2>
                <p>Share your artworks! </p>
                <img src="../assets/TinyGallery_Logo.png" />
                <p>Don't have an account?</p>
                <button @click="selectToRegister()" type="button">Go to register!</button>
            </div>
        </div>
    </div>

</template>

<style>
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


.root {
    width: 100%;
    height: 100vh;
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
    z-index: 2;
    transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: FadeIn 0.5s;
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