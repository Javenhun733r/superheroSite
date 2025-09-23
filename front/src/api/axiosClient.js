// axiosClient.js
import axios from 'axios';
import { toast } from 'vue3-toastify'; // прямий імпорт toast

const axiosClient = axios.create({
    baseURL: 'http://localhost:5231',
    timeout: 10000,
});

// Глобальна обробка помилок
axiosClient.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.error || error.message || 'Unknown error';
        toast.error(message, { position: 'top-right', autoClose: 5000 });
        return Promise.reject(error);
    }
);

export default axiosClient;
