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
import Session from './models/Session.js';
import Attendee from './models/Attendee.js';
import resourceRoutes from "./routes/resourcesRoutes.js";
import signUploadRoutes from "./routes/sign-upload.js";
import { errorHandler } from "./middleware/error.js";
import { verifyToken, restrictTo } from './middleware/authMiddleware.js';

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
mongoose.connect(MONGO_URI).then(()=>console.log("Mongo-DB is connected")).catch((e) => console.log(e));


// Routes
app.use('/api/admin', adminAuthRoutes);
app.use("/api/auth", attendeeAuthRoutes);
app.use("/api/auth", mhpAuthRoutes);
app.use("/api/attendees", attendeeAuthRoutes);
app.use("/api/mhps", mhpAuthRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use('/api/sessions', sessionRoutes);
app.use("/api/professionals", professionalRoutes); 
app.use("/api/resources", resourceRoutes);
app.use("/api/sign-upload", signUploadRoutes);
app.use(errorHandler);


// Protected Routes Example
app.get('/api/admin/general/stats', 
  verifyToken,
  restrictTo('general-admin'),
  (req, res) => {
    res.json({ stats: 'General admin data' });
  }
);

// Handle payment success callback
app.post('/success/:sessionId', async (req, res) => {
  const sessionId  = req.params.sessionId;  // Capture sessionId and redirect_url
  
  try {
    // Update the session payment status to 'completed'
    const session = await Session.findById(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Update the payment status to 'completed'
    session.payment_status = 'completed';
    await session.save();
    
    const { attendee_email } = session;
    const attendee = await Attendee.findOne({ email: attendee_email });

    // Redirect back to the original page where the payment was initiated (redirect_url)
    res.redirect(`${process.env.CLIENT_URL}/dashboard/attendee/${attendee.username}#sessions`);  
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: 'Error updating payment status' });
  }
});


// Handle payment failure callback
app.get('/fail', (req, res) => {
  const { redirect_url } = req.query;
  console.log("====Failed====");
  res.redirect(redirect_url);  // Redirect back to the original page or to '/sessions'
});

// Handle payment cancel callback
app.get('/cancel', (req, res) => {
  const { redirect_url } = req.query;
  console.log("===CANCELED===");
  res.redirect(redirect_url );  // Redirect back to the original page or to '/sessions'
});

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