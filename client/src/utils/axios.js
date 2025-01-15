/**
 * Axios instance configured with a base URL and an interceptor for handling authorization.
 * 
 * @module utils/axios
 */

import axios from 'axios';
import refreshToken from './auth';

/**
 * Axios instance with a base URL of '/api'.
 * 
 * @constant {AxiosInstance} api
 */
const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(
    /**
     * Interceptor to add Authorization header with Bearer token to each request.
     * If the access token is not available in localStorage, it attempts to refresh the token.
     * 
     * @param {AxiosRequestConfig} config - The Axios request configuration object.
     * @returns {Promise<AxiosRequestConfig>} The modified Axios request configuration object.
     */
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            accessToken = await refreshToken();
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    /**
     * Error handler for request interceptor.
     * 
     * @param {any} error - The error object.
     * @returns {Promise<never>} A rejected promise with the error.
     */
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    /**
     * Interceptor to handle responses and retry requests with a refreshed token if a 401 error occurs.
     * 
     * @param {AxiosResponse} response - The Axios response object.
     * @returns {AxiosResponse} The Axios response object.
     */
    (response) => {
        return response;
    },
    /**
     * Error handler for response interceptor.
     * If a 401 error occurs, it attempts to refresh the token and retry the original request.
     * 
     * @param {any} error - The error object.
     * @returns {Promise<AxiosResponse | never>} A promise that resolves with the Axios response object or rejects with the error.
     */
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;