import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MHP from "../models/MHP.js";
import { Resend } from "resend";
import dotenv from 'dotenv';
dotenv.config();
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
  
      res.status(200).json({ message: "Login successful", token, userType: "mhp", userId: mhp._id, userName: mhp.username, email: mhp.email, status: mhp.status });
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
        bmdcRegNo: mhp.bmdcRegNo,
        email: mhp.email,
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
// Update Registration Status (for approval/rejection)
export const updateRegistrationStatus = async (req, res) => {
  // const { userName } = req.params;
  const { email, status } = req.body; // expected: "approved" or "rejected"
  
  // Only allow valid status updates
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }
  
  try {
    const mhp = await MHP.findOne({ email: email });
    if (!mhp) {
      return res.status(404).json({ message: "MHP not found" });
    }
    mhp.status = status;
    await mhp.save();
    const resend = new Resend(`${process.env.RESEND_API_KEY}`);
    let emailResponse;
       try {
      console.log("Sending email to:", mhp.email);
      console.log("Using API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");
        console.log("Resend: ",resend);
      const emailData = {
        from: "onboarding@resend.dev", // Ensure this sender is verified
        to: mhp.email, // Can be a string or an array of strings
        subject: status === "approved" 
          ? "Shosti: Your Registration is Approved" 
          : "Shosti: Your Registration is Rejected",
        html: status === "approved"
          ? `<h2>Congratulations, ${mhp.username}!</h2>
             <p>Your registration has been approved by the Mental Health Admin.</p>
             <p>You can now sign in and complete your profile.</p>
             <p>Thank you for joining Shosti!</p>`
          : `<h2>Hello ${mhp.username},</h2>
             <p>We regret to inform you that your registration was not approved at this time.</p>
             <p>Please contact support or re-apply if you believe this is an error.</p>`,
      };

      console.log("Email Payload:", emailData);

     emailResponse = await resend.emails.send(emailData);

      console.log("Email Response:", emailResponse);

    } catch (emailError) {
      console.error("Error sending email via Resend:", emailError);
      return res.status(500).json({ message: "Failed to send email", error: emailError.message });
    }

    res.status(200).json({ message: `MHP registration ${status} successfully`, mhp, emailResponse });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: error.message });
  }
};

// New endpoint to get pending MHP registration requests
export const getPendingMHPRequests = async (req, res) => {
  try {
    const pendingMHPs = await MHP.find({ status: "pending" });
    res.status(200).json(pendingMHPs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};