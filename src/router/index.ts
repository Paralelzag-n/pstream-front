import { createRouter, createWebHistory } from "vue-router";
import AuthenticationRoutes from "./authentication.route";
import HomeRoutes from "./home.route.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [...AuthenticationRoutes, ...HomeRoutes],
});

export default router;
