const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../config");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({ msg: "no token Access denied " });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user[0];
    next();
  } catch (err) {
    res.status(401).json({ msg: "no token Access denied " });
  }
};
