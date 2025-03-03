"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const MHPDashboard = ({ userName, email }) => {

  return (
    <DashboardLayout role="mhp" userName={userName} email={email}> 

    </DashboardLayout>
  );
};
