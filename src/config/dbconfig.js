const mysql = require("mysql2/promise");
require("dotenv").config();

// connection to mysql
const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = mysqlPool;
