const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post("/login", async (req, res) => {
  const data = { success: true, msg: "Invalid Email/Password" };
  const { email, password } = req.body;
  if (email && password) {
    const user = await db
      .promise()
      .query(
        `SELECT * FROM faculty_info WHERE Email='${email}' and Password = '${password}'`
      );
    if (user[0].length > 0) {
      const token = jwt.sign({ user: user[0] }, "my_secret_key");
      data.user = user[0];
      data.token = token;
      data.msg = "";
      res.json(data);
    } else res.status(500).json(data);
  } else res.status(500).json(data);
});

router.get("/check", authenticateUser, (req, res) => {
  console.log("checking..");
  res.json({ tenp: "checked" });
});

module.exports = router;
