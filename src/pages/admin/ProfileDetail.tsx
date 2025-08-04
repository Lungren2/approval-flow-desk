import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const ProfileDetail = () => {
  const { id } = useParams();

  // Mock data
  const profile = {
    id: parseInt(id || "1"),
    name: "Marketing Profile",
    description: "Marketing department approval profile",
    company_name: "Acme Corp",
    department_name: "Marketing",
    assigned_manager: "Jane Smith",
    is_active: true,
    requesters: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Alice Johnson", email: "alice@example.com" }
    ],
    whitelists: {
      companies: ["Acme Corp", "Partner Corp"],
      departments: ["Marketing", "Sales"],
      categories: ["Office Supplies", "Marketing Materials"],
      suppliers: ["Supplier A", "Supplier B"],
      projects: ["Project Alpha", "Project Beta"],
      payment_methods: ["Credit Card", "Bank Transfer"]
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.description}</p>
          </div>
          <Badge variant={profile.is_active ? "default" : "secondary"}>
            {profile.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="settings">Profile Settings</TabsTrigger>
            <TabsTrigger value="requesters">Requesters</TabsTrigger>
            <TabsTrigger value="whitelists">Whitelists</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Configuration</CardTitle>
                <CardDescription>Basic profile settings and assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Profile Name</Label>
                    <Input id="name" value={profile.name} />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Select value={profile.company_name}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                        <SelectItem value="Partner Corp">Partner Corp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={profile.department_name}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="manager">Assigned Manager</Label>
                    <Select value={profile.assigned_manager}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        <SelectItem value="John Manager">John Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requesters">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Requesters</CardTitle>
                <CardDescription>Users who can submit requests using this profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.requesters.map((requester) => (
                    <div key={requester.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <p className="font-medium">{requester.name}</p>
                        <p className="text-sm text-muted-foreground">{requester.email}</p>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  ))}
                  <Button>Add Requester</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whitelists">
            <div className="space-y-6">
              {Object.entries(profile.whitelists).map(([type, items]) => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="capitalize">{type.replace('_', ' ')}</CardTitle>
                    <CardDescription>
                      Allowed {type.replace('_', ' ')} for this profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Manage {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileDetail;