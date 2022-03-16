const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "faculty_management",
});
