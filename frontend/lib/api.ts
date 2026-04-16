import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('elixiraToken') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetcher(url: string) {
  const response = await api.get(url);
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post('/users/login', { email, password });
  return response.data;
}

export async function registerUser(name: string, email: string, password: string) {
  const response = await api.post('/users/register', { name, email, password });
  return response.data;
}

export function fetchProducts(params?: Record<string, string | number | boolean>) {
  return api.get('/products', { params });
}

export function fetchProductById(id: string) {
  return api.get(`/products/${id}`);
}

export function createOrder(payload: unknown) {
  return api.post('/orders', payload);
}

export function fetchPaymentIntent(payload: { amount: number }) {
  return api.post('/orders/payment-intent', payload);
}

export function fetchMyOrders() {
  return api.get('/orders/myorders');
}

export function fetchUserProfile() {
  return api.get('/users/profile');
}

export function updateUserProfile(payload: { name: string; email: string; password?: string }) {
  return api.put('/users/profile', payload);
}

export default api;
