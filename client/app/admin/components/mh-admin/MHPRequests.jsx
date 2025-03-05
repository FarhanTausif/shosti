"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export  function MHPRequest() {
  const [pendingMHPs, setPendingMHPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending MHP registration requests
  useEffect(() => {
    const fetchPendingMHPs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/requests`);
        if (!response.ok) {
          throw new Error("Failed to fetch pending MHP requests");
        }
        const data = await response.json();
        setPendingMHPs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingMHPs();
  }, []);

  // Handle approving or rejecting a request
  const handleDecision = async (userName,userEmail, decision) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/status/${userName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail,status: decision }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      alert(`Request has been ${decision}`);
      // Remove the processed request from the list
      setPendingMHPs(pendingMHPs.filter((mhp) => mhp.username !== userName));
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return <p>Loading pending MHP requests...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (pendingMHPs.length === 0) {
    return <p>No pending MHP registration requests.</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pending MHP Registration Requests</h2>
      <div className="space-y-4">
        {pendingMHPs.map((mhp) => (
          <div key={mhp._id} className="border p-4 rounded-lg shadow flex flex-col md:flex-row items-center justify-between">
            <div>
              <p><strong>Username:</strong> {mhp.username}</p>
              <p><strong>Email:</strong> {mhp.email}</p>
              <p><strong>BMDC Reg:</strong> {mhp.bmdcRegNo}</p>
              <p><strong>Status:</strong> {mhp.status}</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button onClick={() => handleDecision(mhp.userName, mhp.email, "approved")} className="bg-green-600 hover:bg-green-700 text-white">
                Approve
              </Button>
              <Button onClick={() => handleDecision(mhp.userName, mhp.email, "rejected")} className="bg-red-600 hover:bg-red-700 text-white">
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
