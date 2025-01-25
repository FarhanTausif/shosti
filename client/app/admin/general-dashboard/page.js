'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

export default function GeneralDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'general-admin') {
        router.push('/admin');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        General Admin Dashboard
      </h1>
      {/* Add dashboard content */}
    </div>
  );
}