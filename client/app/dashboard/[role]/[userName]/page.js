"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AttendeeDashboard from './attendee-dashboard';
import MHPDashboard from './mhp-dashboard';

export default function DashboardPage({ params }) {
    const { role, userName } = React.use(params);
    const router = useRouter();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        // Get the user role and userName from localStorage
        const storedRole = localStorage.getItem("userType");
        const storedUserName = localStorage.getItem("userName");

        // If the role or userName doesn't match, redirect to sign-in
        if (storedRole !== role || storedUserName !== userName) {
            router.push("/signin");
        } else {
            setUserType(storedRole); // Set the user role
        }
    }, [router, role, userName]);

    // Conditionally render the appropriate dashboard based on role
    if (userType === "attendee") {
        return <AttendeeDashboard userName={userName} />;
    } else if (userType === "mhp") {
        return <MHPDashboard userName={userName} />;
    }

    // Loading state if user role is not determined yet
    return <div>Loading...</div>;
}