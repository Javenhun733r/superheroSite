import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { toast } from 'vue3-toastify';
import {FontAwesomeIcon} from "@/plugins/FontAwesome";
createApp(App).component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use((Vue3Toastify, {
        autoClose: 3000,
        position: 'top-right',
        pauseOnHover: true,
        hideProgressBar: false
    }))
    .mount('#app');
export {toast};
