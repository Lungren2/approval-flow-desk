import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

// Base API configuration
const BASE_URL = 'https://www.stmtest.winningformgroup.co.za/wp-json';
const PLUGIN_BASE = '/approval-plugin/v1';
const JWT_AUTH_BASE = '/jwt-auth/v1';

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
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to refresh token
            await this.refreshToken();
            // Retry original request with new token
            const token = localStorage.getItem('auth_token');
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed - logout user
            this.logout();
          }
        }
        
        if (error.response?.status === 401) {
          this.logout();
        }
        
        return Promise.reject(error);
      }
    );
  }

  private logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }

  async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${BASE_URL}${JWT_AUTH_BASE}/token/refresh`, {
        refresh_token: refreshToken
      });

      if (response.data.success && response.data.data) {
        const { token, refresh_token } = response.data.data;
        localStorage.setItem('auth_token', token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
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
  // WordPress JWT Auth
  login: `${JWT_AUTH_BASE}/token`,
  refresh: `${JWT_AUTH_BASE}/token/refresh`,
  validate: `${JWT_AUTH_BASE}/token/validate`,
  me: `${PLUGIN_BASE}/auth/me`,

  // Users
  users: `${PLUGIN_BASE}/users`,
  userProfiles: (userId: number) => `${PLUGIN_BASE}/users/${userId}/profiles`,

  // Approval Requests
  requests: `${PLUGIN_BASE}/requests`,
  myRequests: `${PLUGIN_BASE}/requests/my`,
  pendingApprovals: `${PLUGIN_BASE}/approvals/pending`,
  submitRequest: `${PLUGIN_BASE}/requests/submit`,
  approveRequest: (id: number) => `${PLUGIN_BASE}/requests/${id}/approve`,
  rejectRequest: (id: number) => `${PLUGIN_BASE}/requests/${id}/reject`,
  cancelRequest: (id: number) => `${PLUGIN_BASE}/requests/${id}/cancel`,
  delegateRequest: (id: number) => `${PLUGIN_BASE}/requests/${id}/delegate`,

  // Reference data
  companies: `${PLUGIN_BASE}/reference/companies`,
  departments: `${PLUGIN_BASE}/reference/departments`,
  profiles: `${PLUGIN_BASE}/reference/profiles`,
  managers: `${PLUGIN_BASE}/reference/managers`,

  // History
  requestHistory: (id: number) => `${PLUGIN_BASE}/requests/${id}/history`,
} as const;