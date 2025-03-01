import { MhpSessionCard } from "./MhpComponents";

export const SessionRequests = () => (
    <section id="sessions" className="mb-12">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
        Session Requests
      </h2>
      <div className="space-y-6">
        <MhpSessionCard
          attendee={{ name: "John Doe" }}
          datetime="2024-03-15T14:30:00"
          status="pending"
        />
        {/* Add more session requests */}
      </div>
    </section>
  );