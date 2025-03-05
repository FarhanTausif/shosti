// server/routes/sign-upload.js
import express from "express";
import { generateSignature } from "../controllers/sign-upload.js";

const router = express.Router();

// POST: Get secure upload signature for a given folder (for video upload)
router.post("/", generateSignature);

export default router;
