import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

// Base API configuration
const BASE_URL = 'https://www.stmtest.winningformgroup.co.za/wp-json/approval-plugin/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic API methods
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete(endpoint, config);
    return response.data;
  }

  // Paginated requests
  async getPaginated<T>(
    endpoint: string,
    params?: { page?: number; per_page?: number; [key: string]: any }
  ): Promise<PaginatedResponse<T>> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }
}

// Export singleton instance
export const api = new ApiClient();

// API endpoint helpers
export const endpoints = {
  // Auth
  login: '/auth/login',
  refresh: '/auth/refresh',
  me: '/auth/me',

  // Users
  users: '/users',
  userProfiles: (userId: number) => `/users/${userId}/profiles`,

  // Approval Requests
  requests: '/requests',
  myRequests: '/requests/my',
  pendingApprovals: '/approvals/pending',
  submitRequest: '/requests/submit',
  approveRequest: (id: number) => `/requests/${id}/approve`,
  rejectRequest: (id: number) => `/requests/${id}/reject`,
  cancelRequest: (id: number) => `/requests/${id}/cancel`,
  delegateRequest: (id: number) => `/requests/${id}/delegate`,

  // Reference data
  companies: '/reference/companies',
  departments: '/reference/departments',
  profiles: '/reference/profiles',
  managers: '/reference/managers',

  // History
  requestHistory: (id: number) => `/requests/${id}/history`,
} as const;