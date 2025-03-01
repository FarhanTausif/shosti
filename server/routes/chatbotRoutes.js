import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY=process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("userMessage: ", userMessage);
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",  // Adjust model as needed
    });

    // Generate response using the user's message as prompt
    const result = await model.generateContent(userMessage);

    // Check the result before sending it to frontend
    console.log("Gemini API Response:", result);

    // Send the result to the frontend
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

export default router;