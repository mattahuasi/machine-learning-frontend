import "./assets/main.css";
import "vue3-toastify/dist/index.css";
import "vue-final-modal/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { createVfm } from "vue-final-modal";
import Vue3Toasity from "vue3-toastify";
import App from "./App.vue";
import router from "./router";
import * as HiIcons from "oh-vue-icons/icons/hi";

const app = createApp(App);
const vfm = createVfm();
const Hi = Object.values({ ...HiIcons });

addIcons(...Hi);

app.use(createPinia());
app.use(router);
app.use(Vue3Toasity);
app.use(vfm);
app.component("v-icon", OhVueIcon);

app.mount("#app");
