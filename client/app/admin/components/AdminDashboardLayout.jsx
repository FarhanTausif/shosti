"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardContent } from "../components/general-admin/Dashboard";
import { AttendeeInformation } from "../components/general-admin/AttendeeInformation";
import { MHPInformation } from "../components/general-admin/MHPInformation";
import { SessionsInformation } from "../components/general-admin/SessionsInformation";
import { MHADashboard } from "./mh-admin/Dashboard";
import { Resources } from "./mh-admin/Resources";
import { MHPRequest } from "./mh-admin/MHPRequests";
import { ViewResources } from "./mh-admin/ViewResources";

export const AdminDashboardLayout = ({ children, role, userName, email }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(role === "general-admin" ? "attendees" : "mhp-request");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashValue = window.location.hash.slice(1);
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
      // { 
      //   name: "Dashboard",
      //   section: "dashboard",
      //   icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      //           <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      //         </svg>
      // },
      { 
        name: "Attendees Information",
        section: "attendees",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
      },
      { 
        name: "MHP Information",
        section: "mhp",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a5 5 0 105 5v2.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 017 9.5V7a5 5 0 005-5zm6 14.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 014 20v-2a1.5 1.5 0 011.5-1.5H18zM12 14a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z" />
              </svg>
      },
      { 
        name: "Sessions Information",
        section: "sessions",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: "Logout",
        section: "logout",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
      },
    ],
    "mh-admin": [
      // { 
      //   name: "Dashboard",
      //   section: "dashboard",
      //   icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      //           <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      //         </svg>
      // },
      { 
        name: "MHP Request",
        section: "mhp-request",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: "Upload Resource",
        section: "resourceUpload",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
      },
      { 
        name: "Resources",
        section: "resourcesShow",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
      },
      { 
        name: "Logout",
        section: "logout",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 p-6 sticky top-0 h-screen shadow-xl">
        <div className="mb-8 p-4 bg-indigo-50/50 rounded-xl">
          <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent break-words">
            {userName}
          </h2>
          <p className="text-sm text-slate-600 capitalize mt-1 font-medium">
            {role.replace('-', ' ')} Dashboard
          </p>
        </div>
        <nav>
          <ul className="space-y-1">
            {navItems[role].map((item) => (
              <li key={item.section}>
                <button
                  onClick={(e) => item.section === 'logout' ? handleLogout() : handleSectionChange(e, item.section)}
                  className={`w-full flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    activeSection === item.section
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-indigo-50/50 hover:translate-x-2'
                  }`}
                >
                  <span className={`mr-3 ${activeSection === item.section ? 'text-white' : 'text-indigo-400'}`}>
                    {item.icon}
                  </span>
                  <span className="text-left flex-1">{item.name}</span>
                  {item.section === 'logout' && (
                    <span className="ml-auto text-red-200 hover:text-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 shadow-lg">
          {/* {role === "general-admin" && activeSection === "dashboard" && (
            <DashboardContent userName={userName} />
          )} */}
          {role === "general-admin" && activeSection === "attendees" && (
            <AttendeeInformation userName={userName} />
          )}
          {role === "general-admin" && activeSection === "mhp" && (
            <MHPInformation userName={userName} />
          )}
          {role === "general-admin" && activeSection === "sessions" && (
            <SessionsInformation userName={userName} />
          )}
          {/* {role === "mh-admin" && activeSection === "dashboard" && <MHADashboard userName={userName}/>} */}
          {role === "mh-admin" && activeSection === "mhp-request" && <MHPRequest />}
          {role === "mh-admin" && activeSection === "resourceUpload" && <Resources userName={userName} email={email} />}
          {role === "mh-admin" && activeSection === "resourcesShow" && <ViewResources />}
        </div>
      </main>
    </div>
  );
};