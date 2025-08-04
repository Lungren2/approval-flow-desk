import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const AdminReferenceData = () => {
  const { type } = useParams();

  // Mock data based on type
  const getReferenceData = () => {
    switch (type) {
      case 'companies':
        return [
          { id: 1, name: "Acme Corp", code: "ACME", is_active: true },
          { id: 2, name: "Partner Corp", code: "PART", is_active: true },
          { id: 3, name: "Legacy Corp", code: "LEG", is_active: false }
        ];
      case 'departments':
        return [
          { id: 1, name: "Marketing", company: "Acme Corp", is_active: true },
          { id: 2, name: "IT", company: "Acme Corp", is_active: true },
          { id: 3, name: "Operations", company: "Partner Corp", is_active: true }
        ];
      case 'suppliers':
        return [
          { id: 1, name: "Office Depot", category: "Office Supplies", is_active: true },
          { id: 2, name: "Tech Solutions Inc", category: "Technology", is_active: true },
          { id: 3, name: "Legacy Supplier", category: "Equipment", is_active: false }
        ];
      default:
        return [];
    }
  };

  const data = getReferenceData();
  const title = type?.charAt(0).toUpperCase() + type?.slice(1) || 'Reference Data';

  const getColumns = () => {
    switch (type) {
      case 'companies':
        return ['Name', 'Code', 'Status'];
      case 'departments':
        return ['Name', 'Company', 'Status'];
      case 'suppliers':
        return ['Name', 'Category', 'Status'];
      default:
        return ['Name', 'Status'];
    }
  };

  const renderRow = (item: any) => {
    switch (type) {
      case 'companies':
        return (
          <>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">Code: {item.code}</p>
            </div>
            <Badge variant={item.is_active ? "default" : "secondary"}>
              {item.is_active ? "Active" : "Inactive"}
            </Badge>
          </>
        );
      case 'departments':
        return (
          <>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.company}</p>
            </div>
            <Badge variant={item.is_active ? "default" : "secondary"}>
              {item.is_active ? "Active" : "Inactive"}
            </Badge>
          </>
        );
      case 'suppliers':
        return (
          <>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <Badge variant={item.is_active ? "default" : "secondary"}>
              {item.is_active ? "Active" : "Inactive"}
            </Badge>
          </>
        );
      default:
        return (
          <>
            <p className="font-medium">{item.name}</p>
            <Badge variant={item.is_active ? "default" : "secondary"}>
              {item.is_active ? "Active" : "Inactive"}
            </Badge>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage {title}</h1>
            <p className="text-muted-foreground">Add, edit, and manage {type} reference data</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add {title.slice(0, -1)}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Search ${type}...`} className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4">
        {data.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  {renderRow(item)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
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

export default AdminReferenceData;