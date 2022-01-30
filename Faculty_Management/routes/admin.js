const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const bcrypt = require("bcryptjs");

router.post("/add-faculty", authenticateUser, async (req, res) => {
  const data = req.body;
  try {
    let salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.email, salt);
    const response = await db
      .promise()
      .query(
        "INSERT INTO faculties (Username,Password,JoinDate,DeptId) VALUES(?,?,?,?)",
        [data.email, password, data.joinDate, data.dept]
      );
    console.log(response);
    if (Boolean(response)) res.send({ success: true });
    else res.send({ data: { success: false, msg: "enter valid details" } });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.get("/get-departments", authenticateUser, async (req, res) => {
  try {
    const departments = await db.promise().query(`SELECT * FROM departments`);
    //console.log(departments[0]);
    res.json({ success: true, deptList: departments[0] });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

module.exports = router;
