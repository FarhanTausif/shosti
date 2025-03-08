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
      // Sort the sessions from the latest to the past (descending order)
      const sortedSessions = data.sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
      setSessions(sortedSessions);  
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
        <button onClick={() => setFilter("pending")} className="bg-rose-600 text-white py-2 px-4 rounded-full mr-2">
          Pending Sessions
        </button>
        <button onClick={() => setFilter("approved")} className="bg-emerald-600 text-white py-2 px-4 rounded-full mr-2">
          Approved Sessions
        </button>
        <button onClick={() => setFilter("completed")} className="bg-green-600 px-4 py-2 bg-green-600 text-white rounded-full">
          Completed Sessions
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
              professional={{ name: session.professional_email }} 
              datetime={session.session_date}
              sessionStatus={session.session_status}
              recommendations={session.recommendations}
              sessionID={session._id}
              sessionType={session.session_type}
              paymentStatus={session.payment_status}
            />
          ))}
        </div>
      )}
    </section>
  );
};
