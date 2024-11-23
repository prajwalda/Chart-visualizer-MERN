const mysql = require("mysql2/promise");

const sqlDb = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hello@123",
  database: "salesdb",
});

module.exports = sqlDb;
