import mongoose from "mongoose";

const MHPSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bmdcRegNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String,  },
  location: { type: String,  },
  rosterOnline: { type: Object, default: {} },
  rosterOffline: { type: Object, default: {} },
  education: { type: String,  },
  status: { 
    type: String, 
    enum: ["approved", "rejected", "pending"], 
    default: "pending" 
  },
});

const MHP = mongoose.model("MHP", MHPSchema);
export default MHP;
