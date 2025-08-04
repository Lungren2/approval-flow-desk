import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AdminApprovals = () => {
  // Mock data
  const approvals = [
    {
      id: 1,
      requester_name: "John Doe",
      description: "Office supplies purchase",
      amount: 150.00,
      status: "pending",
      submitted_at: "2024-01-15",
      profile_name: "Marketing Profile",
      approver_name: null
    },
    {
      id: 2,
      requester_name: "Jane Smith",
      description: "Software license renewal",
      amount: 500.00,
      status: "approved",
      submitted_at: "2024-01-14",
      profile_name: "IT Profile",
      approver_name: "John Manager"
    },
    {
      id: 3,
      requester_name: "Alice Johnson",
      description: "Marketing campaign budget",
      amount: 1200.00,
      status: "rejected",
      submitted_at: "2024-01-12",
      profile_name: "Marketing Profile",
      approver_name: "Jane Smith"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Approval Requests</h1>
        <p className="text-muted-foreground">View and manage all approval requests across profiles</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Profiles</SelectItem>
            <SelectItem value="marketing">Marketing Profile</SelectItem>
            <SelectItem value="it">IT Profile</SelectItem>
            <SelectItem value="operations">Operations Profile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {approvals.map((approval) => (
          <Card key={approval.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">#{approval.id} - {approval.description}</CardTitle>
                  <CardDescription>
                    Requested by {approval.requester_name} • {approval.profile_name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(approval.status)}>
                    {approval.status}
                  </Badge>
                  <Badge variant="outline">
                    ${approval.amount.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {approval.submitted_at}
                    {approval.approver_name && (
                      <span> • Reviewed by: {approval.approver_name}</span>
                    )}
                  </p>
                </div>
                <Link to={`/approvals/${approval.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminApprovals;