import axios from 'axios';
import { toast } from 'vue3-toastify';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5231',
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.error || error.message || 'Unknown error';
        toast.error(message, { position: 'top-right', autoClose: 5000 });
        return Promise.reject(error);
    }
);

export default axiosClient;
