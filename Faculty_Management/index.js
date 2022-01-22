const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/auth"));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
