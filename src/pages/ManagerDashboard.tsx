import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground">Approval management and team oversight</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Pending Approvals
                <Badge variant="destructive">5</Badge>
              </CardTitle>
              <CardDescription>
                Requests waiting for your approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="default" size="sm" className="w-full">
                Review Pending
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Approval History
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Bulk Actions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Requests</CardTitle>
              <CardDescription>
                Monitor your team's approval requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                All Team Requests
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                By Department
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Request Trends
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common management tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Create Request
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                My Requests
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Delegate Approval
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Approvals</CardTitle>
              <CardDescription>
                Your latest approval decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Office Supplies</p>
                    <p className="text-xs text-muted-foreground">$250.00</p>
                  </div>
                  <Badge variant="default" className="bg-green-500">Approved</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Software License</p>
                    <p className="text-xs text-muted-foreground">$1,200.00</p>
                  </div>
                  <Badge variant="destructive">Rejected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
              <CardDescription>
                Your managed profiles and departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Managed Profiles</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Requests</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">45</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approval Settings</CardTitle>
              <CardDescription>
                Manage your approval preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Notification Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Approval Limits
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Delegation Rules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;