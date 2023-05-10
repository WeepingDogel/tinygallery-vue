// This code is using the Pinia library to define a reactive store named UpdateReplies. 
// A store is a simple object that contains reactive state and methods to modify that state. 
// Stores are commonly used in Vue.js applications to manage global state.

// The defineStore function from the Pinia library is used to create the UpdateReplies store. 
// It takes two arguments: the name of the store (a string), and an object containing the store's state and actions.

// In this case, the state object contains a single property named update, which is initialized to 1. 
// The actions object contains a single method named Update. 
// This method takes a number parameter named status, and it increments the update property of the store's state by status.

// Importing the defineStore function from the Pinia library
import { defineStore } from "pinia";

// Defining a store named UpdateReplies using the defineStore function
export const UpdateReplies = defineStore(
    // The name of the store is 'UpdateReplies'
    'UpdateReplies',
    {
        // The state object contains reactive data for the store
        state: () => ({
            update: 1
        }),
        // The actions object contains methods to modify the state
        actions: {
            // The Update action takes a number parameter named status
            Update(status: number) {
                // The update property of the state is incremented by status
                this.update = this.update + status
            }
        }
    }
)
