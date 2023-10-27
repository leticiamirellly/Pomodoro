import { createApp } from "vue";
import Toast from "vue-toastification";
import "@/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(Toast, { transition: "Vue-Toastification__fade" })
  .mount("#app");
