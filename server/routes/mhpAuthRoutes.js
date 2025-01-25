import express from "express";
import { signupMHP } from "../controllers/mhpAuthController.js";

const router = express.Router();

router.post("/signup/mhp", signupMHP);

export default router;
