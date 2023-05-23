<!-- navbar.vue -->
<!-- 
    In the script section:

        import Uploader from "@/components/Upload/Uploader.vue";: Import the "Uploader" component.
        import { RouterLink } from 'vue-router';: Import the "RouterLink" component from Vue Router.
        import { Authentication } from '@/stores/Authentication';: Import the "Authentication" store.
        import { storeToRefs } from 'pinia';: Import the "storeToRefs" function from Pinia.

    The component has the following properties:

        DisplayLink: A string representing the link to be displayed in the navbar.
        DisplayTitle: A string representing the title to be displayed in the navbar.
        functionDisplay: A boolean indicating whether the logout and uploader buttons should be displayed.
        UploaderON: A boolean indicating whether the uploader component should be displayed.

        In the setup() method, a reference to the Authentication store is created and 
        converted to refs using the storeToRefs function from Pinia. 
        This allows the component to reactively update when the isLogged property of the store changes.

        The watch option watches for changes to the isLogged property in the store 
        and calls the changeURL() and displayLogout() methods when the value changes.

        The changeURL() method updates the DisplayLink and DisplayTitle properties based on whether the user is logged in or not.

        The displayLogout() method sets the functionDisplay property to true if the user is authenticated and false otherwise.

        The logout() method logs the user out by removing the token from local storage and 
        updating the isLogged property in the Authentication store. 
        It then redirects the user to the home page.

        The OpenUploader() method opens the uploader component by setting the UploaderON property to true.

    In the template section:

        The component renders a navigation bar with links to different pages, 
        depending on the user's authentication status. 
        
        The RouterLink component is used to render the links provided by Vue Router. 

        The v-if directive is used to conditionally display the logout and uploader buttons 
        based on the functionDisplay property.

        The Uploader component is rendered and bound to the UploaderON property using v-model.
 -->
<script lang="ts">
import Uploader from "@/components/Upload/Uploader.vue"; // Import the "Uploader" component
import { RouterLink } from 'vue-router'; // Import the "RouterLink" component from Vue Router
import { Authentication } from '@/stores/Authentication'; // Import the "Authentication" store
import { storeToRefs } from 'pinia'; // Import the "storeToRefs" function from Pinia

export default {
    data() {
        return {
            DisplayLink: "/login", // Initialize the login link
            DisplayTitle: "Login", // Initialize the title to be "Login"
            functionDisplay: false, // Initialize the function display to be false
            UploaderON: false, // Initialize the state of the uploader to be closed
            MobileScreen: false,
            DesktopScreen: false,
            Menu: false,
            MenuText: 'Menu'
        }
    },
    setup() {
        const logStatus = Authentication(); // Create a reference to the "Authentication" store
        const UpdateStatus = storeToRefs(logStatus) // Convert the store to refs to make it reactive

        return {
            UpdateStatus, logStatus
        }
    },
    watch: {
        "logStatus.isLogged"(newValue, oldValue) { // Watch changes to the "isLogged" property of the store
            this.changeURL() // Call the changeURL method when the state changes
            this.displayLogout() // Call the displayLogout method when the state changes
        }
    },
    methods: {
        changeURL() { // Change the URL and title in the navbar based on whether the user is logged in or not
            if (this.logStatus.isLogged) {
                this.DisplayLink = "/profile";
                this.DisplayTitle = "Profile"
            } else {
                this.DisplayLink = "/login";
                this.DisplayTitle = "Login"
            }
        },
        displayLogout() { // Show or hide the logout button based on whether the user is logged in or not
            if (this.logStatus.isLogged) {
                this.functionDisplay = true;
            } else {
                this.functionDisplay = false;
            }
        },
        logout() { // Log the user out and redirect to the home page
            localStorage.removeItem("Token"); // Remove the token from local storage
            Authentication().setLogStatus(false); // Update the store to reflect that the user is logged out
            this.$router.push("/") // Redirect to the home page
            console.log(this.logStatus.isLogged);
            console.log("logged out");
        },
        OpenUploader() { // Open the uploader component
            this.UploaderON = true;
        },
        checkScreenWidth() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                this.MobileScreen = true;
                this.DesktopScreen = false;
            } else if (screenWidth >= 768) {
                this.MobileScreen = false;
                this.DesktopScreen = true;
            } else {
                this.MobileScreen = false;
                this.DesktopScreen = false;
            }
        },
        OpenMenu() {
            this.Menu = !this.Menu;
            if(this.Menu){
                this.MenuText = "Close";
            }else{
                this.MenuText = "Menu";
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkScreenWidth);
    },
    mounted() {
        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth);
    },
    components: {
        Uploader // Register the "Uploader" component as a child component
    }
}
</script>

<template>
    <div class="LinkMenu" v-if="Menu">
        <button @click="OpenUploader" class="uploadButton" v-if="functionDisplay">+</button>
        <RouterLink to="/">Home</RouterLink>
        <!-- Link to the home page -->
        <RouterLink :to="DisplayLink">{{ DisplayTitle }}</RouterLink>
        <!-- Link to either the login or profile page, depending on the user's authentication status -->
        <button class="functionButton" v-if="functionDisplay" @click="logout">Logout</button>
        <!-- Display the logout button if the user is authenticated -->
        <RouterLink to="/about">About</RouterLink> <!-- Link to the about page -->
    </div>
    <div id="bar">
        <h1 id="MainTitle">TinyGallery Vue Beta</h1>
        <button @click="OpenMenu" id="MobileMenu" v-if="MobileScreen">
            {{ MenuText }}
        </button>
        <div id="linkContainer" v-if="DesktopScreen">

            <RouterLink to="/">Home</RouterLink>
            <!-- Link to the home page -->
            <RouterLink :to="DisplayLink">{{ DisplayTitle }}</RouterLink>
            <!-- Link to either the login or profile page, depending on the user's authentication status -->
            <button class="functionButton" v-if="functionDisplay" @click="logout">Logout</button>
            <!-- Display the logout button if the user is authenticated -->
            <RouterLink to="/about">About</RouterLink> <!-- Link to the about page -->
            <button @click="OpenUploader" class="uploadButton" v-if="functionDisplay">+</button>
            <!-- Display the uploader button if the user is authenticated -->
        </div>
    </div>
    <Uploader v-model="UploaderON" /> <!-- Render the uploader component and bind it to a model -->
</template>

<style scoped>
/* CSS styling for the component */
.uploadButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: lighter;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #FFFFFF;
    background-color: #7C4DFF;
    margin: auto 10px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.uploadButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}

.functionButton {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: lighter;
    transition: 1000ms;
    width: 100px;
    height: 70px;
    border: none;
    outline: none;
    border-radius: 8px;
    color: #C5CAE9;
    background-color: #3F51B5;
    margin: auto;
    cursor: pointer;
}

.functionButton:hover {
    transition: 1000ms;
    background-color: #303F9F;
    color: #FFFFFF;
    transition: background-color 0.5s ease;
}

#bar {
    width: 100%;
    height: 70px;
    background-color: #3F51B5;
    border-bottom: solid 1px #BDBDBD;
    display: flex;
    justify-content: space-between;
}

#MainTitle {
    line-height: 70px;
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 26px;
    text-indent: 0.5em;
}

#linkContainer {
    width: auto;
    height: 70px;
    display: flex;
    justify-content: space-around;
}

#linkContainer a {
    text-decoration: none;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    line-height: 70px;
    text-align: center;
    width: 100px;
    color: #C5CAE9;
    transition: 1000ms;
}

#linkContainer a:hover {
    transition: 1000ms;
    color: #FFFFFF;
}

#linkContainer .router-link-active,
.router-link-exact-active {
    transition: 1000ms;
    color: #FFFFFF;
}

@media only screen and (max-width: 768px) {

    @keyframes MobileMenuLoading {
        from{
            opacity: 0;
            /* margin-bottom: 100%; */
        }
        to{
            opacity: 1;
            /* margin-bottom: 0px; */
        }
    }
    .uploadButton {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 36px;
        font-weight: lighter;
        width: 50px;
        height: 50px;
        border: none;
        outline: none;
        border-radius: 8px;
        color: #FFFFFF;
        background-color: #7C4DFF;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .uploadButton:hover {
        background-color: #303F9F;
        color: #C5CAE9;
        transition: background-color 0.5s ease;
    }

    .functionButton {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        font-weight: lighter;
        transition: 1000ms;
        width: 80px;
        height: 70px;
        border: none;
        outline: none;
        /* border-radius: 8px; */
        color: #C5CAE9;
        background-color: #3F51B5;
        margin: auto;
        cursor: pointer;
    }

    .functionButton:hover {
        transition: 1000ms;
        background-color: #303F9F;
        color: #FFFFFF;
        transition: background-color 0.5s ease;
    }

    #bar {
        width: 100%;
        height: 70px;
        background-color: #3F51B5;
        border-bottom: solid 1px #BDBDBD;
        display: flex;
        justify-content: space-between;
    }

    #MainTitle {
        line-height: 70px;
        color: #FFFFFF;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        font-size: 16px;
        text-indent: 0.5em;
    }

    #MobileMenu {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 18px;
        width: 80px;
        background-color: #3F51B5;
        color: #FFFFFF;
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        animation: MobileMenuLoading 1s;
        transition: ease-in-out 500ms;
    }

    #MobileMenu:hover {
        background-color: #7C4DFF;
        transition: ease-in-out 500ms;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    #MobileMenu:active {
        background-color: #303F9F;
    }

    .LinkMenu {
        background-color: #3F51B5;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 70px;
        /* right: 10px; */
        z-index: 2;
        padding-bottom: 10px;
        animation: MobileMenuLoading 0.5s;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
    }

    .LinkMenu a {
        text-decoration: none;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
        line-height: 70px;
        text-align: center;
        width: 80px;
        margin: 0 auto;
        color: #C5CAE9;
        background-color: #3F51B5;
        transition: 1000ms;
    }

    .LinkMenu a:hover {
        transition: 1000ms;
        color: #FFFFFF;
    }

    /* #linkContainer {
        display: none;   
    } */
}
</style>