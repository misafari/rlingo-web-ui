import axios from 'axios';

const BASE_API_URL: string = import.meta.env.APP_BACKEND_BASE_URL;

const api = axios.create({
    httpsAgent: {
        rejectUnauthorized: false,
        requestCert: false,
    },
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
