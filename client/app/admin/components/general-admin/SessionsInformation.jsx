// "use client";
// import React, { useEffect, useState } from "react";

// export const SessionsInformation = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         // Adjust the endpoint if needed (this example assumes /api/session returns the sessions)
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/all`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch sessions");
//         }
//         const data = await response.json();
//         setSessions(data);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSessions();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading sessions...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <section id="sessions" className="mb-12">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
//           Sessions Information
//         </h2>
//         {sessions.length === 0 ? (
//           <p>No sessions found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sessions.map((session) => (
//               <div key={session._id} className="border p-4 rounded-lg shadow">
//                 <p><strong>Attendee:</strong> {session.attendee_email}</p>
//                 <p><strong>Professional:</strong> {session.professional_email}</p>
//                 <p><strong>Type:</strong> {session.session_type}</p>
//                 <p><strong>Status:</strong> {session.session_status}</p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(session.session_date).toLocaleString()}
//                 </p>
//                 {session.recommendations && (
//                   <p><strong>Recommendations:</strong> {session.recommendations}</p>
//                 )}
//                 <p><strong>Payment:</strong> {session.payment_status}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };
"use client";
import React, { useEffect, useState } from "react";

export const SessionsInformation = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/all`);
        if (!response.ok) throw new Error("Failed to fetch sessions");
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

  const closeModal = () => setSelectedSession(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Loading sessions...
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
      {/* Session Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden m-4">
            <div className="p-6 bg-indigo-50 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-indigo-600">
                Session Details
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
                <InfoItem label="Session Type" value={selectedSession.session_type} />
                <InfoItem label="Session Status" value={selectedSession.session_status} />
                <InfoItem label="Attendee Email" value={selectedSession.attendee_email} />
                <InfoItem label="Professional Email" value={selectedSession.professional_email} />
                <InfoItem label="Date" value={new Date(selectedSession.session_date).toLocaleString()} />
                <InfoItem label="Payment Status" value={selectedSession.payment_status} />
              </div>

              {selectedSession.recommendations && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Recommendations
                  </div>
                  <p className="text-gray-700">{selectedSession.recommendations}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section id="sessions" className="py-12">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-12 text-center">
          Therapy Sessions
        </h2>
        
        {sessions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">No sessions found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session) => (
              <div 
                key={session._id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 pb-4 bg-gradient-to-b from-indigo-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-indigo-600 capitalize">
                        {session.session_type}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(session.session_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.session_status === 'completed' ? 'bg-green-100 text-green-800' :
                      session.session_status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.session_status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <InfoItem label="Attendee" value={session.attendee_email} />
                    <InfoItem label="Professional" value={session.professional_email} />
                    <InfoItem label="Payment" value={session.payment_status} />
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedSession(session)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all text-sm font-semibold"
                  >
                    View Session Details
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

// Helper component
const InfoItem = ({ label, value }) => (
  <div className="flex items-center text-sm text-gray-600">
    <span className="font-medium text-gray-500 mr-2">{label}:</span>
    <span className="text-gray-700 truncate">{value || 'N/A'}</span>
  </div>
);