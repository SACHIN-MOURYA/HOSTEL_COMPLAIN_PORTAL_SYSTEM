import mongoose from "mongoose";
import mailSender from "../utils/mailsender.js"; // Import mail sender utility

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // OTP expires in 5 minutes (time is in seconds)
  },
});

export const Otp = mongoose.model("Otp", otpSchema);