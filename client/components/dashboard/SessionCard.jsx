// export const SessionCard = ({ professional, datetime, status, recommendations }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mb-4 transition-all duration-200 hover:shadow-lg border border-gray-100">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Session with {professional.name}
//           </h3>
//           <p className="text-sm text-gray-500">
//             {new Date(datetime).toLocaleString('en-US', {
//               weekday: 'short',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit'
//             })}
//           </p>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           status === 'pending' ? 'bg-amber-100 text-amber-800' :
//           status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {recommendations && (
//         <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
//           <p className="text-sm text-blue-800">
//             <span className="font-medium">Professional Notes:</span> {recommendations}
//           </p>
//         </div>
//       )}

//       <div className="mt-6 flex justify-between items-center">
//         <div className="text-sm text-gray-500">
//           Session ID: {datetime.slice(-5)}
//         </div>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//           </svg>
//           Join Session
//         </button>
//       </div>
//     </div>
//   );
// };

export const SessionCard = ({ professional, datetime, sessionStatus, recommendations, paymentStatus, sessionID }) => {
  const isPaymentCompleted = paymentStatus === 'completed';
  const isApproved = sessionStatus === 'approved';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 transition-all duration-200 hover:shadow-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Session with {professional.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            {new Date(datetime).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${sessionStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          {sessionStatus.charAt(0).toUpperCase() + sessionStatus.slice(1)}
        </span>
      </div>

      {recommendations && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Professional Notes:</span> {recommendations}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        {isApproved && isPaymentCompleted &&(
          <div className="text-sm text-gray-500">
            Session ID: {sessionID.slice(-5)}
          </div>
        )}

        {/* Conditional Payment Button or Join Button */}
        {isApproved && !isPaymentCompleted && (
          <button className="bg-violet-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center gap-2 motion-safe:animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Proceed to Payment
          </button>
        )}

        {isApproved && isPaymentCompleted && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Join Session
          </button>
        )}
      </div>
    </div>
  );
};
