"use client";
import { AdminDashboardLayout } from "@/app/admin/components/AdminDashboardLayout";

export const MHAdminDashboard = ({ userName ,email}) => {
  return (
    <AdminDashboardLayout role="mh-admin" userName={userName} email={email}>
      <h1 className="text-3xl font-bold text-cyan-500">Mental Health Admin Dashboard</h1>
      {/* Add MH-specific content here */}
    </AdminDashboardLayout>
  );
};
