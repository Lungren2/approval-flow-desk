// Core data models for the approval workflow system

export interface User {
  id: number;
  wordpress_id: number;
  email: string;
  display_name: string;
  roles: UserRole[];
  profiles: UserProfile[];
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: number;
  name: 'user' | 'manager' | 'admin';
  capabilities: string[];
}

export interface UserProfile {
  id: number;
  user_id: number;
  profile_id: number;
  profile_name: string;
  department_id?: number;
  company_id?: number;
  is_active: boolean;
}

export interface Company {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

export interface Department {
  id: number;
  name: string;
  company_id: number;
  company_name: string;
  is_active: boolean;
}

export interface Profile {
  id: number;
  name: string;
  description?: string;
  company_id: number;
  department_id?: number;
  assigned_manager_id?: number;
  is_active: boolean;
}

export interface ApprovalRequest {
  id: number;
  requester_id: number;
  requester_name: string;
  profile_id: number;
  profile_name: string;
  amount: number;
  description: string;
  supporting_docs?: string;
  status: ApprovalStatus;
  approver_id?: number;
  approver_name?: string;
  approval_notes?: string;
  submitted_at: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'needs_revision';

export interface ApprovalHistory {
  id: number;
  request_id: number;
  action: 'submitted' | 'approved' | 'rejected' | 'cancelled' | 'delegated' | 'edited';
  actor_id: number;
  actor_name: string;
  notes?: string;
  timestamp: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// Form types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateRequestForm {
  profile_id: number;
  amount: number;
  description: string;
  supporting_docs?: File[];
}

export interface ApprovalActionForm {
  action: 'approve' | 'reject' | 'delegate';
  notes?: string;
  delegate_to_id?: number;
}

// Auth types
export interface AuthUser {
  user: User;
  token: string;
  expires_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}