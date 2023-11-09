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

// Define a store named "Authentication" using the `defineStore` function
export const Authentication = defineStore("Authentication", {
  // Define the initial state of the store
  state: () => ({
    isLogged: false, // A boolean value to indicate whether the user is logged in or not
  }),

  // Define actions that can be used to modify the state of the store
  actions: {
    // This action takes a boolean value as its argument and sets the `isLogged` state variable accordingly
    setLogStatus(status: boolean) {
      this.isLogged = status;
    },
  },
});
