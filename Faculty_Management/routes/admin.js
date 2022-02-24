const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./../config");

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
    let mailOptions;
    let response;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    const facultyExist = await db
      .promise()
      .query("SELECT Username FROM faculties WHERE Username=?", [data.email]);
    if (!data.id) {
      mailOptions = {
        from: EMAIL,
        to: data.email,
        subject: "DDU USER ACCOUNT PASSWORD",
        text: `Congratulations , you are registered into ddu.\n\nUsername : ${data.email} \nPassword : ${Password}`,
      };
      if (facultyExist[0].length == 0) {
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
      } else {
        response = false;
      }
    } else {
      if (
        data.oldEmail === facultyExist[0][0].Username ||
        facultyExist[0].length == 0
      ) {
        mailOptions = {
          from: EMAIL,
          to: data.email,
          subject: "DDU USER ACCOUNT UPDATE",
          text: `Your registered account is updated by admin....\n\nYour new username : ${data.email}`,
        };

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
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
      });
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
        where UserType != ? and Working = ? `,
      ["Admin", isWorking]
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
    console.log(err);
    res.send({ data: { success: false, msg: "internal server errr" } });
  }
});

module.exports = router;
