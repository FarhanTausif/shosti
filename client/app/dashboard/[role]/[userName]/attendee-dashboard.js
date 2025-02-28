"use client";
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ResourceCard, SessionCard } from '@/components/dashboard/Cards';
export const AttendeeDashboard = ({ userName }) => {
  return (
    <DashboardLayout role="attendee" userName={userName}>
      {/* Resources Section */}
      <section id="resources" className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
            Wellness Resources
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search resources..."
              className="px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
            <select className="px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all">
              <option>All Categories</option>
              <option>Stress Management</option>
              <option>Anxiety</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            type="article"
            title="Managing Daily Stress"
            category="Stress Management"
          />
          {/* Add more resources */}
        </div>
      </section>

      {/* Sessions Section */}
      <section id="sessions" className="mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
          Upcoming Sessions
        </h2>
        <div className="space-y-6">
          <SessionCard
            professional={{ name: "Dr. Smith", specialty: "Clinical Psychology" }}
            datetime="2024-03-15T14:30:00"
            status="confirmed"
          />
          {/* Add more sessions */}
        </div>
      </section>
    </DashboardLayout>
  );
};