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
  // Authentication & User Info
  login: `${PLUGIN_BASE}/login`,
  userMe: `${PLUGIN_BASE}/user/me`,
  user: (id: number) => `${PLUGIN_BASE}/user/${id}`,

  // Approvals (Request Lifecycle)
  approvals: `${PLUGIN_BASE}/approvals`,
  approval: (id: number) => `${PLUGIN_BASE}/approvals/${id}`,
  approveApproval: (id: number) => `${PLUGIN_BASE}/approvals/${id}/approve`,
  cancelApproval: (id: number) => `${PLUGIN_BASE}/approvals/${id}/cancel`,
  grantEditApproval: (id: number) => `${PLUGIN_BASE}/approvals/${id}/grant-edit`,
  resubmitApproval: (id: number) => `${PLUGIN_BASE}/approvals/${id}/resubmit`,
  restoreApproval: (id: number) => `${PLUGIN_BASE}/approvals/${id}/restore`,
  archiveApprovals: `${PLUGIN_BASE}/approvals/archive`,

  // Reference Data (Scoped by Profile)
  refCompanies: `${PLUGIN_BASE}/ref/companies`,
  refBranches: `${PLUGIN_BASE}/ref/branches`,
  refDepartments: `${PLUGIN_BASE}/ref/departments`,
  refCategories: `${PLUGIN_BASE}/ref/categories`,
  refSuppliers: `${PLUGIN_BASE}/ref/suppliers`,
  refProjects: `${PLUGIN_BASE}/ref/projects`,
  refRequesters: `${PLUGIN_BASE}/ref/requesters`,
  refPaymentMethods: `${PLUGIN_BASE}/ref/payment-methods`,
  refApprovalStatuses: `${PLUGIN_BASE}/ref/approval-statuses`,

  // Profile Assignment
  assignProfile: `${PLUGIN_BASE}/profiles/assign`,
  revokeProfile: `${PLUGIN_BASE}/profiles/revoke`,

  // Order Number Validation (WooCommerce Checkout)
  validateOrder: `${PLUGIN_BASE}/validate-order`,
} as const;