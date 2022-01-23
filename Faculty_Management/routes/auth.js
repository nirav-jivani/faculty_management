const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await db
      .promise()
      .query(
        `SELECT * FROM faculty_info WHERE Email='${email}' and Password = '${password}'`
      );
    if (user[0].length > 0) {
      const token = jwt.sign({ user : user[0] }, "my_secret_key");
      res.json({user: user[0], success: true, token: token});
    } else res.status(500).json({ success: false, msg : "Invalid Email/Password" });
  } else res.status(500).json({ success: false });
});

router.get("/check", authenticateUser, (req, res) => {
  console.log("checking..");
  res.json({ tenp: "checked" });
});

module.exports = router;
