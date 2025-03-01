"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AdminDashboardLayout = ({ children, role, userName }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/admin');
  };

  const navItems = {
    "general-admin": [
      { 
        name: "Dashboard", 
        href: "#dashboard", 
        onClick: (e) => { e.preventDefault(); setActiveSection("dashboard"); } 
      },
      // Add more navigation items for general-admin as needed
      { 
        name: "Logout", 
        href: "#logout",
        onClick: (e) => { e.preventDefault(); handleLogout(); } 
      }
    ],
    "mh-admin": [
      { 
        name: "Dashboard", 
        href: "#dashboard", 
        onClick: (e) => { e.preventDefault(); setActiveSection("dashboard"); } 
      },
      // Add more navigation items for mh-admin as needed
      { 
        name: "Logout", 
        href: "#logout",
        onClick: (e) => { e.preventDefault(); handleLogout(); } 
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gray-800 text-white">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-sm">{role} Dashboard</p>
        </div>
        <nav>
          <ul className="space-y-4">
            {navItems[role].map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  onClick={item.onClick} 
                  className="hover:underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};
