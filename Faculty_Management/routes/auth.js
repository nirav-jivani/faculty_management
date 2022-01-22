const { Router } = require("express");
const router = Router();
const db = require("../database");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    console.log(email, password);
    const user = await db
      .promise()
      .query(
        `SELECT * FROM faculty_info WHERE Email='${email}' and Password = '${password}'`
      );
    console.log(user[0]);
    if (user[0].length > 0) {
      const data = {
        user: user[0],
        success: true,
        token: "ekjassjkhadzk",
      };
      res.json(data);
    } else res.status(500).json({ success: false });
  } else res.status(500).json({ success: false });
});

module.exports = router;
