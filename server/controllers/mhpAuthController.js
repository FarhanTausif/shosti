import bcrypt from "bcryptjs"
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
  