"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const AttendeeDashboard = ({ userName, email }) => {
  

  return (
    <DashboardLayout role="attendee" userName={userName} email={email}>
      
    </DashboardLayout>
  );
};
