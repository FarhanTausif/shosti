"use client";
import { useState, useEffect } from "react";
import { SessionCard } from "@/components/dashboard/SessionCard";  // Importing the session card for displaying sessions

export const Sessions = ({ email }) => {
  const [sessions, setSessions] = useState([]);  // Track all sessions including approved ones
  const [filter, setFilter] = useState("all"); // Filter for session statuses

  // Fetch sessions (including approved sessions)
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/attendee?attendee_email=${email}`);
      const data = await response.json();
      console.log("Sessions:", data);
      setSessions(data);  // Update sessions to show approved ones
    };
    fetchSessions();
  }, [email]);

  // Filter sessions based on status
  const filteredSessions = sessions.filter((session) => filter === "all" || session.session_status === filter);

  return (
    <section id="sessions" className="mb-12">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
        My Sessions
      </h2>

      {/* Filter buttons */}
      <div className="mb-4">
        <button onClick={() => setFilter("all")} className="bg-blue-600 text-white py-2 px-4 rounded-full mr-2">
          All Sessions
        </button>
        <button onClick={() => setFilter("pending")} className="bg-teal-600 text-white py-2 px-4 rounded-full mr-2">
          Pending Sessions
        </button>
        <button onClick={() => setFilter("approved")} className="bg-indigo-600 text-white py-2 px-4 rounded-full">
          Approved Sessions
        </button>
      </div>

      {/* Display sessions (both pending and approved) */}
      {filteredSessions.length === 0 ? (
        <p>No sessions at the moment.</p>
      ) : (
        <div className="space-y-6">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session._id}
              professional={{ name: session.professional_email }}  // Showing professional name or email
              datetime={session.session_date}
              status={session.session_status}
              recommendations={session.recommendations}
            />
          ))}
        </div>
      )}
    </section>
  );
};
