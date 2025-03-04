"use client";
import { useEffect, useState} from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import { MHAdminDashboard } from "./mh-admin-dashboard";

export default function MHAdminDashboardPage({ params }) {
  const router = useRouter();
  const { userName } = React.use(params);
  const [authVerified, setAuthVerified] = useState(false);
  
  useEffect(() => {
 const token = localStorage.getItem('accessToken');
  const decoded = jwtDecode(token);
  console.log(decoded);
  const storedUserName = localStorage.getItem("userName");
    
    if (!token) {
      router.push('/admin');
      return;
    }
    try {
      if (decoded.role !== "mh-admin" || storedUserName !== userName) {
        router.push('/admin');
        
      } else {
    
        setAuthVerified(true);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      router.push('/admin');
    }
  }, [router, userName]);

  if (!authVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return <MHAdminDashboard userName={userName} />;
}
