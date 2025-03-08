import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Attendee from "../models/Attendee.js";


export const getAllAttendeeProfile = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendees" });
  }
};
// Signup for Attendee
export const signupAttendee = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check for existing email
    const existingAttendee = await Attendee.findOne({ email });
    if (existingAttendee) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const attendee = new Attendee({ 
      username, 
      email, 
      password: hashedPassword 
    });
    
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

    res.status(200).json({ message: "Login successful", token, userType: "attendee", userId: attendee._id, userName: attendee.username, email: attendee.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Attendee Profile
export const getAttendeeProfile = async (req, res) => {
  const { userName } = req.params; // Get userName from URL params
  try {
    const attendee = await Attendee.findOne({ username: userName });
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }
    res.status(200).json({
      username: attendee.username,
      email: attendee.email,
      address: attendee.address,
      phoneNumber: attendee.phoneNumber,
      age: attendee.age,
      sex: attendee.sex,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAttendeeProfile = async (req, res) => {
  const { userName } = req.params;  // Get userName from URL params
  // Destructure only the editable fields
  const { address, phoneNumber, age, sex } = req.body;
  try {
    const attendee = await Attendee.findOne({ username: userName });
    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }



    attendee.address = address || attendee.address;
    attendee.phoneNumber = phoneNumber || attendee.phoneNumber;
    attendee.age = age || attendee.age;
    attendee.sex = sex || attendee.sex;

    await attendee.save();

    res.status(200).json({
      message: "Profile updated successfully",
      attendee: {
        username: attendee.username,
        email: attendee.email,
        address: attendee.address,
        phoneNumber: attendee.phoneNumber,
        age: attendee.age,
        sex: attendee.sex,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
