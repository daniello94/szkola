const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).json({ message: "Access denied" });

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    User.findOne({ _id: decoded._id }, function (err, user) {
     
      if (err) return res.status(403).json({ message: "Access denied" });
      if (user.role !== "student")
        return res.status(403).json({ message: "Access denied - you shoul be an student" });
      next();
    });
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};

