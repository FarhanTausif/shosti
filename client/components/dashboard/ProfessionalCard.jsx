export const ProfessionalCard = ({ professional, onRequestSession }) => {
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
          onClick={() => onRequestSession(professional.email)}
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full"
        >
          Request Session
        </button>
      </div>
    );
  };
  