import Attendee from '../models/Attendee.js';
import MHP from '../models/MHP.js';
import bcrypt from 'bcrypt';
import { sendOTP } from '../services/emailService.js';

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { role, email } = req.body;

  let user;
  if (role === "attendee") user = await Attendee.findOne({ email });
  else if (role === "mhp") user = await MHP.findOne({ email });

  if (!user) return res.status(404).json({ error: "Invalid email" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOTP(email, otp);
    res.json({ message: "OTP sent", otp });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
  const { role, email, newPassword } = req.body;

  let user;
  if (role === "attendee") user = await Attendee.findOne({ email });
  else if (role === "mhp") user = await MHP.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password updated" });
};
