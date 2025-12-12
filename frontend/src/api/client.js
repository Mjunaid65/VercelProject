import axios from 'axios';

// Use relative URL in production (same domain), or VITE_API_URL if set, or localhost for dev
const getBaseURL = () => {
  // If VITE_API_URL is set (at build time), use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If running in production (on Vercel), use relative URL
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // Development: use localhost
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL()
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

