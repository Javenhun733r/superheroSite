import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import {FontAwesomeIcon} from "@/plugins/FontAwesome";
import notyfPlugin from "@/plugins/notyf.js"
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use(notyfPlugin)
    .mount('#app');
