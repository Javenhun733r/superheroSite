import axios from 'axios';
import notyf from "@/plugins/notyf.js";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.error || error.message || 'Unknown error';
        notyf.error(message);
        return Promise.reject(error);
    }
);

export default axiosClient;
