const HomeView = () => import("../views/HomeView.vue");

const HomeRoutes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomeView },
];

export default HomeRoutes;
