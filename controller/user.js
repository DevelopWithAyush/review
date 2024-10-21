import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { cookieOption, sendToken } from "../utility/features.js";
import { ErrorHandler, TryCatch } from "../utility/utility.js";

export const handleSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400)); // 400 Bad Request
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(new ErrorHandler("User already exists", 409)); // 409 Conflict
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    sendToken(res, newUser, 201, `Welcome!`);
  } catch (error) {
    // Properly forward the error to the custom error handler
    next(new ErrorHandler("Server error. Please try again later.", 500));
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400)); // 400 Bad Request
  }

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return next(new ErrorHandler("User does not exist", 404)); // 404 Not Found
    }

    // Explicitly compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid credentials", 401)); // 401 Unauthorized
    }

    sendToken(res, userExist, 201, `Welcome!`);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const handleLogout = TryCatch(async (req, res, next) => {
    return res
        .status(200)
        .cookie("authToken", "", { ...cookieOption, maxAge: 0 })
        .json({
            success: true,
            message: "Logged out successfully",
        });
});


export const handleMyProfile = TryCatch(async (req, res, nextt) => {
    const myProfile = await User.findById(req.user);
    res.status(200).json({ success: true, myProfile });
});