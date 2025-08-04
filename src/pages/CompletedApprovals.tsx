import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const CompletedApprovals = () => {
  // Mock data
  const completedRequests = [
    {
      id: 3,
      requester_name: "Alice Johnson",
      description: "Marketing campaign budget",
      amount: 1200.00,
      status: "approved",
      completed_at: "2024-01-12",
      profile_name: "Marketing Profile"
    },
    {
      id: 4,
      requester_name: "Bob Wilson",
      description: "Equipment purchase",
      amount: 800.00,
      status: "rejected",
      completed_at: "2024-01-10",
      profile_name: "Operations Profile"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Completed Approvals</h1>
        <p className="text-muted-foreground">View requests you have previously reviewed</p>
      </div>

      <div className="grid gap-4">
        {completedRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.description}</CardTitle>
                  <CardDescription>
                    Requested by {request.requester_name} • {request.profile_name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <Badge variant="outline">
                    ${request.amount.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Completed: {request.completed_at}
                </span>
                <Link to={`/approvals/${request.id}`}>
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

export default CompletedApprovals;