require("dotenv").config();
const User = require("../database/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  try {
    const {username, email, password, role } = req.body;
    console.log(username, email, password, role);

    const userAlreadyExist = await User.findOne({
      email
    });

    if (userAlreadyExist) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const cart = [];
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // Use string instead of User
      cartData: cart
    });

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "120m" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: accessToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    // Check if user exists
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const accessToken = jwt.sign(
      {
        id: currentUser._id,
        username: currentUser.username,
        role: currentUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "120m" }
    );

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        console.log(decoded);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: accessToken,
      user: {
        id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


module.exports = {userRegistration, userLogin}
