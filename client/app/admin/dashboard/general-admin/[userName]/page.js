"use client";
import { use, useEffect, useState} from "react";
import React from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { GeneralAdminDashboard } from "./general-admin-dashboard";

export default function GeneralAdminDashboardPage({ params }) {
  const router = useRouter();
  const { userName } = React.use(params);
  const [authVerified, setAuthVerified] = useState(false);
   const [email, setEmail] = useState(null);
    
      useEffect(() => {
        // Check if localStorage is available (running in the browser)
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedEmail = localStorage.getItem("email");
          // console.log("Email: ", storedEmail);
          setEmail(storedEmail);
        }
      }, []);
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUserName = localStorage.getItem("userName");
    if (!token) {
      router.push('/admin');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "general-admin" || storedUserName !== userName) {
        console.log("UserName: ",localStorage.getItem("userName"));
        router.push('/admin');
        console.log("Role mismatch or name")
      } else {
        setAuthVerified(true);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      console.log("Token error")
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

  return <GeneralAdminDashboard userName={userName} email={email} />;
}
