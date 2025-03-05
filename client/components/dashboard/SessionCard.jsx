import { useState } from "react";

export const SessionCard = ({ professional, datetime, sessionStatus, recommendations, paymentStatus, sessionID }) => {
  const isPaymentCompleted = paymentStatus === 'completed';
  const isApproved = sessionStatus === 'approved';
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/initiatePayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionID,  // Pass the session ID
          cus_name: 'Customer Name',
          cus_email: 'customer@example.com',
          cus_address: 'Dhaka',
          cus_city: 'Dhaka',
          cus_state: 'Dhaka',
          cus_postcode: '1000',
          cus_country: 'Bangladesh',
          cus_phone: '01711111111',
          ship_name: 'Customer Name',
          ship_address: 'Dhaka',
          ship_city: 'Dhaka',
          ship_state: 'Dhaka',
          ship_postcode: '1000',
          ship_country: 'Bangladesh',
          product_name: 'Product Name',
          product_category: 'Category',
          tran_id: `REF${Date.now()}`,  // Generate a unique transaction ID
          redirect_url: window.location.href,  // Pass the current URL to redirect back after success
        }),
      });
  
      const data = await response.json();
      window.location.href = data.redirectURL;  // Redirect user to SSLCommerz gateway for payment
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <button className="bg-violet-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center gap-2 motion-safe:animate-bounce"
          onClick={handlePayment} disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            {loading ? 'Processing...' : 'Proceed to Payment'}
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
