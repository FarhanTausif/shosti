import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


export const chatWithAI = async (req, res) => {
  const userMessage = req.body.message;
  try {   
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", 
    });
    const result = await model.generateContent(userMessage);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Error generating response" });
  }
};
