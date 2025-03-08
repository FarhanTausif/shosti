import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_USER}`, 
      to: to, 
      subject: subject, 
      html: html, 
    });

    // console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export const sendOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_USER}`, 
      to: email, 
      subject: "Password Reset OTP", 
      html: `<h2>Your OTP for password reset is: ${otp}<h2>`, 
    });

    // console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
