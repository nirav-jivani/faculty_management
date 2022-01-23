const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const db = require("../database");
const auth = require("../config/validate");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    console.log(email, password);
    const user = await db
      .promise()
      .query(
        `SELECT * FROM faculty_info WHERE Email='${email}' and Password = '${password}'`
      );
    const user1 = user[0];
    if (user[0].length > 0) {
      const t = jwt.sign({ user1 }, "my_secret_key");
      const data = {
        user: user1,
        success: true,
        token: t,
      };
      res.json(data);
    } else res.status(500).json({ success: false });
  } else res.status(500).json({ success: false });
});

router.get("/check", auth, (req, res) => {
  console.log("checking..");
  res.json({ tenp: "checked" });
});

module.exports = router;
