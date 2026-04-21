import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

export const createOrder = async (orderRequest) => {
    return axios.post(`${API_URL}/orders`, orderRequest);
};
