'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

export default function MHDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'mh-admin') {
        router.push('/admin');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-cyan-500 mb-6">
        Mental Health Professional Admin Dashboard
      </h1>
      {/* Add MH-specific content */}
    </div>
  );
}