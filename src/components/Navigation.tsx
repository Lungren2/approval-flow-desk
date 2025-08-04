import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Settings,
  FileCheck,
  Plus,
  List,
  BarChart3,
  LogOut,
  User,
  Shield,
  ChevronDown,
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout, hasRole, getUserRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userRole = getUserRole();

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navigationItems = [
    // Admin items
    ...(hasRole('admin') ? [
      {
        label: 'Admin Dashboard',
        href: '/admin',
        icon: Shield,
        roles: ['admin'],
      },
      {
        label: 'Users',
        href: '/admin/users',
        icon: Users,
        roles: ['admin'],
      },
      {
        label: 'Profiles',
        href: '/admin/profiles',
        icon: Settings,
        roles: ['admin'],
      },
    ] : []),
    
    // Manager items
    ...(hasRole('manager') || hasRole('admin') ? [
      {
        label: 'Pending Approvals',
        href: '/approvals/pending',
        icon: FileCheck,
        roles: ['manager', 'admin'],
      },
      {
        label: 'Completed Approvals',
        href: '/approvals/completed',
        icon: List,
        roles: ['manager', 'admin'],
      },
    ] : []),
    
    // User items (available to all)
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: User,
      roles: ['user', 'manager', 'admin'],
    },
    {
      label: 'Submit Request',
      href: '/submit',
      icon: Plus,
      roles: ['user', 'manager', 'admin'],
    },
    {
      label: 'My Requests',
      href: '/my-requests',
      icon: List,
      roles: ['user', 'manager', 'admin'],
    },
  ];

  const filteredItems = navigationItems.filter(item =>
    item.roles.some(role => hasRole(role))
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary"></div>
              <span className="text-lg font-semibold">Approval System</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Role Badge */}
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {userRole}
            </Badge>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url} alt={user.display_name} />
                    <AvatarFallback>{getInitials(user.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user.display_name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url} alt={user.display_name} />
                    <AvatarFallback>{getInitials(user.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.display_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                
                {/* Mobile navigation items */}
                <div className="md:hidden">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link to={item.href} className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;