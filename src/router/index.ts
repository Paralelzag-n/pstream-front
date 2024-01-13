import { createRouter, createWebHistory } from "vue-router";
import AuthenticationRoutes from "./authentication.route";

const router = createRouter({
  history: createWebHistory(),
  routes: [...AuthenticationRoutes],
});

export default router;
