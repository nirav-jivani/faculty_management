const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const bcrypt = require("bcryptjs");
const { EMAIL, PASSWORD } = require("./../config");
const sendEmail = require("./../sendEmail");

const generatePassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

router.post("/add-faculty", authenticateUser, async (req, res) => {
  try {
    const data = req.body;
    const Password = generatePassword();
    let subject,
      text,
      response,
      ccEmail = "";

    const facultyExist = await db
      .promise()
      .query("SELECT Username FROM faculties WHERE Username=?", [data.email]);
    console.log(facultyExist);
    if (!data.id) {
      if (facultyExist[0].length === 0) {
        subject = "DDU USER ACCOUNT PASSWORD";
        text = `Congratulations , you are registered into ddu.</br></br>Username : ${data.email} \nPassword : ${Password}`;
        let salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(Password, salt);
        response = await db
          .promise()
          .query(
            "INSERT INTO faculties (Username,Password,JoinDate,DeptId,DesignationId,FirstName,LastName) VALUES(?,?,?,?,?,?,?)",
            [
              data.email,
              password,
              data.joinDate,
              data.department,
              data.designation,
              data.firstName,
              data.lastName,
            ]
          );
        const user = await db
          .promise()
          .query("SELECT id FROM faculties WHERE Username=?", [data.email]);

        await db
          .promise()
          .query("INSERT INTO faculty_roles (FactId,RoleId) VALUES(?,?)", [
            user[0][0].id,
            2,
          ]);
      } else {
        response = false;
      }
    } else {
      if (
        (facultyExist[0].length !== 0 &&
          data.oldEmail === facultyExist[0][0].Username) ||
        facultyExist[0].length === 0
      ) {
        if (data.oldEmail !== data.email) ccEmail = data.oldEmail;
        subject = "DDU USER ACCOUNT UPDATE";
        text = `Your registered account is updated by admin.</br></br>Your new username : ${data.email}`;

        response = await db
          .promise()
          .query(
            "UPDATE faculties SET Username=?,JoinDate=?,DeptId=?,DesignationId=?,FirstName=?,LastName=? WHERE id = ?",
            [
              data.email,
              data.joinDate,
              data.department,
              data.designation,
              data.firstName,
              data.lastName,
              data.id,
            ]
          );
      } else {
        response = false;
      }
    }
    if (Boolean(response)) {
      sendEmail(data.email, subject, text, ccEmail);
      res.send({ success: true });
    } else res.send({ success: false, msg: "Email address already exist.." });
  } catch (err) {
    console.log(err);
    res.send({ success: false, msg: "internal server errr" });
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
  try {
    const faculties = await db.promise().query(
      `SELECT *,f.id FROM faculties f inner join departments d on f.DeptId=d.id inner join designations ds on f.DesignationId = ds.id 
        where f.id not in (select FactId from faculty_roles where RoleId= ?) and Working = ? `,
      [1, isWorking]
    );
    res.json({ success: true, faculties: faculties[0] });
  } catch (err) {
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.post("/delete-faculty", authenticateUser, async (req, res) => {
  try {
    await db
      .promise()
      .query(`UPDATE faculties SET Working = ? WHERE id =?`, [0, req.body.id]);
    res.json({ success: true });
  } catch (err) {
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.get("/get-roles/:id", authenticateUser, async (req, res) => {
  try {
    const empId = req.params.id;
    const roles = await db.promise().query(`SELECT * FROM roles`);

    const empRoles = await db
      .promise()
      .query(
        `SELECT * FROM roles WHERE id in (select RoleId from faculty_roles WHERE FactId = ?)`,
        [empId]
      );
    let eroles = [];
    for (var role of empRoles[0]) eroles.push(role.RoleName);
    res.json({ empRoles: eroles, roles: roles[0], success: true });
  } catch (err) {
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

router.post("/update-roles", authenticateUser, async (req, res) => {
  try {
    const roles = req.body.roles;
    await db
      .promise()
      .query(`DELETE FROM faculty_roles WHERE FactId=? `, [req.body.id]);
    let roleIds = Object.keys(roles);
    for (var roleId of roleIds) {
      if (roles[roleId]) {
        await db
          .promise()
          .query(`INSERT INTO faculty_roles (FactId,RoleId) VALUES (?,?) `, [
            req.body.id,
            roleId,
          ]);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

module.exports = router;
