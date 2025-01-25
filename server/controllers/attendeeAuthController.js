import bcrypt from "bcryptjs";
import Attendee from "../models/Attendee.js";

// Signup for Attendee
export const signupAttendee = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const attendee = new Attendee({ username, email, password: hashedPassword });
    await attendee.save();
    res.status(201).json({ message: "Attendee signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

