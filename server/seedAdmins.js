import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

// Load environment variables
dotenv.config({ path: './.env' }); // Adjust path if needed

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    seedAdmins();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const seedAdmins = async () => {
  try {
    const admins = [
      {
        name: 'TausifBillah',
        email: 'general@gmail.com',
        password: await bcrypt.hash('GeneralAdminPassword123!', 10),
        role: 'general-admin',
      },
      {
        name: 'MustakimMollah',
        email: 'mh@gmail.com',
        password: await bcrypt.hash('MHAdminPassword456!', 10),
        role: 'mh-admin',
      },
    ];

    await Admin.deleteMany({});
    await Admin.insertMany(admins);
    console.log('Admins seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};
