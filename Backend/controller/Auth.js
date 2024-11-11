import User from "../models/UserModel.js";
import Otp from "../models/OtpModel.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: `email already registered`,
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpBody = await Otp.create({ email, otp });
    res.status(200).json({
      success: true,
      message: `otp sent successfully`,
      otp,
    });
  } catch (error) {
    console.log("otp sending error: ", error);
    return res.status(401).json({
      success: false,
      message: `otp sending failed`,
    });
  }
};

// signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, contactNo, email, password, otp } = req.body;

    const emailAlreadyPresent = await User.findOne({ email });
    if (emailAlreadyPresent) {
      return res.status(401).json({
        success: false,
        message: `email already registered`,
      });
    }

    const recentOtps = await Otp.find({ email }).sort({ createdAt: -1 });
    if (recentOtps.length === 0 || recentOtps[0].otp !== otp) {
      return res.status(401).json({
        success: false,
        message: `incorrect otp`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      contactNo,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: `user created successfully`,
    });
  } catch (error) {
    console.log("signup error: ", error);
    return res.status(401).json({
      success: false,
      message: `something went wrong during signup`,
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: `all fields are required`,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: `email is not registered`,
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: `incorrect password`,
      });
    }

    const payload = { email: user.email, id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `2h`,
    });
    user.token = token;
    user.password = undefined;
    const options2 = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options2).status(200).json({
      success: true,
      token,
      user,
      message: `user logged in successfully`,
    });
  } catch (error) {
    console.log("login error: ", error);
    return res.status(401).json({
      success: false,
      message: `something went wrong during login`,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
    });
  }
};
