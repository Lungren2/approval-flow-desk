import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, XCircle, Clock, Edit, Copy, FileText } from "lucide-react";
import { useRequestDetail, useCancelRequest, useResubmitRequest } from "@/hooks/useApprovals";
import { createRequestSchema, CreateRequestFormData } from "@/lib/validations";
import { CreateRequestForm } from "@/types";
import { useToast } from "@/hooks/use-toast";

const RequestDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const requestId = parseInt(id || "0");
  const isEditMode = searchParams.get("edit") === "true";
  const [showEditForm, setShowEditForm] = useState(isEditMode);
  
  const { data: request, isLoading } = useRequestDetail(requestId);
  const cancelRequest = useCancelRequest();
  const resubmitRequest = useResubmitRequest();

  const form = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      profile_id: request?.profile_id || 1,
      amount: request?.amount || 0,
      description: request?.description || "",
      supporting_docs: [],
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      case 'needs_revision': return 'bg-orange-500 text-white';
      case 'cancelled': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'needs_revision':
        return <Edit className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleCancelRequest = async () => {
    if (!request) return;
    
    if (confirm("Are you sure you want to cancel this request?")) {
      try {
        await cancelRequest.mutateAsync(request.id);
        navigate("/my-requests");
      } catch (error) {
        // Error is handled by the mutation
      }
    }
  };

  const handleResubmit = async (data: CreateRequestFormData) => {
    if (!request) return;
    
    try {
      const requestData: CreateRequestForm = {
        profile_id: data.profile_id,
        amount: data.amount,
        description: data.description,
        supporting_docs: data.supporting_docs,
      };
      
      await resubmitRequest.mutateAsync({ id: request.id, data: requestData });
      setShowEditForm(false);
      navigate("/my-requests");
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const copyOrderNumber = () => {
    if (request?.order_number) {
      navigator.clipboard.writeText(request.order_number);
      toast({
        title: "Copied!",
        description: "Order number copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading request details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Request not found</h3>
          <p className="text-muted-foreground mb-4">
            The request you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => navigate("/my-requests")}>
            Back to My Requests
          </Button>
        </div>
      </div>
    );
  }

  const canEdit = request.status === 'needs_revision';
  const canCancel = request.status === 'pending';
  const isApproved = request.status === 'approved';

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Request #{request.id}</h1>
            <p className="text-muted-foreground">Submitted by {request.requester_name}</p>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {getStatusIcon(request.status)}
            <span className="ml-1">{request.status.replace('_', ' ').toUpperCase()}</span>
          </Badge>
        </div>

        {/* Order Number Card (for approved requests) */}
        {isApproved && request.order_number && (
          <Card className="border-success bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Request Approved!
              </CardTitle>
              <CardDescription>
                Your purchase request has been approved. Use the order number below at checkout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Order Number</p>
                  <p className="text-2xl font-mono font-bold">{request.order_number}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use this code at WooCommerce checkout. Valid for one-time use only.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={copyOrderNumber}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status-specific messages */}
        {request.status === 'needs_revision' && (
          <Card className="border-orange-500 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Edit className="w-5 h-5" />
                Changes Requested
              </CardTitle>
              <CardDescription>
                Your manager has requested changes to this approval request. Please review and resubmit.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            {canEdit && !showEditForm && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowEditForm(true)}
                className="w-fit"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Request
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {showEditForm && canEdit ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleResubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (R)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0.01"
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your purchase request..." 
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={resubmitRequest.isPending}
                    >
                      {resubmitRequest.isPending ? "Resubmitting..." : "Resubmit Request"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowEditForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Amount</Label>
                    <p className="text-sm text-muted-foreground mt-1">R{request.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Profile</Label>
                    <p className="text-sm text-muted-foreground mt-1">{request.profile_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submitted</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(request.submitted_at).toLocaleDateString()} at{" "}
                      {new Date(request.submitted_at).toLocaleTimeString()}
                    </p>
                  </div>
                  {request.approver_name && (
                    <div>
                      <Label className="text-sm font-medium">Approver</Label>
                      <p className="text-sm text-muted-foreground mt-1">{request.approver_name}</p>
                    </div>
                  )}
                  {request.approved_at && (
                    <div>
                      <Label className="text-sm font-medium">Approved</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(request.approved_at).toLocaleDateString()} at{" "}
                        {new Date(request.approved_at).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
                
                {request.supporting_docs && (
                  <div>
                    <Label className="text-sm font-medium">Supporting Documents</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{request.supporting_docs}</span>
                    </div>
                  </div>
                )}
                
                {request.approval_notes && (
                  <div>
                    <Label className="text-sm font-medium">Approval Notes</Label>
                    <p className="text-sm text-muted-foreground mt-1">{request.approval_notes}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.history?.map((entry, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {getStatusIcon(entry.action)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium capitalize">{entry.action.replace('_', ' ')}</p>
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleDateString()} at{" "}
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">by {entry.actor_name}</p>
                    {entry.notes && (
                      <p className="text-sm mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
              )) || (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Submitted</p>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.submitted_at).toLocaleDateString()} at{" "}
                        {new Date(request.submitted_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">by {request.requester_name}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {(canCancel || canEdit) && !showEditForm && (
          <div className="flex gap-4">
            {canEdit && (
              <Button 
                variant="outline" 
                onClick={() => setShowEditForm(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Request
              </Button>
            )}
            {canCancel && (
              <Button 
                variant="destructive" 
                onClick={handleCancelRequest}
                disabled={cancelRequest.isPending}
              >
                {cancelRequest.isPending ? "Cancelling..." : "Cancel Request"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;