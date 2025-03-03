import { useState } from "react";

export const ProfessionalCard = ({ professional, onRequestSession, sessionStatus }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleRequestSession = (sessionType) => {
    if (!isClicked) {
      setIsClicked(true);
      onRequestSession(professional.email, sessionType);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{professional.username}</h3>
      <p>{professional.education}</p>
      <p>{professional.location}</p>
      <p>{professional.email}</p>
      <div>
        <strong>Online Availability:</strong>
        {Object.entries(professional.rosterOnline || {}).length > 0 ? (
          Object.entries(professional.rosterOnline).map(([day, time]) => (
            <div key={day} className="ml-4">
              {day}: {time}
            </div>
          ))
        ) : (
          <div className="ml-4">Not Available</div>
        )}
      </div>
      <div>
        <strong>Offline Availability:</strong>
        {Object.entries(professional.rosterOffline || {}).length > 0 ? (
          Object.entries(professional.rosterOffline).map(([day, time]) => (
            <div key={day} className="ml-4">
              {day}: {time}
            </div>
          ))
        ) : (
          <div className="ml-4">Not Available</div>
        )}
      </div>

      <button
        onClick={() => handleRequestSession("online")}
        className={`mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full ${isClicked ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isClicked}
      >
        {isClicked && sessionStatus === "online" ? "Session Requested" : "Request Online Session"}
      </button>
      <button
        onClick={() => handleRequestSession("offline")}
        className={`mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full ${isClicked ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isClicked}
      >
        {isClicked && sessionStatus === "offline" ? "Session Requested" : "Request Offline Session"}
      </button>
    </div>
  );
};
