import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me')
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } })
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`)
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getById: (id) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get('/orders'),
  getAllOrders: () => api.get('/admin/orders'),
  updateStatus: (id, status) => api.put(`/admin/orders/${id}`, { status }),
  validatePromo: (data) => api.post('/orders/validate-promo', data)
};

// Promo Codes API
export const promoAPI = {
  getAll: () => api.get('/admin/promo-codes'),
  create: (data) => api.post('/admin/promo-codes', data),
  update: (id, data) => api.put(`/admin/promo-codes/${id}`, data),
  delete: (id) => api.delete(`/admin/promo-codes/${id}`),
  validate: (code) => api.get(`/promo-codes/${code}`)
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/admin/users'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.post('/users/change-password', data)
};

export default api;
