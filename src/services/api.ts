import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Custom error class
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  verifyEmail: (data: any) => api.post('/auth/verify-email', data),
  verifyPhone: (data: any) => api.post('/auth/verify-phone', data),
  googleAuth: (data: any) => api.post('/auth/google', data),
  linkedinAuth: (data: any) => api.post('/auth/linkedin', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  uploadAvatar: (file: FormData) => api.post('/users/avatar', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUsers: (params?: any) => api.get('/users', { params }),
  getUserById: (id: string) => api.get(`/users/${id}`),
};

// Product API
export const productAPI = {
  getProducts: (params?: any) => api.get('/products', { params }),
  getProductById: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  addReview: (id: string, review: any) => api.post(`/products/${id}/reviews`, review),
  getLocationBasedProducts: (location: any) => api.get('/products/location', { params: location }),
};

// Order API
export const orderAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getOrders: (params?: any) => api.get('/orders', { params }),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
  trackOrder: (orderNumber: string) => api.get(`/orders/track/${orderNumber}`),
  cancelOrder: (id: string, reason: string) => api.put(`/orders/${id}/cancel`, { reason }),
};

// Trainer API
export const trainerAPI = {
  getTrainers: (params?: any) => api.get('/trainers', { params }),
  getTrainerById: (id: string) => api.get(`/trainers/${id}`),
  applyAsTrainer: (data: any) => api.post('/trainers/apply', data),
  updateAvailability: (data: any) => api.put('/trainers/availability', data),
  getTrainerStats: () => api.get('/trainers/stats'),
};

// Consultation API
export const consultationAPI = {
  getConsultations: (params?: any) => api.get('/consultations', { params }),
  createConsultation: (data: any) => api.post('/consultations', data),
  getConsultationById: (id: string) => api.get(`/consultations/${id}`),
  updateConsultation: (id: string, data: any) => api.put(`/consultations/${id}`, data),
  joinConsultation: (id: string) => api.post(`/consultations/${id}/join`),
  endConsultation: (id: string) => api.post(`/consultations/${id}/end`),
  addFeedback: (id: string, feedback: any) => api.post(`/consultations/${id}/feedback`, feedback),
};

// Payment API
export const paymentAPI = {
  createAccessOrder: () => api.post('/payments/create-access-order'),
  verifyAccessPayment: (data: any) => api.post('/payments/verify-access-payment', data),
  createProductOrder: (data: any) => api.post('/payments/create-product-order', data),
  verifyProductPayment: (data: any) => api.post('/payments/verify-product-payment', data),
  createConsultationOrder: (consultationId: string) => 
    api.post('/payments/create-consultation-order', { consultationId }),
  verifyConsultationPayment: (data: any) => api.post('/payments/verify-consultation-payment', data),
  getPaymentHistory: (params?: any) => api.get('/payments/history', { params }),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  updateUserStatus: (id: string, status: any) => api.put(`/admin/users/${id}/status`, status),
  getProducts: (params?: any) => api.get('/admin/products', { params }),
  approveProduct: (id: string) => api.put(`/admin/products/${id}/approve`),
  getOrders: (params?: any) => api.get('/admin/orders', { params }),
  getTrainers: (params?: any) => api.get('/admin/trainers', { params }),
  approveTrainer: (id: string) => api.put(`/admin/trainers/${id}/approve`),
  getConsultations: (params?: any) => api.get('/admin/consultations', { params }),
  getPayments: (params?: any) => api.get('/admin/payments', { params }),
  sendNotification: (data: any) => api.post('/admin/notifications', data),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: FormData) => api.post('/upload/image', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadDocument: (file: FormData) => api.post('/upload/document', file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Quote submission function
export const submitQuoteData = async (data: any, config: any) => {
  try {
    const response = await fetch(config.makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new ApiError('Failed to submit quote data', response.status);
    }

    return response.json();
  } catch (error) {
    console.error('Quote submission error:', error);
    throw error instanceof ApiError ? error : new ApiError('Network error occurred');
  }
};

// GHL submission function
export const sendToGHL = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('business_name', data.businessName || '');
    formData.append('employee_count', data.employeeCount?.toString() || '0');
    formData.append('is_vat_registered', data.isVatRegistered?.toString() || 'false');
    formData.append('total_fee', data.totalFee?.toString() || '0');
    formData.append('business_type', data.businessType || '');

    const response = await fetch('https://api.gohighlevel.com/v1/forms/submit', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError('Failed to submit to GHL', response.status);
    }

    return response.json();
  } catch (error) {
    console.error('GHL submission error:', error);
    throw error instanceof ApiError ? error : new ApiError('GHL submission failed');
  }
};

export default api;