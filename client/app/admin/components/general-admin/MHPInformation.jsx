"use client";

import React, { useEffect, useState } from "react";

export const MHPInformation = () => {
  const [mhpList, setMhpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMHP, setSelectedMHP] = useState(null);

  useEffect(() => {
    const fetchMHPs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`);
        if (!response.ok) throw new Error("Failed to fetch MHP information");
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

  const closeModal = () => setSelectedMHP(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Loading professionals...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Modal */}
      {selectedMHP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden m-4">
            <div className="p-6 bg-indigo-50 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-indigo-600">
                {selectedMHP.username}'s Profile
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="BMDC Reg No" value={selectedMHP.bmdcRegNo} />
                <InfoItem label="Email" value={selectedMHP.email} />
                <InfoItem label="Mobile" value={selectedMHP.mobileNumber} />
                <InfoItem label="Location" value={selectedMHP.location} />
                <InfoItem label="Education" value={selectedMHP.education} />
              </div>

              <AvailabilitySection 
                title="Online Availability"
                data={selectedMHP.rosterOnline}
                icon="online"
              />
              
              <AvailabilitySection 
                title="Offline Availability"
                data={selectedMHP.rosterOffline}
                icon="offline"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section id="mhp" className="py-12">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-12 text-center">
          Mental Health Professionals
        </h2>
        
        {mhpList.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">No professionals found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mhpList.map((mhp) => (
              <div key={mhp.email} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6 pb-4 bg-gradient-to-b from-indigo-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-600">
                        {mhp.username}
                      </h3>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <InfoItem label="Mobile" value={mhp.mobileNumber} />
                    <InfoItem label="Email" value={mhp.email} />
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedMHP(mhp)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all text-sm font-semibold"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Helper components
const InfoItem = ({ label, value }) => (
  <div className="flex items-center text-sm text-gray-600">
    <span className="font-medium text-gray-500 mr-2">{label}:</span>
    <span className="text-gray-700">{value || 'N/A'}</span>
  </div>
);

const AvailabilitySection = ({ title, data, icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${icon === 'online' ? 'text-purple-600' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
        {icon === 'online' ? (
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        ) : (
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        )}
      </svg>
      {title}
    </div>
    
    {Object.entries(data || {}).length > 0 ? (
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(data).map(([day, time]) => (
          <div key={day} className="bg-white p-2 rounded-md text-sm text-center border">
            <span className="font-medium text-gray-600">{day}</span>
            <span className="block text-gray-500">{time}</span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-400 text-center py-2">No availability</p>
    )}
  </div>
);
