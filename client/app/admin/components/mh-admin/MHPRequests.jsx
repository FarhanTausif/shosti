"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function MHPRequest() {
  const [pendingMHPs, setPendingMHPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalContent, setModalContent] = useState({ status: "", message: "" });

  useEffect(() => {
    const fetchPendingMHPs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/requests`);
        if (!response.ok) throw new Error("Failed to fetch pending MHP requests");
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

  const handleDecision = async (userName, userEmail, decision) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/status/${userName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, status: decision }),
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      setModalContent({
        status: decision,
        message: `Request has been ${decision} successfully`
      });
      setShowStatusModal(true);
      setPendingMHPs(pendingMHPs.filter((mhp) => mhp.username !== userName));
      window.location.reload();
    } catch (err) {
      console.error(err);
      setModalContent({
        status: "error",
        message: err.message || "Failed to process request"
      });
      setShowStatusModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading MHP requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md bg-red-50 p-6 rounded-xl">
          <div className="text-red-600 mb-3">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md flex flex-col shadow-xl">
            <div className={`p-6 border-b flex justify-between items-center ${
              modalContent.status === "approved" ? "bg-green-50" :
              modalContent.status === "rejected" ? "bg-red-50" : "bg-indigo-50"
            }`}>
              <h2 className="text-xl font-bold pr-4">
                {modalContent.status === "approved" && "Approval Successful"}
                {modalContent.status === "rejected" && "Rejection Successful"}
                {modalContent.status === "error" && "Error Occurred"}
              </h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-500 hover:text-gray-700 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {modalContent.status === "approved" && (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {modalContent.status === "rejected" && (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {modalContent.status === "error" && (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
                <p className="text-gray-700">{modalContent.message}</p>
                <Button
                  onClick={() => setShowStatusModal(false)}
                  className={`mt-4 ${
                    modalContent.status === "approved" ? "bg-green-600 hover:bg-green-700" :
                    modalContent.status === "rejected" ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white`}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
          MHP Registration Requests
        </h2>
        <p className="text-gray-600">Review and manage mental health professional applications</p>
      </div>

      {pendingMHPs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">No pending registration requests</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingMHPs.map((mhp) => (
            <div 
              key={mhp._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">{mhp.username}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pending Review
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{mhp.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">BMDC Reg: {mhp.bmdcRegNo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button 
                    onClick={() => handleDecision(mhp.userName, mhp.email, "approved")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full md:w-auto"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleDecision(mhp.userName, mhp.email, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 w-full md:w-auto"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}