"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AttendeeDashboard } from './attendee-dashboard';
import { MHPDashboard } from './mhp-dashboard';
export default function DashboardPage({ params }) {
  const router = useRouter();
  const [userType, setUserType] = useState(null);
  const { role, userName } = React.use(params);
  useEffect(() => {
    const verifyAuth = () => {
      const storedRole = localStorage.getItem("userType");
      const storedUserName = localStorage.getItem("userName");

      if (!storedRole || !storedUserName) {
        router.push("/signin");
        return;
      }

      if (storedRole !== role || storedUserName !== userName) {
        router.push("/signin");
      } else {
        setUserType(storedRole);
      }
    };

    verifyAuth();
  }, [router, role, userName]);

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      {userType === 'attendee' && <AttendeeDashboard userName={userName} />}
      {userType === 'mhp' && <MHPDashboard userName={userName} />}
    </>
  );
}