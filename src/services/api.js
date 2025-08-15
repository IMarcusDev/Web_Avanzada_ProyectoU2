import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            hasToken: !!token
        });
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            console.warn('Token inválido o expirado, limpiando sesión...');
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;