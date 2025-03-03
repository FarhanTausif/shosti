import { useState, useEffect } from "react";
import { MHPSessionCard } from "./MHPSessionCard";

export const MHPSessions = ({ email }) => {
    const [sessionRequests, setSessionRequests] = useState([]);
    const [filter, setFilter] = useState("all"); // For filtering session types
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [scheduledDate, setScheduledDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    const fetchSessionRequests = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions?professional_email=${email}`);
        console.log("Email:", email);
        const data = await response.json();
        setSessionRequests(data);
    };
    fetchSessionRequests();
    }, [email]);

    const handleApprove = (sessionId) => {
    setSelectedSessionId(sessionId);
    setModalVisible(true);
    };

    const handleDecline = async (sessionId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/approve/${sessionId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "declined" }),
    });
    const data = await response.json();
    if (response.ok) {
        alert("Session declined!");
    } else {
        alert("Error: " + data.error);
    }
    };

    const handleSaveDate = async () => {
    if (!scheduledDate) {
        setErrorMessage("Please select a valid date and time.");
        return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/approve/${selectedSessionId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        status: "approved",
        scheduled_date: new Date(scheduledDate), // Send the correct Date object
        }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Session approved and scheduled!");
        setModalVisible(false);
        setScheduledDate(""); // Clear input after success
    } else {
        alert("Error: " + data.error);
    }
    };

    const filteredSessions = sessionRequests.filter(
    (session) => filter === "all" || session.session_type === filter
    );
    return(
        <div>
            <section id="sessions" className="mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
            Session Requests
            </h2>

            {/* Filter buttons */}
            <div className="mb-4">
            <button onClick={() => setFilter("all")} className="bg-blue-600 text-white py-2 px-4 rounded-full mr-2">
                All Sessions
            </button>
            <button onClick={() => setFilter("online")} className="bg-teal-600 text-white py-2 px-4 rounded-full mr-2">
                Online Sessions
            </button>
            <button onClick={() => setFilter("offline")} className="bg-indigo-600 text-white py-2 px-4 rounded-full">
                Offline Sessions
            </button>
            </div>

            <div className="space-y-6">
            {filteredSessions.length === 0 ? (
                <p>No session requests at the moment.</p>
            ) : (
                filteredSessions.map((session) => (
                <MHPSessionCard
                    key={session._id}
                    attendee={{ name: session.attendee_email }}
                    datetime={session.session_date}
                    status={session.session_status}
                    sessionType={session.session_type}
                    onApprove={() => handleApprove(session._id)}
                    onDecline={() => handleDecline(session._id)}
                />
                ))
            )}
            </div>
        </section>

        {/* Modal for date input */}
        {modalVisible && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-bold mb-4">Schedule Session</h3>
                <div className="mb-4">
                <label className="block text-sm font-medium">Select Date & Time:</label>
                <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
                </div>
                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSaveDate}
                    className="bg-green-600 text-white py-2 px-4 rounded-full mr-2"
                >
                    Save
                </button>
                <button
                    onClick={() => setModalVisible(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-full"
                >
                    Cancel
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};
