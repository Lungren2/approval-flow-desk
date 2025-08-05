import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, endpoints } from '@/lib/api';
import { ApprovalRequest, CreateRequestForm, ApprovalActionForm, ReferenceData } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const approvalKeys = {
  all: ['approvals'] as const,
  myRequests: () => [...approvalKeys.all, 'my-requests'] as const,
  request: (id: number) => [...approvalKeys.all, 'request', id] as const,
  pendingApprovals: () => [...approvalKeys.all, 'pending'] as const,
  completedApprovals: () => [...approvalKeys.all, 'completed'] as const,
};

// Reference Data Query Keys
export const refDataKeys = {
  all: ['reference-data'] as const,
  companies: () => [...refDataKeys.all, 'companies'] as const,
  branches: () => [...refDataKeys.all, 'branches'] as const,
  departments: () => [...refDataKeys.all, 'departments'] as const,
  categories: () => [...refDataKeys.all, 'categories'] as const,
  suppliers: () => [...refDataKeys.all, 'suppliers'] as const,
  projects: () => [...refDataKeys.all, 'projects'] as const,
  requesters: () => [...refDataKeys.all, 'requesters'] as const,
  paymentMethods: () => [...refDataKeys.all, 'payment-methods'] as const,
  approvalStatuses: () => [...refDataKeys.all, 'approval-statuses'] as const,
};

// Hooks for My Requests (User perspective)
export const useMyRequests = () => {
  return useQuery({
    queryKey: approvalKeys.myRequests(),
    queryFn: async () => {
      const response = await api.get<ApprovalRequest[]>(endpoints.approvals);
      return response.data || [];
    },
  });
};

export const useRequestDetail = (id: number) => {
  return useQuery({
    queryKey: approvalKeys.request(id),
    queryFn: async () => {
      const response = await api.get<ApprovalRequest>(endpoints.approval(id));
      return response.data;
    },
    enabled: !!id,
  });
};

// Reference Data Hooks
export const useCompanies = () => {
  return useQuery({
    queryKey: refDataKeys.companies(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refCompanies);
      return response.data || [];
    },
  });
};

export const useBranches = () => {
  return useQuery({
    queryKey: refDataKeys.branches(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refBranches);
      return response.data || [];
    },
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: refDataKeys.departments(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refDepartments);
      return response.data || [];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: refDataKeys.categories(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refCategories);
      return response.data || [];
    },
  });
};

export const useSuppliers = () => {
  return useQuery({
    queryKey: refDataKeys.suppliers(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refSuppliers);
      return response.data || [];
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: refDataKeys.projects(),
    queryFn: async () => {
      const response = await api.get<ReferenceData[]>(endpoints.refProjects);
      return response.data || [];
    },
  });
};

export const useRequesters = () => {
  return useQuery({
    queryKey: refDataKeys.requesters(),
    queryFn: async () => {
      const response = await api.get(endpoints.refRequesters);
      return response.data || [];
    },
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: refDataKeys.paymentMethods(),
    queryFn: async () => {
      const response = await api.get(endpoints.refPaymentMethods);
      return response.data || [];
    },
  });
};

// Mutation Hooks
export const useSubmitRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateRequestForm) => {
      const response = await api.post<ApprovalRequest>(endpoints.approvals, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: approvalKeys.myRequests() });
      toast({
        title: 'Request Submitted',
        description: `Your approval request #${data?.id} has been submitted successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Submission Failed',
        description: error.response?.data?.message || 'Failed to submit request',
        variant: 'destructive',
      });
    },
  });
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post(endpoints.cancelApproval(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: approvalKeys.myRequests() });
      toast({
        title: 'Request Cancelled',
        description: 'Your request has been cancelled successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Cancellation Failed',
        description: error.response?.data?.message || 'Failed to cancel request',
        variant: 'destructive',
      });
    },
  });
};

export const useResubmitRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CreateRequestForm }) => {
      const response = await api.post(endpoints.resubmitApproval(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: approvalKeys.myRequests() });
      toast({
        title: 'Request Resubmitted',
        description: 'Your changes have been submitted for approval.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Resubmission Failed',
        description: error.response?.data?.message || 'Failed to resubmit request',
        variant: 'destructive',
      });
    },
  });
};