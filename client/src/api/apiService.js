import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';
// Create an Axios instance
const api= axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token) {
            config.headers['Authorization'] = 'Bearer ${token}';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication calls

export const loginUser = (credentials) => {
    return api.post('/auth/login', credentials);
};

export const signUser = (userData) => {
    return api.post('/auth/signup', userData);
};

export const loginWithGoogle = (tokenResponse) => {
    // It will credential from Google to your backend for verification

    return api.post('/auth/google', {token: tokenResponse.credentials});

};

// Chat calls
export const sendMessage = (message) => {
    return api.post('/chat', {message});
};

export const getChatHistory = () => {
    return api.get('/chat/history');
};

export default api;