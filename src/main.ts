import { createApp } from 'vue'       // Importing the createApp function from Vue.
import { createPinia } from 'pinia'   // Importing the createPinia function from Pinia.

import App from './App.vue'          // Importing the main component of the application.
import router from './router'        // Importing the router object that holds all the routes for the app.

import './assets/main.css'           // Importing the main stylesheet for the application.

const app = createApp(App)           // Creating a new Vue application instance using the main component.

app.use(createPinia())               // Adding the Pinia state management plugin to the Vue app.
app.use(router)                      // Adding the router object to the Vue app.

app.mount('#app')                    // Mounting the Vue app to the DOM element with ID "app".


// The provided JavaScript code imports two functions, createApp() and createPinia(), from two different libraries, Vue and Pinia respectively. The createApp() function is used to create a new Vue instance, as specified by the App variable which is set to point to the main component of the application.

// The use() method is called on the Vue instance twice. Once with the createPinia() function, which adds the Pinia state management plugin to the Vue app. The second time with the router object, which adds routing capabilities to the Vue app.
