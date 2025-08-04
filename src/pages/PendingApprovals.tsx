import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const PendingApprovals = () => {
  // Mock data
  const pendingRequests = [
    {
      id: 1,
      requester_name: "John Doe",
      description: "Office supplies purchase",
      amount: 150.00,
      submitted_at: "2024-01-15",
      profile_name: "Marketing Profile"
    },
    {
      id: 2,
      requester_name: "Jane Smith",
      description: "Software license renewal",
      amount: 500.00,
      submitted_at: "2024-01-14",
      profile_name: "IT Profile"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Pending Approvals</h1>
        <p className="text-muted-foreground">Review requests awaiting your approval</p>
      </div>

      <div className="grid gap-4">
        {pendingRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.description}</CardTitle>
                  <CardDescription>
                    Requested by {request.requester_name} • {request.profile_name}
                  </CardDescription>
                </div>
                <Badge className="bg-yellow-500">
                  ${request.amount.toFixed(2)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Submitted: {request.submitted_at}
                </span>
                <div className="flex gap-2">
                  <Link to={`/approvals/${request.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;