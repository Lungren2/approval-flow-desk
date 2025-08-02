import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your approval requests</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Create New Request
                <Badge variant="outline">Quick Action</Badge>
              </CardTitle>
              <CardDescription>
                Submit a new approval request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="default" className="w-full">
                New Request
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>
                View and track your submitted requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                All Requests
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Pending Review
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Completed
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
              <CardDescription>
                Overview of your request statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Pending</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Approved</span>
                  <Badge variant="default" className="bg-green-500">12</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Rejected</span>
                  <Badge variant="destructive">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>
                Your latest submission activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Marketing Materials</p>
                    <p className="text-xs text-muted-foreground">$450.00 - 2 days ago</p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Team Equipment</p>
                    <p className="text-xs text-muted-foreground">$2,100.00 - 1 week ago</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Approved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your account and profile details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Department</span>
                  <span className="font-medium text-sm">Marketing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Company</span>
                  <span className="font-medium text-sm">Acme Corp</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Profile</span>
                  <span className="font-medium text-sm">Standard User</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
              <CardDescription>
                Need assistance with requests?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Request Guidelines
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;