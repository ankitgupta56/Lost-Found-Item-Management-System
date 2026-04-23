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

export const authService = {
  register: (name, email, password, confirmPassword) =>
    api.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me')
};

export const itemService = {
  createItem: (itemData) =>
    api.post('/items', itemData),
  getAllItems: () =>
    api.get('/items'),
  getItem: (id) =>
    api.get(`/items/${id}`),
  searchItems: (name, category) =>
    api.get(`/items/search?name=${name || ''}&category=${category || ''}`),
  updateItem: (id, itemData) =>
    api.put(`/items/${id}`, itemData),
  deleteItem: (id) =>
    api.delete(`/items/${id}`),
  getUserItems: () =>
    api.get('/items/user/my-items')
};

export default api;
