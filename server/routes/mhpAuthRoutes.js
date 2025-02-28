import express from "express";
import { signupMHP, signinMHP } from "../controllers/mhpAuthController.js";
import { getProfile, updateProfile } from "../controllers/mhpAuthController.js";

const router = express.Router();

// MHP signup and signin routes
router.post("/signup/mhp", signupMHP);
router.post("/signin", signinMHP);

// Profile routes
router.get("/:userName", getProfile);  // GET request to fetch profile by username
router.put("/:userName", updateProfile);  // PUT request to update profile by username

export default router;