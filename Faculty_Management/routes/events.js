const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post("/add-event", authenticateUser, async (req, res) => {
  const data = req.body;
  //   const file = data.File;
  //   file.mv(`D:/sem6/ddu_project/${file.name}`, (eer) => {
  //     console.log(err);
  //   });
  if (!data.id) {
    const t = await db.promise().query(
      `INSERT INTO event_management (fact_id, organization_name, organizer_name, event_type, mode,
               title, speaker_name, event_role, venue, duration, participants, to_date, from_date,
               academic_year, doc_proof, approved_by ) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.Id,
        data.organizedBy,
        data.factName,
        data.type,
        data.mode,
        data.title,
        data.factName,
        "conducted",
        data.organizedAt,
        data.duration,
        data.participants,
        data.toDate,
        data.fromDate,
        data.academicYear,
        "abc",
        data.approvedBy,
      ]
    );
  } else {
    const t = await db.promise().query(
      `UPDATE event_management SET organization_name = ?, organizer_name=?, event_type=?, mode=?,
               title=?, speaker_name=?, event_role=?, venue=?, duration=?, participants=?, to_date=?, from_date=?,
               academic_year=?, doc_proof=?, approved_by=? WHERE id=?`,
      [
        data.organizedBy,
        data.factName,
        data.type,
        data.mode,
        data.title,
        data.factName,
        "conducted",
        data.organizedAt,
        data.duration,
        data.participants,
        data.toDate,
        data.fromDate,
        data.academicYear,
        "abc",
        data.approvedBy,
        data.id,
      ]
    );
  }
  res.json({ success: true });
});

router.get("/get-events", authenticateUser, async (req, res) => {
  const data = await db
    .promise()
    .query(
      "SELECT * FROM event_management WHERE fact_id=? and event_role='conducted'",
      [req.user.Id]
    );
  console.log(data[0]);
  res.json(data[0]);
});

module.exports = router;
