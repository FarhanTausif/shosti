"use client";

import React, { useEffect, useState } from "react";

export const AttendeeInformation = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attendees/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch attendees");
        }
        const data = await response.json();
        setAttendees(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading attendees information...</p>
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
      <section id="attendees" className="mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
          Attendees Information
        </h2>
        {attendees.length === 0 ? (
          <p>No attendees found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendees.map((attendee) => (
              <div key={attendee.email} className="border p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{attendee.username}</h3>
                <p>
                  <strong>Email:</strong> {attendee.email}
                </p>
                {attendee.address && (
                  <p>
                    <strong>Address:</strong> {attendee.address}
                  </p>
                )}
                {attendee.phoneNumber && (
                  <p>
                    <strong>Phone:</strong> {attendee.phoneNumber}
                  </p>
                )}
                {attendee.age && (
                  <p>
                    <strong>Age:</strong> {attendee.age}
                  </p>
                )}
                {attendee.sex && (
                  <p>
                    <strong>Sex:</strong> {attendee.sex}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


