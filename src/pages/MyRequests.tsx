import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const MyRequests = () => {
  // Mock data
  const requests = [
    {
      id: 1,
      description: "Office supplies purchase",
      amount: 150.00,
      status: "pending",
      submitted_at: "2024-01-15",
      profile_name: "Marketing Profile"
    },
    {
      id: 2,
      description: "Software license renewal",
      amount: 500.00,
      status: "approved",
      submitted_at: "2024-01-10",
      profile_name: "IT Profile"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Requests</h1>
        <p className="text-muted-foreground">View and manage your submitted approval requests</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.description}</CardTitle>
                  <CardDescription>
                    {request.profile_name} • ${request.amount.toFixed(2)}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Submitted: {request.submitted_at}
                </span>
                <Link to={`/my-requests/${request.id}`}>
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

export default MyRequests;