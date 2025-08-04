import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SubmitRequest = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Submit New Approval Request</CardTitle>
            <CardDescription>
              Create a new approval request with required details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profile">Profile</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profile1">Profile 1</SelectItem>
                  <SelectItem value="profile2">Profile 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your request..." 
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="documents">Supporting Documents</Label>
              <Input id="documents" type="file" multiple />
            </div>
            
            <Button className="w-full">Submit Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitRequest;