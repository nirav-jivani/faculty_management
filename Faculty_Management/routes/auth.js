const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const data = { success: true, msg: "Invalid Email/Password" };
    const { email, password } = req.body;
    const user = await db
      .promise()
      .query(`SELECT * FROM faculties WHERE Username=? `, [email]);
    if (
      user[0].length > 0 &&
      (await bcrypt.compare(password, user[0][0].Password))
    ) {
      const token = jwt.sign({ user: user[0] }, "my_secret_key");
      data.user = user[0][0];
      data.token = token;
      data.msg = "";
      res.json(data);
    } else res.status(500).json(data);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get("/check", authenticateUser, (req, res) => {
  console.log("checking..");
  res.json({ tenp: "checked" });
});

module.exports = router;
