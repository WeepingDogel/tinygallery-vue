// 1. The code imports the necessary dependencies:
// defineStore from the Pinia library, axios for making HTTP requests,
// and moment-timezone for working with timezones.

// 2. The Timezone store is defined using defineStore.
// It has two properties in its state:
// TimeZoneServer and TimeZoneBrowser,
// which will store the timezone of the server and the timezone of the browser, respectively.

// 3. The GetTheTimeZoneOfServer action is responsible for retrieving the timezone of the server.
// It makes an HTTP GET request to the /userdata/get/timezone endpoint using axios.
// Upon a successful response,
// the server's timezone is extracted from the response data and stored in the TimeZoneServer property.
// The timezone is also logged to the console. If there's an error, the error details are returned.

// 4. The GetTheLocalTimeZone action is responsible for retrieving the timezone of the browser.
// It uses the Intl.DateTimeFormat().resolvedOptions().timeZone method to obtain the browser's timezone
// and stores it in the TimeZoneBrowser property.
// The timezone is also logged to the console.

// 5. The CaculateTheCorrectDate action takes an original date as input
// and calculates the correct date based on the original date,
// server's timezone, and browser's timezone.
// It first creates a moment object using the original date and the server's timezone (this.TimeZoneServer).
// Then, it clones the moment object and converts it to the browser's timezone (this.TimeZoneBrowser).
// Finally, it formats the date as "YYYY-MM-DD HH:mm" and returns the formatted date.

// Overall, this code allows you to retrieve and manage the timezones of both the server and the browser,
// and perform calculations to ensure that dates are displayed correctly based on the respective timezones.

import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment-timezone";

export const Timezone = defineStore("TimeZone", {
  state: () => ({
    TimeZoneServer: "", // Stores the timezone of the server
    TimeZoneBrowser: "", // Stores the timezone of the browser
  }),
  actions: {
    // Retrieves the timezone of the server
    GetTheTimeZoneOfServer() {
      axios
        .get("/userdata/get/timezone")
        .then((response) => {
          // console.log(response);
          this.TimeZoneServer = response.data; // Sets the server's timezone based on the response data
          console.log(this.TimeZoneServer);
        })
        .catch((error) => {
          // console.log(error);
          return error.detail; // Returns the error details if there's an error
        });
    },
    // Retrieves the timezone of the browser
    GetTheLocalTimeZone() {
      const TimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Gets the timezone of the browser
      this.TimeZoneBrowser = TimeZone; // Sets the browser's timezone
      console.log(this.TimeZoneBrowser);
    },
    // Manually sets the timezone of the server
    SetTimeZoneServer(timeZone: string) {
      this.TimeZoneServer = timeZone;
    },
    // Calculates the correct date based on the original date, server's timezone, and browser's timezone
    CaculateTheCorrectDate(OriginalDate: String) {
      const dateString = OriginalDate;
      return moment
        .tz(dateString, this.TimeZoneServer) // Converts the original date to the server's timezone
        .clone()
        .tz(this.TimeZoneBrowser) // Converts the date to the browser's timezone
        .format("YYYY-MM-DD HH:mm"); // Formats the date as "YYYY-MM-DD HH:mm"
    },
  },
});
