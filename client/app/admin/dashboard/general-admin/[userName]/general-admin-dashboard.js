"use client";
import { AdminDashboardLayout } from "@/app/admin/components/AdminDashboardLayout";

export const GeneralAdminDashboard = ({ userName, email}) => {
  return (
    <AdminDashboardLayout role="general-admin" userName={userName} email={email}>
      <h1 className="text-3xl font-bold text-blue-500">General Admin Dashboard</h1>
      {/* Add additional general-admin content here */}
    </AdminDashboardLayout>
  );
};
