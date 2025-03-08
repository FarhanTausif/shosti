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
router.get("/:userName", getProfile);  
router.put("/:userName", updateProfile);  





export default router;