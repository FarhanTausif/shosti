import express from "express";
import { signupMHP, signinMHP } from "../controllers/mhpAuthController.js";
import { getProfile, updateProfile,updateRegistrationStatus, getPendingMHPRequests } from "../controllers/mhpAuthController.js";

const router = express.Router();

// MHP signup and signin routes
router.post("/signup/mhp", signupMHP);
router.post("/signin", signinMHP);
router.get("/requests", getPendingMHPRequests);
router.put("/status/:userName", updateRegistrationStatus);
// Profile routes
router.get("/:userName", getProfile);  // GET request to fetch profile by username
router.put("/:userName", updateProfile);  // PUT request to update profile by username
// New route to update registration status (approve/reject)
// New route to fetch pending registration requests




export default router;