import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, getUserRole, logout } = useAuth();
  const userRole = getUserRole();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                {user?.display_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Role: <span className="font-medium capitalize">{userRole}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Email: {user?.email}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks for your role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userRole === 'admin' && (
                  <>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Users
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      System Settings
                    </Button>
                  </>
                )}
                {(userRole === 'admin' || userRole === 'manager') && (
                  <Button variant="outline" size="sm" className="w-full">
                    Review Approvals
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  My Requests
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent activity
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;