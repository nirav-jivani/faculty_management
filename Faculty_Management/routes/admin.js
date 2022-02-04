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
        "INSERT INTO faculties (Username,Password,JoinDate,DeptId,DesignationId) VALUES(?,?,?,?,?)",
        [data.email, password, data.joinDate, data.department, data.designation]
      );
    console.log(response);
    if (Boolean(response)) res.send({ success: true });
    else res.send({ data: { success: false, msg: "enter valid details" } });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.get("/get-dept-designations", authenticateUser, async (req, res) => {
  try {
    const departments = await db.promise().query(`SELECT * FROM departments`);
    const designations = await db.promise().query(`SELECT * FROM designations`);
    //console.log(departments[0]);
    res.json({
      success: true,
      deptList: departments[0],
      designationList: designations[0],
    });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.get("/get-faculties/:isWorking", authenticateUser, async (req, res) => {
  const isWorking = req.params.isWorking === "1" ? 1 : 0;
  console.log(isWorking);
  try {
    const faculties = await db.promise().query(
      `SELECT * FROM faculties f inner join departments d on f.DeptId=d.id inner join designations ds on f.DesignationId = ds.id 
        where UserType != ? and Working = ? `,
      ["Admin", isWorking]
    );
    console.log(faculties[0]);
    res.json({ success: true, faculties: faculties[0] });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

module.exports = router;
