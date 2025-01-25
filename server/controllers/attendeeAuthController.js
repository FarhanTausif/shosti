import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

// Attendee Sign-In
export const signinAttendee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const attendee = await Attendee.findOne({ email });
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, attendee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: attendee._id, userType: "attendee" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, userType: "attendee" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};