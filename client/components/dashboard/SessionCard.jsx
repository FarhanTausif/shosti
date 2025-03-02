export const SessionCard = ({ professional, datetime, status, recommendations }) => {
    return (
      <div className="session-card">
        <h3>{professional.name}</h3>
        <p>{datetime}</p>
        <p>Status: {status}</p>
        {recommendations && <p>Recommendations: {recommendations}</p>}
        <button>Join Session</button> {/* For the attendee to join session when it's time */}
      </div>
    );
  };
