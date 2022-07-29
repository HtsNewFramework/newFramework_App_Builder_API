const dotenv = require("dotenv");
dotenv.config();

var config = {
  user: process.env.DB_USER ? process.env.DB_USER : "sa",
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "pa$$word123",
  port: 19706,
  server: process.env.DB_SERVER
    ? process.env.DB_SERVER
    : "DESKTOP-6US32LO\\SQLSERVERL",
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
