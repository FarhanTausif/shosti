import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET","POST","DELETE","PUT"],
        allowedHeaders: ["Content-Type","Authorization"],
    })
);

app.use(express.json());

//database connection

 mongoose.connect(MONGO_URI).
 then(()=>console.log("Mongo-DB is connected")).
 catch((e) => console.log(e));

// Use the routes
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});