import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "./style.css";
import "daisyui/dist/full.css";
import { useAuthenticationStore } from "@/stores/Authentication";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthenticationStore();
authStore.checkAuth();

app.mount("#app");
