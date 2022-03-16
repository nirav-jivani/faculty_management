const { Router } = require("express");
const router = Router();
const db = require("../database");
const authenticateUser = require("../middlewares/validate");
const fs = require("fs");
const pathForFile = require("path");

const createDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
};

const deleteFile = (path) => {
  fs.unlink(`${__dirname}/../uploads/${path}`, (err) => {
    if (err) throw err;
  });
};

//Event Attended ------start------

router.post(
  "/add-or-update-event-attended",
  authenticateUser,
  async (req, res) => {
    try {
      let dirpath = `${__dirname}/../uploads/event-attended`;
      let fileName = "";
      if (req.files && req.files.myfile) {
        createDir(`${dirpath}/${req.user.id.toString()}`);

        const file = req.files.myfile;
        const temp = file.name.split(".");
        fileName = `${temp
          .slice(0, -1)
          .join("_")
          .split(" ")
          .join("_")}_${new Date()
          .toDateString()
          .split(" ")
          .join("_")}_${new Date()
          .toLocaleTimeString()
          .split(":")
          .join("_")
          .split(" ")
          .join("_")}.${temp[temp.length - 1]}`;
        const filePath = `${dirpath}/${req.user.id.toString()}/${fileName}`;
        file.mv(filePath);
      }
      const data = JSON.parse(req.body.data);
      if (!data.id) {
        await db.promise().query(
          `INSERT INTO event_attended (FactId, EventTitle, OrganizedBy, OrganizedAt, StartDate,
               EndDate, Duration, SpeakerName, EventTopic, EventLevel, EventType,OtherType, EventMode, AcademicYear,
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
        if (fileName && data.CertificatePath) {
          deleteFile(
            `event-attended/${req.user.id.toString()}/${data.CertificatePath}`
          );
        }
        data.CertificatePath = fileName ? fileName : data.CertificatePath;
        await db.promise().query(
          `UPDATE event_attended SET EventTitle= ?, OrganizedBy= ?, OrganizedAt= ?, StartDate= ?,
               EndDate= ?, Duration= ?, SpeakerName= ?, EventTopic= ?, EventLevel= ?, EventType= ?,OtherType= ?, EventMode= ?, AcademicYear= ?,
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
            data.CertificatePath,
            data.id,
          ]
        );
      }
      res.json({ success: true });
    } catch (err) {
      const data = { success: false, msg: "internal server Error" };
      res.status(500).json(data);
    }
  }
);

router.get("/get-events-attended", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT * FROM event_attended WHERE FactId=?", [req.user.id]);
    res.json(data[0]);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});
router.post("/delete-event-attended", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT CertificatePath FROM event_attended WHERE id=?", [
        req.body.id,
      ]);
    if (data[0][0].CertificatePath !== "")
      deleteFile(
        `event-attended/${req.user.id.toString()}/${data[0][0].CertificatePath}`
      );

    await db
      .promise()
      .query("DELETE FROM event_attended WHERE id=?", [req.body.id]);
    res.json({ success: true });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get(
  "/get-certificate-event-attended/:id",
  authenticateUser,
  async (req, res) => {
    const file = await db
      .promise()
      .query("SELECT CertificatePath FROM event_attended WHERE id=?", [
        req.params.id,
      ]);
    res.sendFile(
      pathForFile.resolve(
        `${__dirname}/../uploads/event-attended/${req.user.id.toString()}/${
          file[0][0].CertificatePath
        }`
      )
    );
  }
);

//Event Attended ---------End-------------------!

//Event Conducted ---------Start-------------------!

router.post(
  "/add-or-update-event-conducted",
  authenticateUser,
  async (req, res) => {
    try {
      let dirpath = `${__dirname}/../uploads/event-conducted`;
      let fileName = "";
      if (req.files && req.files.myfile) {
        createDir(`${dirpath}/${req.user.id.toString()}`);

        const file = req.files.myfile;
        const temp = file.name.split(".");
        fileName = `${temp
          .slice(0, -1)
          .join("_")
          .split(" ")
          .join("_")}_${new Date()
          .toDateString()
          .split(" ")
          .join("_")}_${new Date()
          .toLocaleTimeString()
          .split(":")
          .join("_")
          .split(" ")
          .join("_")}.${temp[temp.length - 1]}`;
        const filePath = `${dirpath}/${req.user.id.toString()}/${fileName}`;
        file.mv(filePath);
      }
      const data = JSON.parse(req.body.data);
      if (!data.id) {
        await db.promise().query(
          `INSERT INTO event_conducted (FactId, EventTitle, OrganizedBy, ConductedAt, StartDate,
               EndDate, Duration, TotalParticipants, EventTopic, EventLevel, EventType,OtherType, EventMode, AcademicYear,
               ApprovedBy,ProofPath ) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            req.user.id,
            data.title,
            data.organizedBy,
            data.conductedAt,
            data.fromDate,
            data.toDate,
            data.duration,
            data.participants,
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
        if (fileName && data.ProofPath) {
          deleteFile(
            `event-conducted/${req.user.id.toString()}/${data.ProofPath}`
          );
        }
        data.ProofPath = fileName ? fileName : data.ProofPath;
        await db.promise().query(
          `UPDATE event_conducted SET EventTitle= ?, OrganizedBy= ?, ConductedAt= ?, StartDate= ?,
               EndDate= ?, Duration= ?, TotalParticipants= ?, EventTopic= ?, EventLevel= ?, EventType= ?,OtherType= ?, EventMode= ?, AcademicYear= ?,
               ApprovedBy= ?,ProofPath= ? WHERE id = ? `,
          [
            data.title,
            data.organizedBy,
            data.conductedAt,
            data.fromDate,
            data.toDate,
            data.duration,
            data.participants,
            data.topic,
            data.level,
            data.type,
            data.otherType,
            data.mode,
            data.academicYear,
            data.approvedBy,
            data.ProofPath,
            data.id,
          ]
        );
      }
      res.json({ success: true });
    } catch (err) {
      const data = { success: false, msg: "internal server Error" };
      res.status(500).json(data);
    }
  }
);

router.get("/get-events-conducted", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT * FROM event_conducted WHERE FactId=?", [req.user.id]);
    res.json(data[0]);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.post("/delete-event-conducted", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT ProofPath FROM event_conducted WHERE id=?", [req.body.id]);
    if (data[0][0].ProofPath !== "")
      deleteFile(
        `event-conducted/${req.user.id.toString()}/${data[0][0].ProofPath}`
      );

    await db
      .promise()
      .query("DELETE FROM event_conducted WHERE id=?", [req.body.id]);
    res.json({ success: true });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get(
  "/get-certificate-event-conducted/:id",
  authenticateUser,
  async (req, res) => {
    const file = await db
      .promise()
      .query("SELECT ProofPath FROM event_conducted WHERE id=?", [
        req.params.id,
      ]);
    res.sendFile(
      pathForFile.resolve(
        `${__dirname}/../uploads/event-conducted/${req.user.id.toString()}/${
          file[0][0].ProofPath
        }`
      )
    );
  }
);

//Event Conducted ---------END-------------------!

//Event Organized ---------Start-------------------

router.post(
  "/add-or-update-event-organized",
  authenticateUser,
  async (req, res) => {
    try {
      let dirpath = `${__dirname}/../uploads/event-organized`;
      let fileName = "";
      if (req.files && req.files.myfile) {
        createDir(`${dirpath}/${req.user.id.toString()}`);

        const file = req.files.myfile;
        const temp = file.name.split(".");
        fileName = `${temp
          .slice(0, -1)
          .join("_")
          .split(" ")
          .join("_")}_${new Date()
          .toDateString()
          .split(" ")
          .join("_")}_${new Date()
          .toLocaleTimeString()
          .split(":")
          .join("_")
          .split(" ")
          .join("_")}.${temp[temp.length - 1]}`;
        const filePath = `${dirpath}/${req.user.id.toString()}/${fileName}`;
        file.mv(filePath);
      }
      const data = JSON.parse(req.body.data);
      if (!data.id) {
        await db.promise().query(
          `INSERT INTO event_organized (FactId, EventTitle, StartDate,
               EndDate, Duration, TotalParticipants,SpeakerName, EventTopic, EventType,OtherType,EventLevel, EventMode, AcademicYear,
               ApprovedBy,ProofPath ) VALUES (?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
          [
            req.user.id,
            data.title,
            data.fromDate,
            data.toDate,
            data.duration,
            data.participants,
            data.speakerName,
            data.topic,
            data.type,
            data.otherType,
            data.level,
            data.mode,
            data.academicYear,
            data.approvedBy,
            fileName,
          ]
        );
      } else {
        if (fileName && data.ProofPath) {
          deleteFile(
            `event-organized/${req.user.id.toString()}/${data.ProofPath}`
          );
        }
        data.ProofPath = fileName ? fileName : data.ProofPath;
        await db.promise().query(
          `UPDATE event_organized SET EventTitle= ?,  StartDate= ?,
               EndDate= ?, Duration= ?, TotalParticipants= ?,SpeakerName=?, EventTopic= ?, EventType= ?,OtherType= ?, EventLevel= ?,EventMode= ?, AcademicYear= ?,
               ApprovedBy= ?,ProofPath= ? WHERE id = ? `,
          [
            data.title,
            data.fromDate,
            data.toDate,
            data.duration,
            data.participants,
            data.speakerName,
            data.topic,
            data.type,
            data.otherType,
            data.level,
            data.mode,
            data.academicYear,
            data.approvedBy,
            data.ProofPath,
            data.id,
          ]
        );
      }
      res.json({ success: true });
    } catch (err) {
      const data = { success: false, msg: "internal server Error" };
      res.status(500).json(data);
    }
  }
);

router.get("/get-events-organized", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT * FROM event_organized WHERE FactId=?", [req.user.id]);
    res.json(data[0]);
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.post("/delete-event-organized", authenticateUser, async (req, res) => {
  try {
    const data = await db
      .promise()
      .query("SELECT ProofPath FROM event_organized WHERE id=?", [req.body.id]);
    if (data[0][0].ProofPath !== "")
      deleteFile(
        `event-organized/${req.user.id.toString()}/${data[0][0].ProofPath}`
      );

    await db
      .promise()
      .query("DELETE FROM event_organized WHERE id=?", [req.body.id]);
    res.json({ success: true });
  } catch (err) {
    const data = { success: false, msg: "internal server Error" };
    res.status(500).json(data);
  }
});

router.get(
  "/get-certificate-event-organized/:id",
  authenticateUser,
  async (req, res) => {
    const file = await db
      .promise()
      .query("SELECT ProofPath FROM event_organized WHERE id=?", [
        req.params.id,
      ]);
    res.sendFile(
      pathForFile.resolve(
        `${__dirname}/../uploads/event-organized/${req.user.id.toString()}/${
          file[0][0].ProofPath
        }`
      )
    );
  }
);

module.exports = router;
