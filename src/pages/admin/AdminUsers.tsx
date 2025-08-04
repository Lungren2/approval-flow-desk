import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Edit } from "lucide-react";

const AdminUsers = () => {
  // Mock data
  const users = [
    {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
      display_name: "John Doe",
      roles: ["user"],
      profiles: ["Marketing Profile"],
      is_active: true
    },
    {
      id: 2,
      username: "janesmith",
      email: "jane@example.com",
      display_name: "Jane Smith",
      roles: ["manager"],
      profiles: ["IT Profile", "Operations Profile"],
      is_active: true
    },
    {
      id: 3,
      username: "admin",
      email: "admin@example.com",
      display_name: "System Admin",
      roles: ["admin"],
      profiles: [],
      is_active: true
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'manager': return 'bg-blue-500';
      case 'user': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage user roles and profile assignments</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{user.display_name}</CardTitle>
                  <CardDescription>
                    {user.username} • {user.email}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role} className={getRoleColor(role)}>
                      {role}
                    </Badge>
                  ))}
                  <Badge variant={user.is_active ? "default" : "secondary"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Assigned Profiles:</p>
                  <p className="text-sm text-muted-foreground">
                    {user.profiles.length > 0 ? user.profiles.join(", ") : "No profiles assigned"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;