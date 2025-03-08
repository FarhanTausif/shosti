import express from 'express';
import { chatWithAI } from '../services/chatbotService.js';

const router = express.Router();

router.post("/chat", chatWithAI);

export default router;