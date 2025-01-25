import mongoose from "mongoose";

const MHPSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bmdcRegNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const MHP = mongoose.model("MHP", MHPSchema);
export default MHP;

