import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedRoute from "@/components/RoleBasedRoute";
import Layout from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Requester pages
import SubmitRequest from "./pages/SubmitRequest";
import MyRequests from "./pages/MyRequests";
import RequestDetail from "./pages/RequestDetail";

// Manager pages
import PendingApprovals from "./pages/PendingApprovals";
import CompletedApprovals from "./pages/CompletedApprovals";
import ApprovalDetail from "./pages/ApprovalDetail";

// Admin pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfiles from "./pages/admin/AdminProfiles";
import ProfileDetail from "./pages/admin/ProfileDetail";
import AdminApprovals from "./pages/admin/AdminApprovals";
import AdminArchive from "./pages/admin/AdminArchive";
import AdminAuditLog from "./pages/admin/AdminAuditLog";
import AdminReferenceData from "./pages/admin/AdminReferenceData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Requester UI */}
              <Route path="/submit" element={
                <ProtectedRoute>
                  <SubmitRequest />
                </ProtectedRoute>
              } />
              <Route path="/my-requests" element={
                <ProtectedRoute>
                  <MyRequests />
                </ProtectedRoute>
              } />
              <Route path="/my-requests/:id" element={
                <ProtectedRoute>
                  <RequestDetail />
                </ProtectedRoute>
              } />
              
              {/* Manager UI */}
              <Route path="/approvals/pending" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="manager">
                    <PendingApprovals />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/approvals/completed" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="manager">
                    <CompletedApprovals />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/approvals/:id" element={
                <ProtectedRoute>
                  <ApprovalDetail />
                </ProtectedRoute>
              } />
              
              {/* Admin UI */}
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminUsers />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/profiles" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminProfiles />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/profiles/:id" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <ProfileDetail />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/approvals" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminApprovals />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/archive" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminArchive />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/audit-log" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminAuditLog />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              <Route path="/admin/reference-data/:type" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminReferenceData />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              
              {/* Role-based dashboards */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="admin">
                    <AdminDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/manager" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="manager">
                    <ManagerDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              
              <Route path="/user" element={
                <ProtectedRoute>
                  <RoleBasedRoute requiredRole="user">
                    <UserDashboard />
                  </RoleBasedRoute>
                </ProtectedRoute>
              } />
              
              {/* Default dashboard - accessible to all authenticated users */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
