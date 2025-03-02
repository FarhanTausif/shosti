import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  attendee_email: { type: String, required: true },
  professional_email: { type: String, required: true },
  session_type: { type: String, enum: ['online', 'offline'], required: true },
  session_status: { type: String, enum: ['pending', 'approved', 'declined', 'completed'], default: 'pending' },
  session_date: { type: Date, required: true }, // Date and Time for the session
  recommendations: { type: String, default: '' }, // Recommendations from the professional
  payment_status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Only for online payments
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;