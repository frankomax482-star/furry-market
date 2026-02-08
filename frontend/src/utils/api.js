import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  registerPhone: (data) => api.post('/auth/register/phone', data),
  loginPhone: (data) => api.post('/auth/login/phone', data),
  authGoogle: (data) => api.post('/auth/auth/google', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId, params) => api.get(`/products/category/${categoryId}`, { params }),
  getRecommended: () => api.get('/products/recommended/top'),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  validatePromo: (data) => api.post('/orders/validate-promo', data),
};

// Admin API
export const adminAPI = {
  addProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getAllProducts: () => api.get('/admin/products'),
  
  addCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
  
  addAdmin: (data) => api.post('/admin/admins', data),
  getAllAdmins: () => api.get('/admin/admins'),
  removeAdmin: (id) => api.delete(`/admin/admins/${id}`),
  
  createPromo: (data) => api.post('/admin/promos', data),
  getAllPromos: () => api.get('/admin/promos'),
  updatePromo: (id, data) => api.put(`/admin/promos/${id}`, data),
  deletePromo: (id) => api.delete(`/admin/promos/${id}`),
  
  getDashboardStats: () => api.get('/admin/stats/dashboard'),
};

// Promo API
export const promoAPI = {
  getAll: () => api.get('/promos'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  toggleTheme: (theme) => api.put('/users/theme', { theme }),
};

export default api;
