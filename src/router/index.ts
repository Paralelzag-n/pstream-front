import { createRouter, createWebHistory } from "vue-router";
import AuthenticationRoutes from "./authentication.route";

const HomeView = () => import("../views/HomeView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AuthenticationRoutes,
    { path: "/home", name: "home", component: HomeView },
  ],
});

export default router;
