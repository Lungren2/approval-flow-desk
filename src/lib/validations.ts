import { z } from 'zod';

// Login form validation
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Create request form validation
export const createRequestSchema = z.object({
  profile_id: z.number().min(1, 'Profile is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description too long'),
  supporting_docs: z.array(z.instanceof(File)).optional(),
});

// Approval action form validation
export const approvalActionSchema = z.object({
  action: z.enum(['approve', 'reject', 'delegate'], {
    required_error: 'Action is required',
  }),
  notes: z.string().max(500, 'Notes too long').optional(),
  delegate_to_id: z.number().optional(),
}).refine(
  (data) => {
    // If delegating, delegate_to_id is required
    if (data.action === 'delegate') {
      return data.delegate_to_id && data.delegate_to_id > 0;
    }
    return true;
  },
  {
    message: 'Manager selection is required when delegating',
    path: ['delegate_to_id'],
  }
);

// User profile update validation
export const userProfileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required'),
  email: z.string().email('Invalid email address'),
});

// Export types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateRequestFormData = z.infer<typeof createRequestSchema>;
export type ApprovalActionFormData = z.infer<typeof approvalActionSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;