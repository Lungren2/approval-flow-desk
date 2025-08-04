import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ApprovalDetail = () => {
  const { id } = useParams();
  const { hasRole } = useAuth();

  // Mock data
  const request = {
    id: parseInt(id || "1"),
    requester_name: "John Doe",
    description: "Office supplies purchase",
    amount: 150.00,
    status: "pending",
    submitted_at: "2024-01-15T10:30:00Z",
    profile_name: "Marketing Profile",
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

  const canApprove = hasRole('manager') || hasRole('admin');
  const isPending = request.status === 'pending';

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Approval Request #{request.id}</h1>
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

        {canApprove && isPending && (
          <Card>
            <CardHeader>
              <CardTitle>Approval Actions</CardTitle>
              <CardDescription>Review and take action on this request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any notes or comments..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive">
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Delegate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.history.map((entry, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium capitalize">{entry.action}</p>
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
      </div>
    </div>
  );
};

export default ApprovalDetail;