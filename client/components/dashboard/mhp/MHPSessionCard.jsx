export const MHPSessionCard = ({ attendee, datetime, status, sessionType, onApprove, onDecline }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{attendee.name}</h3>
      <p>Session Date: {datetime}</p>
      <p>Status: {status}</p>
      <p>Session Type: {sessionType}</p>

      {status === "pending" && (
        <>
          <button onClick={onApprove} className="bg-green-600 text-white py-2 px-4 rounded-full mr-2">Approve</button>
          <button onClick={onDecline} className="bg-red-600 text-white py-2 px-4 rounded-full">Decline</button>
        </>
      )}
    </div>
  );
};
