'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AttendeeDashboard() {
    const router = useRouter();

    useEffect(() => {
        const userType = localStorage.getItem("userType");
        if (userType !== "attendee") {
            router.push("/signin"); // Redirect if the user is not an attendee
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to the Attendee Dashboard</h1>
        </div>
    );
}