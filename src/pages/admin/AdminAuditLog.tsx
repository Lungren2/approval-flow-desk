import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const AdminAuditLog = () => {
  // Mock data
  const auditEntries = [
    {
      id: 1,
      action: "REQUEST_SUBMITTED",
      actor_name: "John Doe",
      target: "Request #123",
      details: "Submitted office supplies request for $150.00",
      timestamp: "2024-01-15T10:30:00Z",
      ip_address: "192.168.1.100"
    },
    {
      id: 2,
      action: "REQUEST_APPROVED",
      actor_name: "Jane Smith",
      target: "Request #122",
      details: "Approved software license request for $500.00",
      timestamp: "2024-01-15T09:15:00Z",
      ip_address: "192.168.1.101"
    },
    {
      id: 3,
      action: "USER_PROFILE_ASSIGNED",
      actor_name: "System Admin",
      target: "User: Alice Johnson",
      details: "Assigned Marketing Profile to user",
      timestamp: "2024-01-15T08:45:00Z",
      ip_address: "192.168.1.102"
    },
    {
      id: 4,
      action: "REQUEST_REJECTED",
      actor_name: "John Manager",
      target: "Request #121",
      details: "Rejected equipment purchase request for $800.00 - Insufficient justification",
      timestamp: "2024-01-14T16:20:00Z",
      ip_address: "192.168.1.103"
    }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'REQUEST_SUBMITTED': return 'bg-blue-500';
      case 'REQUEST_APPROVED': return 'bg-green-500';
      case 'REQUEST_REJECTED': return 'bg-red-500';
      case 'USER_PROFILE_ASSIGNED': return 'bg-purple-500';
      case 'REQUEST_CANCELLED': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatAction = (action: string) => {
    return action.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Audit Log</h1>
        <p className="text-muted-foreground">Read-only log of all system activities and changes</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search audit entries..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="request">Request Actions</SelectItem>
            <SelectItem value="user">User Actions</SelectItem>
            <SelectItem value="profile">Profile Actions</SelectItem>
            <SelectItem value="system">System Actions</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {auditEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Badge className={getActionColor(entry.action)}>
                    {formatAction(entry.action)}
                  </Badge>
                  <div>
                    <CardTitle className="text-base">{entry.target}</CardTitle>
                    <CardDescription>by {entry.actor_name}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm mb-2">{entry.details}</p>
              <p className="text-xs text-muted-foreground">
                IP Address: {entry.ip_address}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAuditLog;