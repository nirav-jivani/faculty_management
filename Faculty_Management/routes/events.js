const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const fs = require("fs");
const path = require("path");

router.post("/event-attended", authenticateUser, async (req, res) => {
  try {
    fs.mkdir(
      path.join(
        `${__dirname}/../uploads/event-attended`,
        JSON.stringify(req.user.id)
      ),
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        }
      }
    );
    const data = JSON.parse(req.body.data);
    const file = req.files.myfile;
    const fileName = `${__dirname}/../uploads/event-attended/${req.user.id}/${file.name}`;
    file.mv(fileName);
    if (!data.id) {
      const t = await db.promise().query(
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
          fileName,
        ]
      );
    } else {
      const t = await db.promise().query(
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
          fileName,
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
  const data = await db
    .promise()
    .query("SELECT * FROM event_attended WHERE FactId=?", [req.user.id]);
  res.json(data[0]);
});

module.exports = router;
