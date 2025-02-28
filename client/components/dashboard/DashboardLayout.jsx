"use client";

import { ContentManagement } from "./ContentManagement"; 
import { SessionRequests } from "./SessionRequests";
import MHPProfile from "./mhp/MHPProfile";
import { useState } from "react";

export const DashboardLayout = ({ children, role, userName }) => {
  const [activeSection, setActiveSection] = useState(role === "attendee" ? "resources" : "content");

  const handleSectionChange = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
  };

  const navItems = {
    attendee: [
      { 
        name: 'Resources', 
        href: '#resources', 
        onClick: (e) => handleSectionChange(e, 'resources') 
      },
      { 
        name: 'Sessions', 
        href: '#sessions', 
        onClick: (e) => handleSectionChange(e, 'sessions') 
      },
      { 
        name: 'Professionals', 
        href: '#professionals',
        onClick: (e) => e.preventDefault()
      }
    ],
    mhp: [
      { 
        name: 'Content', 
        href: '#content', 
        onClick: (e) => handleSectionChange(e, 'content') 
      },
      { 
        name: 'Sessions', 
        href: '#sessions', 
        onClick: (e) => handleSectionChange(e, 'sessions') 
      },
      { 
        name: 'Profile', 
        href: '#profile',
        onClick: (e) => handleSectionChange(e, 'profile') 
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/60 p-6 sticky top-0 h-screen">
        <div className="mb-8 p-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            {userName}
          </h2>
          <p className="text-sm text-slate-500 capitalize mt-1">{role} Dashboard</p>
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
                  <span className="mr-2 opacity-70 group-hover:opacity-100">•</span>
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
          {activeSection === "content" && <ContentManagement />}
          {activeSection === "sessions" && <SessionRequests />}
          {activeSection === "profile" && <MHPProfile userName={userName} />}
        </div>
      </main>
    </div>
  );
};