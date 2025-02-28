import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MHP from "../models/MHP.js";

// Signup for MHP

export const signupMHP = async (req, res) => {
  const { username, bmdcRegNo, email, password } = req.body;

  try {
    // Check for existing email or BMDC number
    const existingMHP = await MHP.findOne({ 
      $or: [{ email }, { bmdcRegNo }] 
    });
    
    if (existingMHP) {
      return res.status(409).json({ 
        message: "Email or BMDC registration number already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const mhp = new MHP({ 
      username, 
      bmdcRegNo, 
      email, 
      password: hashedPassword 
    });
    
    await mhp.save();
    res.status(201).json({ message: "MHP signed up successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MHP Sign-In
  export const signinMHP = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const mhp = await MHP.findOne({ email });
      if (!mhp) {
        return res.status(404).json({ message: "Mental Health Professional not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, mhp.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { userId: mhp._id, userType: "mhp" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ message: "Login successful", token, userType: "mhp", userId: mhp._id, userName: mhp.username });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Fetch MHP Profile
export const getProfile = async (req, res) => {
  const { userName } = req.params;  // Extract userName from URL params

  try {
    const mhp = await MHP.findOne({ username: userName });
    if (!mhp) {
      return res.status(404).json({ message: "MHP not found" });
    }

    res.status(200).json({
      username: mhp.username,
      bmdcRegNo: mhp.bmdcRegNo,
      email: mhp.email,
      mobileNumber: mhp.mobileNumber,
      location: mhp.location,
      rosterOnline: mhp.rosterOnline,
      rosterOffline: mhp.rosterOffline,
      education: mhp.education,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update MHP Profile
export const updateProfile = async (req, res) => {
  const { userName } = req.params;  // Extract userName from URL params
  const { mobileNumber, location, rosterOnline, rosterOffline, education } = req.body;

  try {
    const mhp = await MHP.findOne({ username: userName });
    if (!mhp) {
      return res.status(404).json({ message: "MHP not found" });
    }

    // Update profile details
    mhp.mobileNumber = mobileNumber || mhp.mobileNumber;
    mhp.location = location || mhp.location;
    mhp.rosterOnline = rosterOnline || mhp.rosterOnline;
    mhp.rosterOffline = rosterOffline || mhp.rosterOffline;
    mhp.education = education || mhp.education;

    await mhp.save();

    res.status(200).json({
      message: "Profile updated successfully",
      mhp: {
        username: mhp.username,
        mobileNumber: mhp.mobileNumber,
        location: mhp.location,
        rosterOnline: mhp.rosterOnline,
        rosterOffline: mhp.rosterOffline,
        education: mhp.education,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};