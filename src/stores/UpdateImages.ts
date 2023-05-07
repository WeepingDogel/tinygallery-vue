// stores/UpdateImages
// This code defines a Pinia store named "UpdateImages" 
// which is used for managing image update status in a Vue.js application.
// The defineStore function is imported from the Pinia library at the top of the file. 
// This function creates a new store instance based on a given name and configuration object.
// The UpdateImages store is created using the defineStore function, with a unique name of "UpdateImage". 
// The configuration object passed to defineStore contains two properties: state and actions.
// The state property is a function that returns an object containing the initial state of the store. 
// In this case, the only piece of state defined is update, which is initialized to 1. 
// This variable is used to keep track of the current update status of the images.
// The actions property is an object that contains methods which can be called to modify the state of the store. 
// In this case, there is only one action defined, named Update. 
// This method takes a number argument named status and updates the update state variable by adding the status value to it. 
// This action can be used to update the image status within the store.
// Overall, this code provides a simple implementation of a store for image update management in a Vue.js app.

import { defineStore } from "pinia"; // Import the `defineStore` function from Pinia

// Define a Pinia store named "UpdateImages"
export const UpdateImages = defineStore('UpdateImage', {

    // Define the initial state of the store
    state: () => ({
        update: 1 // A number representing the current update status of the images
    }),

    // Define actions that can be used to modify the state of the store
    actions: {
        // This action takes a number value as its argument and updates the `update` state variable accordingly
        Update(status: number) {
            this.update = this.update + status;
        }
    }
});


