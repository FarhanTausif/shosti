"use client";

import MHPProfile from "./mhp/MHPProfile";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import AttendeeProfile from "./attendee/AttendeeProfile";
import Chatbot from "./attendee/Chatbot";
import { Sessions } from "./attendee/Sessions";
import { Professionals } from "./attendee/Professionals";
import { MHPSessions } from "./mhp/MHPSessions";
import {MHPResourcesManagement} from "./mhp/ResourceManagement"
import { AttendeeResources } from "./attendee/Resource";
import { MyResources } from "./mhp/MyResources";

export const DashboardLayout = ({ role, userName, email }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(role === "attendee" ? "resources" : "sessions");
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashValue = window.location.hash.slice(1);
      setActiveSection(hashValue);
    }
  }, []);

  const handleSectionChange = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    router.push(`/dashboard/${role}/${userName}/#${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/signin');
  };

  const navItems = {
    attendee: [
      { 
        name: 'Profile', 
        section: 'profile',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'Resources', 
        section: 'resources',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
      },
      { 
        name: 'Sessions', 
        section: 'sessions',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'Professionals', 
        section: 'professionals',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
      },
      { 
        name: 'Logout', 
        section: 'logout',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
      },
    ],
    mhp: [
      { 
        name: 'Profile', 
        section: 'profile',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'Upload Resource', 
        section: 'uploadresource',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'My Resources', 
        section: 'myresources',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'Sessions', 
        section: 'sessions',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
      },
      { 
        name: 'Logout', 
        section: 'logout',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 p-6 sticky top-0 h-screen shadow-xl">
        <div className="mb-8 p-4 bg-indigo-50/50 rounded-xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            {userName}
          </h2>
          <p className="text-sm text-slate-600 capitalize mt-1 font-medium">{role} Dashboard</p>
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
                  {item.name}
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
        {activeSection === "resources" && role === "attendee" && <AttendeeResources />}
          {activeSection === "profile" && role === "attendee" && <AttendeeProfile userName={userName} />}
          {activeSection === "sessions" && role === "attendee" && <Sessions email={email} />}
          {activeSection === "professionals" && role === "attendee" && <Professionals email={email} />}
          {activeSection === "sessions" && role === "mhp" && <MHPSessions email={email} />}
          {activeSection === "uploadresource" && role === "mhp" && <MHPResourcesManagement userName={userName} email={email} />}
          {activeSection === "myresources" && role === "mhp" && <MyResources email={email}/>}
          {activeSection === "profile" && role === "mhp" && <MHPProfile userName={userName} />}
        </div>
      </main>

      {/* Chatbot Component */}
      {role === "attendee" && <Chatbot />}
    </div>
  );
};