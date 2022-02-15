const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post("/event-attended", authenticateUser, async (req, res) => {
  const data = req.body;
  //   const file = data.File;
  //   file.mv(`D:/sem6/ddu_project/${file.name}`, (eer) => {
  //     console.log(err);
  //   });
  try {
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
          "",
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
          "",
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
  console.log(data[0]);
  res.json(data[0]);
});

module.exports = router;
