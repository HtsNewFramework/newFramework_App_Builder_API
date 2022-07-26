const express = require("express");
const router = express.Router();
const config = require("../../config/db");
const fs = require("fs");
const { promisify } = require("util");
const sql = require("mssql");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get("/sql_history/:fileType", async (req, res) => {
  let fileType = req.params.fileType;
  sql
    .connect(sql.connect(config))
    .then(() => {
      return sql.query(
        `SELECT * FROM _QUERIES WHERE FILE_TYPE = '${fileType}' ORDER BY DATE_CREATED ASC`
      );
    })
    .then((result) => {
      return res.status(200).send(result.recordset);
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ msg: `${err.message} \n Line number ${err.lineNumber}` });
    });
});

router.get("/downloadFileScript/:fileID", async (req, res) => {
  const fileID = req.params.fileID;

  let file = `../../file.sql`;

  sql.connect(sql.connect(config)).then(() => {
    return sql
      .query(`SELECT * FROM _QUERIES WHERE FILE_ID = ${fileID}`)
      .then((result) => {
        let queryFile = result.recordset[0].FILE_CONTENT;

        let writeFile = promisify(fs.writeFile);
        writeFile(file, queryFile);
        res.download(file);
        return res.status(200).send(queryFile);
      })
      .catch((err) => {
        return res.json({ msg: `${err.message}` });
      });
  });
});

module.exports = router;
