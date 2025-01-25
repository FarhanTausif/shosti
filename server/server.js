import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import attendeeAuthRoutes from "./routes/attendeeAuthRoutes.js";
import mhpAuthRoutes from "./routes/mhpAuthRoutes.js";

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


// Protected Routes Example
app.get('/api/admin/general/stats', 
  verifyToken,
  restrictTo('general-admin'),
  (req, res) => {
    res.json({ stats: 'General admin data' });
  }
);

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