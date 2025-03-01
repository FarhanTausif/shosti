import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  age: { type: Number },
  sex: { type: String }
});

const Attendee = mongoose.model("Attendee", AttendeeSchema);
export default Attendee;
