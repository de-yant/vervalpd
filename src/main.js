import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);

window.onerror = (_message, _source, _lineno, _colno, error) => {
  console.error("Global window error:", error);
};

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise rejection:", event.reason);
});

app.use(createPinia()).use(router).mount("#app");
