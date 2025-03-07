import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'gmail' or another service like 'yahoo', 'outlook'
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your App Password (not your actual password)
  },
});

// Function to send emails
export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_USER}`, // Sender address
      to: to, // Receiver email
      subject: subject, // Subject line
      html: html, // HTML body content
    });

    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
export const sendOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_USER}`, // Sender address
      to: email, // Receiver email
      subject: "Password Reset OTP", // Subject line
      html: `<h2>Your OTP for password reset is: ${otp}<h2>`, // HTML body content
    });

    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
