import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import Navigation from './Navigation';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Initialize session timeout management
  useSessionTimeout({
    warningTime: 5, // 5 minutes warning
    idleTime: 30, // 30 minutes idle timeout
    checkInterval: 60, // Check every minute
  });

  // Don't show navigation for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {children || <Outlet />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;