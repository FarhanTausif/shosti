// "use client";
// export const MHPInformation = ({ userName }) => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold">MHP Information</h1>
//       <p>Content for MHP Information goes here.</p>
//     </div>
//   );
// };

// // export default MHPInformation;
"use client";

import React, { useEffect, useState } from "react";

export const MHPInformation = () => {
  const [mhpList, setMhpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMHPs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`);
        if (!response.ok) {
          throw new Error("Failed to fetch MHP information");
        }
        const data = await response.json();
        setMhpList(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMHPs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading MHP information...</p>
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
      <section id="mhp" className="mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
          Mental Health Professionals Information
        </h2>
        {mhpList.length === 0 ? (
          <p>No Mental Health Professionals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mhpList.map((mhp) => (
              <div key={mhp.email} className="border p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{mhp.username}</h3>
                <p>Email: {mhp.email}</p>
                <p>BMDC Reg No: {mhp.bmdcRegNo}</p>
                <p>Mobile: {mhp.mobileNumber}</p>
                <p>Location: {mhp.location}</p>
                <p>Education: {mhp.education}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

