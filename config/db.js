const dotenv = require("dotenv");
dotenv.config();

var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: false,
    // encrypt: true,
    // enableArithAbort: true,
    trustServerCertificate: true,
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

module.exports = config;
