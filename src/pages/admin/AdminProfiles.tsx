import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AdminProfiles = () => {
  // Mock data
  const profiles = [
    {
      id: 1,
      name: "Marketing Profile",
      description: "Marketing department approval profile",
      company_name: "Acme Corp",
      department_name: "Marketing",
      assigned_manager: "Jane Smith",
      user_count: 5,
      is_active: true
    },
    {
      id: 2,
      name: "IT Profile",
      description: "IT department approval profile",
      company_name: "Acme Corp",
      department_name: "IT",
      assigned_manager: "John Manager",
      user_count: 8,
      is_active: true
    },
    {
      id: 3,
      name: "Operations Profile",
      description: "Operations department profile",
      company_name: "Acme Corp",
      department_name: "Operations",
      assigned_manager: "Jane Smith",
      user_count: 12,
      is_active: false
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Profile Management</h1>
            <p className="text-muted-foreground">Manage approval profiles and whitelist mappings</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Profile
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search profiles..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <CardDescription>
                    {profile.description}
                  </CardDescription>
                </div>
                <Badge variant={profile.is_active ? "default" : "secondary"}>
                  {profile.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{profile.company_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">{profile.department_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Assigned Manager</p>
                  <p className="text-sm text-muted-foreground">{profile.assigned_manager}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Users Assigned</p>
                  <p className="text-sm text-muted-foreground">{profile.user_count} users</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/admin/profiles/${profile.id}`}>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Users
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProfiles;