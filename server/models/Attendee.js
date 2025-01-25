import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Attendee = mongoose.model("Attendee", AttendeeSchema);
export default Attendee;
