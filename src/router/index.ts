// import { createRouter, createWebHistory } from 'vue-router':
// This imports the createRouter() and createWebHistory() functions from the Vue Router library.

// import HomePage from '../views/HomeView.vue':
// This imports the HomeView.vue file from the views folder.

// const router = createRouter({ ... }):
// This creates the router object with the specified configuration.
// It takes an object with two properties: history and routes.

// history: createWebHistory(import.meta.env.BASE_URL),:
// This sets the history mode to "web history" and uses the BASE_URL environment variable to set the base URL of the app.

// routes: [ ... ]:
// This defines an array of route objects which map a URL path to a specific component.

// { path: '/', name: 'home', component: HomePage }:
// This sets the root path to the HomePage component and names it 'home'.

// { path: '/login', name: 'login', component: () => import('../views/AuthView.vue') }:
// This sets the /login path to the AuthView component and names it 'login'.
// The component is loaded lazily using the import() function.

// { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') }:
// This sets the /about path to the AboutView component and names it 'about'.
// The component is loaded lazily using the import() function.

// { path: '/profile', name: 'Profile', component: () => import('../views/ProfileView.vue') }:
// This sets the /profile path to the ProfileView component and names it 'Profile'.
// The component is loaded lazily using the import() function.

// { path: '/remark/:post_uuid', name: 'Remark', component: () => import('../views/RemarkView.vue') }:
// This sets the /remark path with a dynamic parameter named post_uuid to the RemarkView component and names it 'Remark'.
// The component is loaded lazily using the import() function.

// export default router: This exports the router object as the default export.

// Import the necessary functions from vue-router
import { createRouter, createWebHistory } from "vue-router";
// Import the different views for each page
import HomePage from "../views/HomeView.vue";

// Define the router object
const router = createRouter({
  // Use web history API to maintain browser history
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Define the home page route
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      // Define the login page route
      path: "/login",
      name: "login",
      component: () => import("../views/AuthView.vue"),
    },
    {
      // Define the about page route
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      // Define the profile page route
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      // Define the remark page route with a dynamic parameter
      path: "/remark/:post_uuid",
      name: "Remark",
      component: () => import("../views/RemarkView.vue"),
    },
    {
      path: "/admin",
      name: "Administration",
      component: () => import("../views/AdminView.vue"),
    },
  ],
});

export default router;
