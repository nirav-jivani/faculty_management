const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["x-auth-token"];
  console.log(token)
  if (!token) {
    console.log("err");
    return res.status(401).json({ msg: "no token Access denied " });
  }
  try {
    console.log("success");
    const decoded = jwt.verify(token, "my_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "no token Access denied " });
  }
};
