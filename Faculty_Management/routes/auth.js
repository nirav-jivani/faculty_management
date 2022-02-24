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
    const user = await db.promise().query(
      `SELECT *,f.id FROM faculties f inner join departments d on f.DeptId=d.id inner join designations ds on f.DesignationId = ds.id 
        where Username = ? and Working = ? `,
      [email, 1]
    );
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

router.post("/update-account", authenticateUser, async (req, res) => {
  const data = req.body;
  try {
    const temp = await db
      .promise()
      .query(
        `UPDATE faculties SET Username=?, FirstName=?, MiddleName=?, LastName=?, BirthDate=?, Qualification=?, Gender=?, YearOfExperience=? WHERE id = ?`,
        [
          data.email,
          data.firstName,
          data.middleName,
          data.lastName,
          data.birthDate,
          data.qualification,
          data.gender,
          data.yoe,
          req.user.id,
        ]
      );
    const user = await db.promise().query(
      `SELECT *,f.id FROM faculties f inner join departments d on f.DeptId=d.id inner join designations ds on f.DesignationId = ds.id 
        where f.id=? `,
      [req.user.id]
    );
    res.json({ success: true, user: user[0][0] });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});
router.post("/change-password", authenticateUser, async (req, res) => {
  const data = req.body;
  try {
    const temp = await db
      .promise()
      .query(`SELECT Password FROM faculties  WHERE id = ?`, [req.user.id]);

    if (
      (await bcrypt.compare(data.oldPassword, temp[0][0].Password)) &&
      data.newPassword === data.confirmPassword
    ) {
      let salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(data.newPassword, salt);
      const user = await db
        .promise()
        .query(`UPDATE  faculties SET Password = ? WHERE id=? `, [
          password,
          req.user.id,
        ]);

      res.json({ success: true });
    }
    res.json({ success: false, msg: "Password doesn't match.." });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});
module.exports = router;
