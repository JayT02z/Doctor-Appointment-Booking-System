// src/services/authService.js
import axios from 'axios';

export const loginWithCredentials = async (data) => {
    return axios.post('http://localhost:8080/api/v1/auth/login', data);
};

export const loginWithGoogle = async (token) => {
    return axios.post('http://localhost:8080/api/v1/auth/oauth2/success', { token });
};