// import mongoose from "mongoose";

// const ResourceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   type: { type: String, enum: ["article", "video"], required: true },
//   content: { type: String }, // For articles
//   mediaUrl: { type: String }, // For video URL from Cloudinary
//   categories: [{ type: String }], // e.g., ["stress management", "anxiety", "meditation"]
//   createdAt: { type: Date, default: Date.now },
// });
// const Resource = mongoose.model("Resource", ResourceSchema );
// export default Resource;

import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headline: { type: String }, // New headline field for articles
  type: { type: String, enum: ["article", "video"], required: true },
  content: { type: String }, // For articles
  mediaUrl: { type: String }, // For video URL from Cloudinary
  categories: [{ type: String }], // e.g., ["Stress Management", "Anxiety", ...]
  mhpName: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;
