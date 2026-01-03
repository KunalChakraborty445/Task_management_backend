import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.utils.js";
import ErrorHandler from "../middlewares/error.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !name ||
      !email ||
      !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return generateToken(user, "User registered", 201, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });

    return generateToken(user, "Logged in successfully", 200, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const logoutUser = (req, res) => {
  res
    .cookie("userToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ success: true, message: "Logged out" });
};

