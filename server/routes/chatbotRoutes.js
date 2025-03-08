import express from 'express';
import { chatWithAI } from '../controllers/chatbotController.js';

const router = express.Router();
router.post("/chat", chatWithAI);

export default router;