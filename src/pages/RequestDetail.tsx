import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const RequestDetail = () => {
  const { id } = useParams();

  // Mock data
  const request = {
    id: parseInt(id || "1"),
    description: "Office supplies purchase",
    amount: 150.00,
    status: "pending",
    submitted_at: "2024-01-15T10:30:00Z",
    profile_name: "Marketing Profile",
    requester_name: "John Doe",
    supporting_docs: "receipt.pdf",
    history: [
      { action: "submitted", actor: "John Doe", timestamp: "2024-01-15T10:30:00Z", notes: "Initial submission" }
    ]
  };

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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Request #{request.id}</h1>
            <p className="text-muted-foreground">Submitted by {request.requester_name}</p>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Amount</label>
                <p className="text-sm text-muted-foreground">${request.amount.toFixed(2)}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Profile</label>
                <p className="text-sm text-muted-foreground">{request.profile_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Submitted</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(request.submitted_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {request.supporting_docs && (
              <div>
                <label className="text-sm font-medium">Supporting Documents</label>
                <p className="text-sm text-muted-foreground">{request.supporting_docs}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.history.map((entry, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{entry.action}</p>
                    <p className="text-sm text-muted-foreground">by {entry.actor}</p>
                    {entry.notes && <p className="text-sm">{entry.notes}</p>}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {request.status === 'pending' && (
          <div className="flex gap-4">
            <Button variant="outline">Edit Request</Button>
            <Button variant="destructive">Cancel Request</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;