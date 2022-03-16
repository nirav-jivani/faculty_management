const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");

router.post(
  "/add-or-update-research-paper",
  authenticateUser,
  async (req, res) => {
    try {
      const data = req.body;
      let response;
      if (data.id === "") {
        if (data.type === "Conference") {
          response = await db.promise().query(
            `INSERT INTO research_conferences (FactId,ResearchTitle,Level,ConferenceTitle,StartDate,EndDate,ConferenceName,
                Organizer,City,State,Country,Publisher,PublicationDate,Pages,DOI,ISBN,	AffiliatingInstitute,AcademicYear) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              req.user.id,
              data.researchTitle,
              data.level,
              data.title,
              data.fromDate,
              data.toDate,
              data.conferenceName,
              data.organizer,
              data.city,
              data.state,
              data.country,
              data.publisher,
              data.publicationDate,
              data.pages,
              data.doi,
              data.isbn,
              data.institute,
              data.academicYear,
            ]
          );
        } else {
          response = await db.promise().query(
            `INSERT INTO research_journals (FactId,ResearchTitle,Level,JournalTitle,Publisher,Link,PublicationDate,VolumeNo,
            PublicationNo,Pages,DOI,ISBN,ImpactFactor,ImpactFactorYear,ImpactFactorAgency,HIndex,AcademicYear) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              req.user.id,
              data.researchTitle,
              data.level,
              data.title,
              data.publisher,
              data.link,
              data.publicationDate,
              data.volumeNo,
              data.publicationNo,
              data.pages,
              data.doi,
              data.isbn,
              data.impactFactor,
              data.impactYear,
              data.impactAgency,
              data.hIndex,
              data.academicYear,
            ]
          );
        }
      } else {
        if (data.type === "Conference") {
          response = await db.promise().query(
            `UPDATE research_conferences SET ResearchTitle=?,Level=?,ConferenceTitle=?,StartDate=?,EndDate=?,ConferenceName=?,
                Organizer=?,City=?,State=?,Country=?,Publisher=?,PublicationDate=?,Pages=?,DOI=?,ISBN=?,AffiliatingInstitute=?,AcademicYear=?
                WHERE id=?`,
            [
              data.researchTitle,
              data.level,
              data.title,
              data.fromDate,
              data.toDate,
              data.conferenceName,
              data.organizer,
              data.city,
              data.state,
              data.country,
              data.publisher,
              data.publicationDate,
              data.pages,
              data.doi,
              data.isbn,
              data.institute,
              data.academicYear,
              data.id,
            ]
          );
          await db
            .promise()
            .query(`DELETE FROM conference_authors where ConfId = ?`, [
              data.id,
            ]);
        } else {
          response = await db.promise().query(
            `UPDATE research_journals SET ResearchTitle=?,Level=?,JournalTitle=?,Publisher=?,Link=?,PublicationDate=?,VolumeNo=?,
            PublicationNo=?,Pages=?,DOI=?,ISBN=?,ImpactFactor=?,ImpactFactorYear=?,ImpactFactorAgency=?,HIndex=?,AcademicYear=?
            WHERE id = ?`,
            [
              data.researchTitle,
              data.level,
              data.title,
              data.publisher,
              data.link,
              data.publicationDate,
              data.volumeNo,
              data.publicationNo,
              data.pages,
              data.doi,
              data.isbn,
              data.impactFactor,
              data.impactYear,
              data.impactAgency,
              data.hIndex,
              data.academicYear,
              data.id,
            ]
          );
          await db
            .promise()
            .query(`DELETE FROM journal_authors where JournalId = ?`, [
              data.id,
            ]);
        }
      }
      const publicationId = data.id !== "" ? data.id : response[0].insertId;
      for (let author of data.authors) {
        if (author.name !== "") {
          let authorId;
          let t = await db
            .promise()
            .query(
              "SELECT * FROM authors WHERE Name=? and Department=? and Organization=?",
              [author.Name, author.Department, author.Organization]
            );
          if (t[0].length === 0) {
            t = await db
              .promise()
              .query(
                "INSERT INTO authors (Name,Department,Organization) VALUES(?,?,?)",
                [author.Name, author.Department, author.Organization]
              );
            authorId = t[0].insertId;
          } else {
            authorId = t[0][0].id;
          }
          if (data.type === "Conference") {
            await db
              .promise()
              .query(
                "INSERT INTO conference_authors (ConfId,AuthId) VALUES(?,?)",
                [publicationId, authorId]
              );
          } else {
            await db
              .promise()
              .query(
                "INSERT INTO journal_authors (JournalId,AuthId) VALUES(?,?)",
                [publicationId, authorId]
              );
          }
        }
      }

      res.json({ success: true });
    } catch (err) {
      const data = { success: false, msg: "internal server Error" };
      res.status(500).json(data);
    }
  }
);

router.get("/get-conferences", authenticateUser, async (req, res) => {
  try {
    let conferences = await db
      .promise()
      .query("SELECT * FROM research_conferences WHERE FactId=?", [
        req.user.id,
      ]);
    conferences = conferences[0];
    for (let i = 0; i < conferences.length; i++) {
      let authors = await db
        .promise()
        .query(
          "SELECT a.id,Name,Department,Organization FROM conference_authors ca INNER JOIN authors a WHERE ca.AuthId = a.id and ca.ConfId = ? ORDER BY  ca.id ASC",
          [conferences[i].id]
        );
      conferences[i].authors = authors[0];
    }
    res.json(conferences);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get("/get-journals", authenticateUser, async (req, res) => {
  try {
    let journals = await db
      .promise()
      .query("SELECT * FROM research_journals WHERE FactId=?", [req.user.id]);
    journals = journals[0];
    for (let i = 0; i < journals.length; i++) {
      let authors = await db
        .promise()
        .query(
          "SELECT a.id,Name,Department,Organization FROM journal_authors ja INNER JOIN authors a WHERE ja.AuthId = a.id and ja.JournalId = ? ORDER BY  ja.id ASC",
          [journals[i].id]
        );
      journals[i].authors = authors[0];
    }
    res.json(journals);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});
router.post("/delete-conference", authenticateUser, async (req, res) => {
  try {
    await db
      .promise()
      .query("DELETE FROM conference_authors WHERE ConfId=?", [req.body.id]);

    await db
      .promise()
      .query("DELETE FROM research_conferences WHERE id=?", [req.body.id]);
    res.json({ success: true });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.post("/delete-journal", authenticateUser, async (req, res) => {
  try {
    await db
      .promise()
      .query("DELETE FROM journal_authors WHERE JournalId=?", [req.body.id]);

    await db
      .promise()
      .query("DELETE FROM research_journals WHERE id=?", [req.body.id]);
    res.json({ success: true });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});
module.exports = router;
