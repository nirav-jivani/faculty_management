const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const fs = require("fs");

router.post("/event-attended", authenticateUser, async (req, res) => {
  try {
    let filePath = "";
    if (req.files.myfile) {
      const file = req.files.myfile;
      if (!fs.existsSync(`${__dirname}/../uploads/event-attended/${req.user.id}`)) {
        fs.mkdir(`${__dirname}/../uploads/event-attended/${req.user.id.toString()}`,
          { recursive: true },
          (err) => {
            if (err) {
              return console.error(err);
            }
          }
        );
        filePath = `${__dirname}/../uploads/event-attended/${req.user.id.toString()}/${file.name}_${new Date().toDateString()}`;
        file.mv(filePath);
      }
    }
    const data = JSON.parse(req.body.data);
    if (!data.id) {
      await db.promise().query(
        `INSERT INTO event_attended (FactId, EventTitle, OrganizedBy, OrganizedAt, StartDate,
               EndDate, Duration, SpeakerName, EventTopic, EventLevel, EventType,OtherType, EventMode, AcedemicYear,
               ApprovedBy,CertificatePath ) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          req.user.id,
          data.title,
          data.organizedBy,
          data.organizedAt,
          data.fromDate,
          data.toDate,
          data.duration,
          data.speakerName,
          data.topic,
          data.level,
          data.type,
          data.otherType,
          data.mode,
          data.academicYear,
          data.approvedBy,
          filePath,
        ]
      );
    } else {
      await db.promise().query(
        `UPDATE event_attended SET EventTitle= ?, OrganizedBy= ?, OrganizedAt= ?, StartDate= ?,
               EndDate= ?, Duration= ?, SpeakerName= ?, EventTopic= ?, EventLevel= ?, EventType= ?,OtherType= ?, EventMode= ?, AcedemicYear= ?,
               ApprovedBy= ?,CertificatePath= ? WHERE id = ? `,
        [
          data.title,
          data.organizedBy,
          data.organizedAt,
          data.fromDate,
          data.toDate,
          data.duration,
          data.speakerName,
          data.topic,
          data.level,
          data.type,
          data.otherType,
          data.mode,
          data.academicYear,
          data.approvedBy,
          filePath,
          data.id,
        ]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get("/get-events", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT * FROM event_attended WHERE FactId=?", [req.user.id]);
    res.json(data[0]);
  }
  catch (err) {
    console.log(err);
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

module.exports = router;
