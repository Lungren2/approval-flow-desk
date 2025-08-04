import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UseSessionTimeoutOptions {
  warningTime?: number; // Minutes before expiry to show warning
  idleTime?: number; // Minutes of inactivity before logout
  checkInterval?: number; // How often to check (in seconds)
}

export const useSessionTimeout = (options: UseSessionTimeoutOptions = {}) => {
  const {
    warningTime = 5, // 5 minutes warning
    idleTime = 30, // 30 minutes idle
    checkInterval = 60, // Check every minute
  } = options;

  const { logout, isAuthenticated, refreshToken } = useAuth();
  const { toast } = useToast();
  const lastActivityRef = useRef(Date.now());
  const warningShownRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    warningShownRef.current = false;
  }, []);

  const checkSession = useCallback(async () => {
    if (!isAuthenticated) return;

    const now = Date.now();
    const timeSinceActivity = now - lastActivityRef.current;
    const minutesSinceActivity = timeSinceActivity / (1000 * 60);

    // Check if user has been idle too long
    if (minutesSinceActivity >= idleTime) {
      toast({
        title: 'Session expired',
        description: 'You have been logged out due to inactivity.',
        variant: 'destructive',
      });
      logout();
      return;
    }

    // Show warning if approaching idle timeout
    if (minutesSinceActivity >= (idleTime - warningTime) && !warningShownRef.current) {
      const remainingMinutes = Math.ceil(idleTime - minutesSinceActivity);
      warningShownRef.current = true;
      
      toast({
        title: 'Session expiring soon',
        description: `Your session will expire in ${remainingMinutes} minutes due to inactivity.`,
        variant: 'destructive',
      });
    }

    // Try to refresh token periodically
    try {
      await refreshToken();
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Don't logout immediately, let the API interceptor handle it
    }
  }, [isAuthenticated, idleTime, warningTime, logout, refreshToken, toast]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Set up activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Set up session check interval
    intervalRef.current = setInterval(checkSession, checkInterval * 1000);

    // Initial activity update
    updateActivity();

    return () => {
      // Clean up event listeners
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });

      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, updateActivity, checkSession, checkInterval]);

  return {
    updateActivity,
    checkSession,
  };
};