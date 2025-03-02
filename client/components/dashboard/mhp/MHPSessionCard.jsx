export const MHPSessionCard = ({ attendee, datetime, status, onApprove, onDecline }) => {
    return (
      <div className="p-4 border rounded-lg shadow-lg">
        <h3>{attendee.name}</h3>
        <p>{datetime}</p>
        <p>Status: {status}</p>
        <div className="flex space-x-4 mt-4">
          <button onClick={onApprove} className="bg-green-500 text-white py-2 px-4 rounded-full">
            Approve
          </button>
          <button onClick={onDecline} className="bg-red-500 text-white py-2 px-4 rounded-full">
            Decline
          </button>
        </div>
      </div>
    );
  };

  
