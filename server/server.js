import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import attendeeAuthRoutes from "./routes/attendeeAuthRoutes.js";
import mhpAuthRoutes from "./routes/mhpAuthRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import resourceRoutes from "./routes/resourcesRoutes.js";
import signUploadRoutes from "./routes/sign-upload.js";
import forgetRoutes from "./routes/forgetRoutes.js"
import { errorHandler } from "./middleware/error.js";
import { handlePaymentCancel, handlePaymentFailure, handlePaymentSuccess } from './controllers/paymentController.js';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(
      cors({
          origin: process.env.CLIENT_URL,
          methods: ["GET","POST","DELETE","PUT"],
          allowedHeaders: ["Content-Type","Authorization"],
      })
  );
app.use(express.json()); // JSON body parsing

// Database connection
mongoose.connect(MONGO_URI).then(()=>console.log("MongoDB is connected")).catch((e) => console.log(e));


// Routes
app.use('/api/admin', adminAuthRoutes);
app.use("/api/auth", attendeeAuthRoutes);
app.use("/api/auth", mhpAuthRoutes);
app.use("/api/attendees", attendeeAuthRoutes);
app.use("/api/mhps", mhpAuthRoutes);
app.use("/api/forgot",forgetRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use('/api/sessions', sessionRoutes);
app.use("/api/professionals", professionalRoutes); 
app.use("/api/resources", resourceRoutes);
app.use("/api/sign-upload", signUploadRoutes);
app.use(errorHandler);
app.post('/success/:sessionId', handlePaymentSuccess);
app.post('/fail/:sessionId', handlePaymentFailure);
app.post('/cancel/:sessionId', handlePaymentCancel);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});