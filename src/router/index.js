import { createRouter, createWebHistory } from "vue-router";

import home from "../views/home.vue";

const routes = [{ path: "/", name: "home", component: home }];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
