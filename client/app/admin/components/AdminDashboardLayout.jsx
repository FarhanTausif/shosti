// "use client";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export const AdminDashboardLayout = ({ children, role, userName }) => {
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState("dashboard");

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     router.push('/admin');
//   };

//   const navItems = {
//     "general-admin": [
//       { 
//         name: "Dashboard", 
//         href: "#dashboard", 
//         onClick: (e) => { e.preventDefault(); setActiveSection("dashboard"); } 
//       },
//       // Add more navigation items for general-admin as needed
//       { 
//         name: "Logout", 
//         href: "#logout",
//         onClick: (e) => { e.preventDefault(); handleLogout(); } 
//       }
//     ],
//     "mh-admin": [
//       { 
//         name: "Dashboard", 
//         href: "#dashboard", 
//         onClick: (e) => { e.preventDefault(); setActiveSection("dashboard"); } 
//       },
//       // Add more navigation items for mh-admin as needed
//       { 
//         name: "Logout", 
//         href: "#logout",
//         onClick: (e) => { e.preventDefault(); handleLogout(); } 
//       }
//     ]
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 p-6 bg-gray-800 text-white">
//         <div className="mb-6">
//           <h2 className="text-xl font-bold">{userName}</h2>
//           <p className="text-sm">{role} Dashboard</p>
//         </div>
//         <nav>
//           <ul className="space-y-4">
//             {navItems[role].map((item, index) => (
//               <li key={index}>
//                 <a 
//                   href={item.href} 
//                   onClick={item.onClick} 
//                   className="hover:underline"
//                 >
//                   {item.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>
//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {children}
//       </main>
//     </div>
//   );
// };
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// // Import your section components for General Admin
// import {DashboardContent} from "../components/general-admin/Dashboard"; // For "Dashboard" section
// import {AttendeeInformation} from "../components/general-admin/AttendeeInformation"; // For "Attendees Information"
// import {MHPInformation} from "../components/general-admin/MHPInformation"; // For "MHP Information"
// import {SessionsInformation} from "../components/general-admin/SessionsInformation"; // For "Sessions Information"

// export const AdminDashboardLayout = ({ children, role, userName, email }) => {
//   const router = useRouter();
//   // Default to "dashboard" section for admin
//   const [activeSection, setActiveSection] = useState("dashboard");

//   const handleSectionChange = (e, section) => {
//     e.preventDefault();
//     setActiveSection(section);
//     router.push(`/admin/dashboard/${role}/${userName}/#${section}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     router.push("/admin");
//   };

//   const navItems = {
//     "general-admin": [
//       { name: "Dashboard", href: "#dashboard", onClick: (e) => handleSectionChange(e, "dashboard") },
//       { name: "Attendees Information", href: "#attendees", onClick: (e) => handleSectionChange(e, "attendees") },
//       { name: "MHP Information", href: "#mhp", onClick: (e) => handleSectionChange(e, "mhp") },
//       { name: "Sessions Information", href: "#sessions", onClick: (e) => handleSectionChange(e, "sessions") },
//       { name: "Logout", href: "#logout", onClick: (e) => { e.preventDefault(); handleLogout(); } },
//     ],
//     "mh-admin": [
//       { name: "Dashboard", href: "#dashboard", onClick: (e) => handleSectionChange(e, "dashboard") },
//       { name: "Logout", href: "#logout", onClick: (e) => { e.preventDefault(); handleLogout(); } }
//     ]
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/60 p-6 sticky top-0 h-screen">
//         <div className="mb-8 p-2">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
//             {userName}
//           </h2>
//           <p className="text-sm text-slate-500 capitalize mt-1">{role} Dashboard</p>
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             {navItems[role].map((item) => (
//               <li key={item.href}>
//                 <a
//                   href={item.href}
//                   onClick={item.onClick}
//                   className="flex items-center p-3 text-slate-600 rounded-xl hover:bg-indigo-50/50 transition-all duration-300 hover:-translate-x-1 hover:text-indigo-600 group"
//                 >
//                   <span className="mr-2 opacity-70 group-hover:opacity-100">•</span>
//                   {item.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 shadow-sm">
//           {role === "general-admin" && activeSection === "dashboard" && <DashboardContent userName={userName} />}
//           {role === "general-admin" && activeSection === "attendees" && <AttendeeInformation userName={userName} />}
//           {role === "general-admin" && activeSection === "mhp" && <MHPInformation userName={userName} />}
//           {role === "general-admin" && activeSection === "sessions" && <SessionsInformation userName={userName} />}
//           {role === "mh-admin" && activeSection === "dashboard" && children}
//         </div>
//       </main>
//     </div>
//   );
// };
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import your section components for General Admin
import { DashboardContent } from "../components/general-admin/Dashboard"; // For "Dashboard" section
import { AttendeeInformation } from "../components/general-admin/AttendeeInformation"; // For "Attendees Information"
import { MHPInformation } from "../components/general-admin/MHPInformation"; // For "MHP Information"
import { SessionsInformation } from "../components/general-admin/SessionsInformation"; // For "Sessions Information"
import { MHADashboard } from "./mh-admin/Dashboard";
import {Resources} from "./mh-admin/Resources";
import {MHPRequest} from "./mh-admin/MHPRequests";
export const AdminDashboardLayout = ({ children, role, userName, email }) => {
  const router = useRouter();

  // Default to "dashboard" (will update if a hash exists)
  const [activeSection, setActiveSection] = useState("dashboard");

  // On initial mount, check if a hash exists (e.g., #attendees) and update state
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashValue = window.location.hash.slice(1); // remove the '#' symbol
      setActiveSection(hashValue);
    }
  }, []);

  const handleSectionChange = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    router.push(`/admin/dashboard/${role}/${userName}/#${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin");
  };

  const navItems = {
    "general-admin": [
      {
        name: "Dashboard",
        href: "#dashboard",
        onClick: (e) => handleSectionChange(e, "dashboard"),
      },
      {
        name: "Attendees Information",
        href: "#attendees",
        onClick: (e) => handleSectionChange(e, "attendees"),
      },
      {
        name: "MHP Information",
        href: "#mhp",
        onClick: (e) => handleSectionChange(e, "mhp"),
      },
      {
        name: "Sessions Information",
        href: "#sessions",
        onClick: (e) => handleSectionChange(e, "sessions"),
      },
      {
        name: "Logout",
        href: "#logout",
        onClick: (e) => {
          e.preventDefault();
          handleLogout();
        },
      },
    ],
    "mh-admin": [
      { name: "Dashboard", href: "#dashboard", onClick: (e) => handleSectionChange(e, "dashboard") },
      { name: "MHP Request", href: "#mhp-request", onClick: (e) => handleSectionChange(e, "mhp-request") },
      { name: "Resources", href: "#resources", onClick: (e) => handleSectionChange(e, "resources") },
      { name: "Logout", href: "#logout", onClick: (e) => { e.preventDefault(); handleLogout(); } },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/60 p-6 sticky top-0 h-screen">
        <div className="mb-8 p-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            {userName}
          </h2>
          <p className="text-sm text-slate-500 capitalize mt-1">
            {role} Dashboard
          </p>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems[role].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="flex items-center p-3 text-slate-600 rounded-xl hover:bg-indigo-50/50 transition-all duration-300 hover:-translate-x-1 hover:text-indigo-600 group"
                >
                  <span className="mr-2 opacity-70 group-hover:opacity-100">
                    •
                  </span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 shadow-sm">
          {/* Render sections conditionally based on role & activeSection */}
          {role === "general-admin" && activeSection === "dashboard" && (
            <DashboardContent userName={userName} />
          )}
          {role === "general-admin" && activeSection === "attendees" && (
            <AttendeeInformation userName={userName} />
          )}
          {role === "general-admin" && activeSection === "mhp" && (
            <MHPInformation userName={userName} />
          )}
          {role === "general-admin" && activeSection === "sessions" && (
            <SessionsInformation userName={userName} />
          )}
          {role === "mh-admin" && activeSection === "dashboard" && <MHADashboard userName={userName}/>}
          {role === "mh-admin" && activeSection === "mhp-request" && <MHPRequest />}
          {role === "mh-admin" && activeSection === "resources" && <Resources />}
        </div>
      </main>
    </div>
  );
};
