import express from "express";
import { signupAttendee, signinAttendee } from "../controllers/attendeeAuthController.js";

const router = express.Router();

router.post("/signup/attendee", signupAttendee);
router.post("/signin", signinAttendee);

export default router;