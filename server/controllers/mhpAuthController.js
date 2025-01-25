import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MHP from "../models/MHP.js";

// Signup for MHP
export const signupMHP = async (req, res) => {
    const { username, bmdcRegNo, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const mhp = new MHP({ username, bmdcRegNo, email, password: hashedPassword });
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
  
      res.status(200).json({ message: "Login successful", token, userType: "mhp" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };