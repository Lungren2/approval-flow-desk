import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, LoginCredentials, LoginResponse, UserProfile } from '@/types';
import { api, endpoints } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  // Verify token validity on mount
  useEffect(() => {
    if (token && user) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await api.get<User>(endpoints.me);
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('auth_user', JSON.stringify(response.data));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      
      // WordPress JWT login
      const response = await api.post<LoginResponse['data']>(
        endpoints.login,
        credentials
      );

      if (response.success && response.data) {
        const { token, refresh_token, user_display_name } = response.data;
        
        setToken(token);
        localStorage.setItem('auth_token', token);
        
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }

        // Fetch complete user profile
        await fetchUserProfile();

        toast({
          title: 'Login successful',
          description: `Welcome back, ${user_display_name}!`,
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const response = await api.get<User>(endpoints.me);
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('auth_user', JSON.stringify(response.data));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('refresh_token');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const refreshTokenMethod = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post<{ token: string; refresh_token?: string }>(
        endpoints.refresh,
        { refresh_token: refreshToken }
      );

      if (response.success && response.data) {
        const { token, refresh_token } = response.data;
        setToken(token);
        localStorage.setItem('auth_token', token);
        
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  };

  const isAuthenticated = !!user && !!token;

  const hasRole = (role: string): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(userRole => userRole.name === role);
  };

  const hasCapability = (capability: string): boolean => {
    if (!user?.capabilities) return false;
    return user.capabilities.includes(capability);
  };

  const hasProfile = (profileName: string): boolean => {
    if (!user?.profiles) return false;
    return user.profiles.some(profile => profile.name === profileName);
  };

  const getUserProfiles = (): UserProfile[] => {
    return user?.profiles || [];
  };

  const getUserRole = (): string | null => {
    if (!user?.roles || user.roles.length === 0) return null;
    
    // Return highest privilege role (admin > manager > user)
    if (hasRole('admin')) return 'admin';
    if (hasRole('manager')) return 'manager';
    if (hasRole('user')) return 'user';
    
    return user.roles[0].name;
  };

  const getDefaultRoute = (): string => {
    const role = getUserRole();
    switch (role) {
      case 'admin':
        return '/admin';
      case 'manager':
        return '/manager';
      case 'user':
        return '/dashboard';
      default:
        return '/dashboard';
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    hasCapability,
    hasProfile,
    getUserRole,
    getUserProfiles,
    getDefaultRoute,
    refreshToken: refreshTokenMethod,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};