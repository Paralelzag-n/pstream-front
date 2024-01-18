import RegisterViewVue from "../views/RegisterView.vue";
const registerView = () => import("../views/RegisterView.vue");
const signInView = () => import("../views/SignInView.vue");

const AuthenticationRoutes = [
  { path: "/", redirect: "/sign-in" },
  { path: "/sign-in", name: "sign-in", component: signInView },
  { path: "/sign-up", name: "sign-up", component: registerView },
];

export default AuthenticationRoutes;
