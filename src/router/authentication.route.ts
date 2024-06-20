const registerView = () => import("../views/RegisterView.vue");
const signInView = () => import("../views/SignInView.vue");

const AuthenticationRoutes = [
  { path: "/sign-in", name: "sign-in", component: signInView },
  { path: "/sign-up", name: "sign-up", component: registerView },
];

export default AuthenticationRoutes;
