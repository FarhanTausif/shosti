// "use client";
// import { useState, useEffect } from "react";
// import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
// import { MHPSessionCard } from "@/components/dashboard/mhp/MHPSessionCard";

// export const MHPDashboard = ({ userName, email }) => {
//   const [sessionRequests, setSessionRequests] = useState([]);

//   useEffect(() => {
//     const fetchSessionRequests = async () => {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions?professional_email=${email}`);
//       const data = await response.json();
//       console.log("Fetched session data:", data);  // Debugging log
//       setSessionRequests(data);
//     };
//     fetchSessionRequests();
//   }, [email]);

//   const handleApprove = async (sessionId) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/approve/${sessionId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: "approved" }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert("Session approved!");
//     } else {
//       alert("Error: " + data.error);
//     }
//   };

//   const handleDecline = async (sessionId) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/approve/${sessionId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: "declined" }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert("Session declined!");
//     } else {
//       alert("Error: " + data.error);
//     }
//   };

//   return (
//     <DashboardLayout role="mhp" userName={userName}>
//       <section id="sessions" className="mb-12">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
//           Session Requests
//         </h2>
//         <div className="space-y-6">
//           {sessionRequests.length === 0 ? (
//             <p>No session requests at the moment.</p>
//           ) : (
//             sessionRequests.map((session) => (
//               <MHPSessionCard
//                 key={session._id}
//                 attendee={{ name: session.attendee_email }}
//                 datetime={session.session_date}
//                 status={session.session_status}
//                 onApprove={() => handleApprove(session._id)}
//                 onDecline={() => handleDecline(session._id)}
//               />
//             ))
//           )}
//         </div>
//       </section>
//     </DashboardLayout>
//   );
// };

"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const MHPDashboard = ({ userName, email }) => {

  return (
    <DashboardLayout role="mhp" userName={userName} email={email}> 
    
    </DashboardLayout>
  );
};
