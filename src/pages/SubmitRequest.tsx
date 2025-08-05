import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createRequestSchema, CreateRequestFormData } from "@/lib/validations";
import { CreateRequestForm } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { 
  useSubmitRequest, 
  useCompanies, 
  useBranches, 
  useDepartments, 
  useCategories, 
  useSuppliers, 
  useProjects 
} from "@/hooks/useApprovals";

const SubmitRequest = () => {
  const navigate = useNavigate();
  const { getUserProfiles } = useAuth();
  const userProfiles = getUserProfiles();
  
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  
  // Fetch reference data based on user's profiles
  const { data: companies = [] } = useCompanies();
  const { data: branches = [] } = useBranches();
  const { data: departments = [] } = useDepartments();
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();
  const { data: projects = [] } = useProjects();
  
  const submitRequest = useSubmitRequest();
  
  const form = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      profile_id: 1,
      amount: 0,
      description: "",
      supporting_docs: [],
    },
  });

  const onSubmit = async (data: CreateRequestFormData) => {
    try {
      // Convert the form data to the API format
      const requestData: CreateRequestForm = {
        profile_id: data.profile_id,
        company_id: data.company_id,
        branch_id: data.branch_id,
        department_id: data.department_id,
        category_id: data.category_id,
        supplier_id: data.supplier_id,
        project_id: data.project_id,
        amount: data.amount,
        description: data.description,
        supporting_docs: data.supporting_docs,
      };
      
      await submitRequest.mutateAsync(requestData);
      navigate("/my-requests");
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Submit New Purchase Request</CardTitle>
            <CardDescription>
              Create a new approval request with required details. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="profile_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile *</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          const profileId = parseInt(value);
                          field.onChange(profileId);
                          setSelectedProfileId(profileId);
                        }} 
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your profile" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {userProfiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.profile_id.toString()}>
                              {profile.profile_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(companies) && companies.map((company) => (
                          <SelectItem key={company.id} value={company.id.toString()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(branches) && branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id.toString()}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(departments) && departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(categories) && categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(suppliers) && suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id.toString()}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project">Project (Optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(projects) && projects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (R) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0.01"
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your purchase request in detail..." 
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                  <Input 
                    id="documents" 
                    type="file" 
                    multiple 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      form.setValue("supporting_docs", files);
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload receipts, quotes, or other supporting documents
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitRequest.isPending}
                >
                  {submitRequest.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitRequest;