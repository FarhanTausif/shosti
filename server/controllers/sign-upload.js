import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const generateSignature = (req, res, next) => {
  const { folder } = req.body;
  // console.log("Foldar NAME: ",folder);
  if (!folder) {
    res.status(400);
    return next(new Error("Folder name is required"));
  }
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET
    );
    res.status(200).json({ timestamp, signature, api_key: process.env.CLOUDINARY_API_KEY});
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};
