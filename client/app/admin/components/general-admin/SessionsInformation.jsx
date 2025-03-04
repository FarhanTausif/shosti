"use client";
import React, { useEffect, useState } from "react";

export const SessionsInformation = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Adjust the endpoint if needed (this example assumes /api/session returns the sessions)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <section id="sessions" className="mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
          Sessions Information
        </h2>
        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div key={session._id} className="border p-4 rounded-lg shadow">
                <p><strong>Attendee:</strong> {session.attendee_email}</p>
                <p><strong>Professional:</strong> {session.professional_email}</p>
                <p><strong>Type:</strong> {session.session_type}</p>
                <p><strong>Status:</strong> {session.session_status}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(session.session_date).toLocaleString()}
                </p>
                {session.recommendations && (
                  <p><strong>Recommendations:</strong> {session.recommendations}</p>
                )}
                <p><strong>Payment:</strong> {session.payment_status}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
