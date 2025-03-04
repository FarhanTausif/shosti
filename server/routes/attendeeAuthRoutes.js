import express from "express";
import { signupAttendee, signinAttendee, getAttendeeProfile, updateAttendeeProfile, getAllAttendeeProfile} from "../controllers/attendeeAuthController.js";

const router = express.Router();


router.post("/signup/attendee", signupAttendee);
router.post("/signin", signinAttendee);
router.get("/all", getAllAttendeeProfile );
router.get("/:userName", getAttendeeProfile);
router.put("/:userName", updateAttendeeProfile);

export default router;