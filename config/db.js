const dotenv = require("dotenv");
dotenv.config();

var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // "port": process.env.PORT,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
