import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RotateCcw, Trash2 } from "lucide-react";

const AdminArchive = () => {
  // Mock data
  const archivedRequests = [
    {
      id: 101,
      requester_name: "Old User",
      description: "Archived office supplies request",
      amount: 75.00,
      status: "approved",
      archived_at: "2023-12-15",
      profile_name: "Legacy Profile"
    },
    {
      id: 102,
      requester_name: "Former Employee",
      description: "Historical equipment purchase",
      amount: 300.00,
      status: "rejected",
      archived_at: "2023-11-20",
      profile_name: "Operations Profile"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Archived Requests</h1>
            <p className="text-muted-foreground">View and restore archived approval requests</p>
          </div>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Bulk Archive Old Requests
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search archived requests..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4">
        {archivedRequests.map((request) => (
          <Card key={request.id} className="opacity-75">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">#{request.id} - {request.description}</CardTitle>
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
                  <Badge variant="secondary">
                    Archived
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Archived: {request.archived_at}
                </span>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminArchive;