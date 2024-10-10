const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Authentication failed" });
  }
};

module.exports = auth;
