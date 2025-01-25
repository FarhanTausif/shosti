import express from "express";
import { signupMHP, signinMHP } from "../controllers/mhpAuthController.js";

const router = express.Router();

router.post("/signup/mhp", signupMHP);
router.post("/signin", signinMHP);

export default router;