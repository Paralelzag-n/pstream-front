import { createApp } from "vue";
import "./styles/style.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
const app = createApp(App);

app.use(router).use(pinia);

app.mount("#app");
