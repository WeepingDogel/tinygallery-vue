// store/UpdateRemarks
// The store has a single property called update which represents the status of the remarks update.
// It has an initial value of 1.
// The store also has a single action called Update which takes a number as its argument and updates the update property by
// adding that number to it.
// This store can be accessed and modified in any component in the Vue application
// using the useStore function provided by Pinia.

import { defineStore } from "pinia"; // Import the "defineStore" function from Pinia

export const UpdateRemarks = defineStore("UpdateRemarks", {
  // Define the "UpdateRemarks" store module
  state: () => ({
    // Define the initial state of the store
    update: 1, // Set the update status to 1 by default
  }),
  actions: {
    // Define the actions that can be performed on the store
    Update(status: number) {
      // Define an action to update the status
      this.update = this.update + status; // Update the status by adding the specified value to it
    },
    ResetUpdate() {
      this.update = 1;
    },
  },
});
