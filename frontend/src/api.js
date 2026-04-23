import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (name, email, password, confirmPassword) =>
  api.post('/auth/register', { name, email, password, confirmPassword });

export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password });

export const getMe = () => api.get('/auth/me');

// Item APIs
export const createItem = (itemData) =>
  api.post('/items', itemData);

export const getAllItems = () =>
  api.get('/items');

export const getItem = (id) =>
  api.get(`/items/${id}`);

export const searchItems = (name, category) => {
  let params = {};
  if (name) params.name = name;
  if (category) params.category = category;
  return api.get('/items/search', { params });
};

export const updateItem = (id, itemData) =>
  api.put(`/items/${id}`, itemData);

export const deleteItem = (id) =>
  api.delete(`/items/${id}`);

export const getUserItems = () =>
  api.get('/items/user/my-items');

export default api;
