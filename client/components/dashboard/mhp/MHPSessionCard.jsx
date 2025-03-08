// export const MHPSessionCard = ({ attendee, datetime, status, sessionType, onApprove, onDecline }) => {
//   const formattedDate = new Date(datetime).toLocaleString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>
//             {attendee.name}
//           </h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//               </svg>
//               {formattedDate}
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//               </svg>
//               {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           status === 'approved' ? 'bg-green-100 text-green-800' :
//           status === 'declined' ? 'bg-red-100 text-red-800' :
//           'bg-yellow-100 text-yellow-800'
//         }`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-4 justify-end">
//           <button
//             onClick={onApprove}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Approve
//           </button>
//           <button
//             onClick={onDecline}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Decline
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// MHPSessionCard.jsx
// export const MHPSessionCard = ({ attendee, datetime, status, sessionType, onApprove, onDecline }) => {
//   const formattedDate = new Date(datetime).toLocaleString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>
//             {attendee.name}
//           </h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//               </svg>
//               {formattedDate}
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//               </svg>
//               {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           status === 'approved' ? 'bg-green-100 text-green-800' :
//           status === 'declined' ? 'bg-red-100 text-red-800' :
//           'bg-yellow-100 text-yellow-800'
//         }`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-4 justify-end">
//           <button
//             onClick={onApprove}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Approve
//           </button>
//           <button
//             onClick={onDecline}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Decline
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export const MHPSessionCard = ({ attendee, datetime, status, sessionType, paymentStatus, sessionID, onApprove, onDecline }) => {
//   const isPaymentCompleted = paymentStatus === 'completed';
//   const isApproved = status === 'approved';

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>
//             {attendee.name}
//           </h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//               </svg>
//               {new Date(datetime).toLocaleString('en-US', {
//                 weekday: 'short',
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//               </svg>
//               {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'approved' ? 'bg-green-100 text-green-800' : status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-4 justify-end">
//           <button
//             onClick={onApprove}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Approve
//           </button>
//           <button
//             onClick={onDecline}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Decline
//           </button>
//         </div>
//       )}

//       {isApproved && isPaymentCompleted && (
//         <div className="flex justify-between mt-4">
//           <div className="text-sm text-gray-500">Session ID: {sessionID.slice(-5)}</div>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//             </svg>
//             Join Session
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export const MHPSessionCard = ({ attendee, datetime, status, sessionType, paymentStatus, sessionID, onApprove, onDecline }) => {
//   const isPaymentCompleted = paymentStatus === 'completed';
//   const isApproved = status === 'approved';

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>
//             {attendee.name}
//           </h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//               </svg>
//               {new Date(datetime).toLocaleString('en-US', {
//                 weekday: 'short',
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//               </svg>
//               {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//               </svg>
//               Payment Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
//               <span className={`font-medium ${
//                 paymentStatus === 'completed' ? 'text-green-600' :
//                 paymentStatus === 'pending' ? 'text-amber-600' :
//                 'text-red-600'
//               }`}>
//               </span>
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'approved' ? 'bg-green-100 text-green-800' : status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-4 justify-end">
//           <button
//             onClick={onApprove}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Approve
//           </button>
//           <button
//             onClick={onDecline}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Decline
//           </button>
//         </div>
//       )}

//       {isApproved && isPaymentCompleted && (
//         <div className="flex justify-between mt-4">
//           <div className="text-md text-teal-600 font-semibold">Session ID: {sessionID.slice(-5)}</div>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//             </svg>
//             Join Session
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export const MHPSessionCard = ({ attendee, datetime, status, sessionType, paymentStatus, sessionID, onApprove, onDecline }) => {
//   const isPaymentCompleted = paymentStatus === 'completed';
//   const isApproved = status === 'approved';
  
//   const sessionDate = new Date(datetime);
//   const today = new Date();
//   const isToday = sessionDate.toDateString() === today.toDateString();

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//             </svg>
//             {attendee.name}
//           </h3>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//               </svg>
//               {new Date(datetime).toLocaleString('en-US', {
//                 weekday: 'short',
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
//               </svg>
//               {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
//             </p>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//               </svg>
//               Payment Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
//               <span className={`font-medium ${
//                 paymentStatus === 'completed' ? 'text-green-600' :
//                 paymentStatus === 'pending' ? 'text-amber-600' :
//                 'text-red-600'
//               }`}>
//               </span>
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'approved' ? 'bg-green-100 text-green-800' : status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-4 justify-end">
//           <button
//             onClick={onApprove}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Approve
//           </button>
//           <button
//             onClick={onDecline}
//             className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Decline
//           </button>
//         </div>
//       )}

//       {isApproved && isPaymentCompleted && isToday && (
//         <div className="flex justify-between mt-4">
//           <div className="text-md text-teal-600 font-semibold">Session ID: {sessionID.slice(-5)}</div>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//             </svg>
//             Join Session
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
"use client";

import { useState } from "react";
import Link from "next/link";

export const MHPSessionCard = ({ attendee, datetime, sessionStatus, sessionType, paymentStatus, sessionID, recommendations, onApprove, onDecline, onComplete, onProvideRecommendation }) => {
  const isPaymentCompleted = paymentStatus === 'completed';
  const isApproved = sessionStatus === 'approved';
  const isDeclined = sessionStatus === 'declined';
  const isCompleted = sessionStatus === 'completed';
  const isOffline = sessionType === 'offline';
  const sessionDate = new Date(datetime);
  const today = new Date();
  const isToday = sessionDate.toDateString() === today.toDateString();
  const isPastSession = (sessionDate < today && !isToday);
  const [inputRecommendation, setInputRecommendation] = useState("");
  const [showFullRecommendation, setShowFullRecommendation] = useState(false);
  const [isEditingRecommendation, setIsEditingRecommendation] = useState(false);
  const [editedRecommendation, setEditedRecommendation] = useState("");
  const [showError, setShowError] = useState(false);

  const handleRecommendationChange = (e) => {
    setInputRecommendation(e.target.value);
  };

  const handleProvideRecommendation = async () => {
    if (!inputRecommendation) return alert("Please provide a recommendation");

    await onProvideRecommendation(sessionID, inputRecommendation);
    setInputRecommendation("");
  };

  const handleEditRecommendation = () => {
    setIsEditingRecommendation(true);
    setEditedRecommendation(recommendations);
    setShowFullRecommendation(true); // Show full text when editing
  };

  const handleSaveEdit = async () => {
    if (!editedRecommendation.trim()) return;
    await onProvideRecommendation(sessionID, editedRecommendation);
    setIsEditingRecommendation(false);
  };

  const handleCancelEdit = () => {
    setIsEditingRecommendation(false);
    setEditedRecommendation("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transition-all duration-200 hover:shadow-xl border border-gray-100">
      {/* Session Schedule Banner */}
      {isApproved && isPaymentCompleted && !isPastSession && (
        <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-600 rounded-lg animate-bounce">
          <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Session Scheduled at {sessionDate.toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              year: 'numeric'
            })}
          </p>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {attendee.name}
          </h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Session
            </p>
            
            {!isDeclined && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {isOffline ? (
                'Payment Status: Offline'
              ) : (
                <>
                  Payment Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                  <span className={`font-medium ${
                    paymentStatus === 'completed' ? 'text-green-600' :
                    paymentStatus === 'pending' ? 'text-amber-600' :
                    'text-red-600'
                  }`}></span>
                </>
              )}
            </p>
          )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${sessionStatus === 'approved' ? 'bg-green-100 text-green-800' : sessionStatus === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {sessionStatus.charAt(0).toUpperCase() + sessionStatus.slice(1)}
        </span>
      </div>

      {sessionStatus === "pending" && (
        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={onApprove}
            className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Approve
          </button>
          <button
            onClick={onDecline}
            className="flex items-center gap-1 py-2 px-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all text-sm font-medium shadow-sm font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Decline
          </button>
        </div>
      )}

      {isApproved && isPaymentCompleted && isToday && !isOffline &&(
        <div className="flex justify-between mt-4">
          <div className="text-md text-teal-600 font-semibold">Session ID: {sessionID}</div>
          <Link legacyBehavior
            href={`/room/${sessionID}`} // Dynamic room link
            passHref
          >
            <a target="_blank">  
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Join Session
              </button>
            </a>
          </Link>
        </div>
      )}
   
      {isCompleted && isPaymentCompleted &&(
        <div className="mt-6 space-y-4">
          {!recommendations ? (
            <div className="space-y-4">
                <textarea 
                value={inputRecommendation} 
                onChange={(e) => {
                  setInputRecommendation(e.target.value);
                  setShowError(false);
                }}
                placeholder="Write your professional recommendations here..."
                className={`w-full p-4 text-sm border-2 rounded-xl focus:ring-2 transition-all duration-300 resize-none
                  ${showError ? 
                    'border-red-500 ring-red-200 animate-shake' : 
                    'border-gray-200 focus:border-blue-500 focus:ring-blue-200'}`}
                rows="4"
              />
              
              {showError && (
                <div className="text-red-500 text-sm mt-1 animate-slide-down">
                  ⚠️ Please provide a recommendation before submitting
                </div>
              )}

              <button 
                onClick={() => {
                  if (!inputRecommendation) {
                    setShowError(true);
                  } else {
                    handleProvideRecommendation();
                  }
                }}
                className={`flex items-center gap-2 px-5 py-1.5 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg
                  ${inputRecommendation ? 
                    'bg-gradient-to-r from-indigo-700 to-blue-500 hover:from-teal-500 hover:to-blue-700 hover:scale-[1.02]' : 
                    'bg-gray-400 cursor-not-allowed'} 
                  ${showError ? 'animate-bounce' : ''}`}
                disabled={!inputRecommendation}
              >
                Submit Note
              </button>
            </div>
          ) : isEditingRecommendation ? (
              <div className="space-y-4">
                <textarea
                  value={editedRecommendation}
                  onChange={(e) => setEditedRecommendation(e.target.value)}
                  className="w-full p-4 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  rows="6"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
            <div className="group relative p-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:border-blue-100 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-5 h-5 text-indigo-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-700">Recommendation Note</h4>
                </div>
                <button 
                  onClick={handleEditRecommendation}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 text-sm text-blue-600 hover:text-blue-700 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <div className="relative">
                <p className="text-gray-600 text-sm pl-8 transition-all">
                  {recommendations.length > 200 && !showFullRecommendation ? (
                    <>
                      {recommendations.slice(0, 200).replace(/\s+\S*$/, '')}
                      <span className="text-gray-400">...</span>
                    </>
                  ) : recommendations}
                </p>
                
                {recommendations.length > 200 && (
                  <button
                    onClick={() => setShowFullRecommendation(!showFullRecommendation)}
                    className="text-blue-600 hover:text-blue-700 text-sm mt-2 ml-8 underline underline-offset-2"
                  >
                    {showFullRecommendation ? 'Show less' : 'Read full recommendation'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {isApproved && isToday && isPaymentCompleted &&(
        <div className="mt-6 flex items-center gap-3">
          <button 
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mark Session Complete
          </button>
          <span className="text-sm text-gray-500">Session will be archived after completion</span>
        </div>
      )}
    </div>
  );
};
