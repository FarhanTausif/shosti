import express from "express";
import { signupAttendee } from "../controllers/attendeeAuthController.js";

const router = express.Router();

router.post("/signup/attendee", signupAttendee);

export default router;
