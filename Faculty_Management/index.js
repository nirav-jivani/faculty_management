const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/admin", require("./routes/admin"));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
