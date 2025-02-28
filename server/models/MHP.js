// import mongoose from "mongoose";

// const MHPSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   bmdcRegNo: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const MHP = mongoose.model("MHP", MHPSchema);
// export default MHP;

import mongoose from "mongoose";

const MHPSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bmdcRegNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  location: { type: String, required: true },
  rosterOnline: { type: String, required: true },  // Day-Time format
  rosterOffline: { type: String, required: true },  // Day-Time format
  education: { type: String, required: true },  // Educational Qualification
});

const MHP = mongoose.model("MHP", MHPSchema);
export default MHP;
