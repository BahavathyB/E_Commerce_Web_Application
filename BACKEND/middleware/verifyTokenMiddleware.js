// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const User = require("../database/User");

const verifyToken = async (req, res, next) => {
    console.log("inside verify token");
    
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    
    const current_user = await User.findById(decoded.id);

    if (!current_user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userInfo = current_user;
    console.log(req.userInfo)
    next();
  } catch (error) {
    console.log(error);
    
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
