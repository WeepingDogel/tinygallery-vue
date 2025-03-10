// stores/Authentication.ts
// This code defines a Pinia store named "Authentication"
// which is used for managing authentication state in a Vue.js application.
// At the top of the file, the defineStore function is imported from the Pinia library.
// This function is used to create a new store instance based on a given name and configuration object.
// The Authentication store is created using the defineStore function, with a unique name of "Authentication".
// The configuration object passed to defineStore contains two properties: state and actions.
// The state property is a function that returns an object containing the initial state of the store.
// In this case, the only piece of state defined is isLogged, which is initialized to false.
// This variable is used to keep track of whether the user is logged in or not.
// The actions property is an object that contains methods which can be called to modify the state of the store.
// In this case, there is only one action defined, named setLogStatus.
// This method takes a boolean argument named status and sets the isLogged state variable to the value of status.
// This action can be used to update the authentication status of the user within the store.
// Overall, this code provides a simple implementation of a store for authentication management in a Vue.js app.

import { defineStore } from "pinia"; // Import the `defineStore` function from Pinia library
import axios from "axios"; // Import the `axios` library for making HTTP requests

// Define a store named "Authentication" using the `defineStore` function
export const useAuthenticationStore = defineStore("authentication", {
  // Define the initial state of the store
  state: () => ({
    isLogged: !!localStorage.getItem("auth_token"), // 根据localStorage中的token初始化登录状态
    token: localStorage.getItem("auth_token") || "", // A string to store the authentication token
  }),

  // Define actions that can be used to modify the state of the store
  actions: {
    // This action takes a boolean value as its argument and sets the `isLogged` state variable accordingly
    setLogStatus(status: boolean) {
      this.isLogged = status;
    },
    // This action takes a username and password, sends a login request, and updates the state accordingly
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/user/token', 
          new URLSearchParams({
            username,
            password
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        this.token = response.data.access_token
        localStorage.setItem("auth_token", response.data.access_token)
        this.isLogged = true
      } catch (error: any) {
        this.token = ""
        localStorage.removeItem("auth_token")
        this.isLogged = false
        throw error // 确保错误被传递给调用者
      }
    },
    // This action logs the user out by clearing the token and updating the state
    logout() {
      this.token = "";
      localStorage.removeItem("auth_token");
      this.setLogStatus(false);
    },
    // This action checks the authentication status based on the token
    checkAuth() {
      if (this.token) {
        this.setLogStatus(true);
      } else {
        this.setLogStatus(false);
      }
    },
  },
});
