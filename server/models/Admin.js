import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['general-admin', 'mh-admin'], // Enforce valid roles
    required: true,
  },
  // Add other fields if needed (e.g., name)
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;