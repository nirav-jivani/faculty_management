const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post("/add-event", authenticateUser, async (req, res) => {
    const data = req.body;
    console.log(data);
    const t = await db
        .promise()
        .query(
            `INSERT INTO event_management (fact_id, organization_name, organizer_name, event_type, 
             title, speaker_name, event_role, venue, duration, participants, to_date, from_date,
             academic_year, doc_proof, approved_by ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
             [data.fact_id, data.organizedBy, data.factName, data.type, data.title, data.factName, 
                "conducted", data.organizedAt, data.duration, 1000, data.toDate, data.fromDate, 
                data.academicYear, "abc", data.approvedBy]
        );
    console.log(t);
    res.json({success:true});
});

module.exports = router;
