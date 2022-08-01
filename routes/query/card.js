const express = require("express");
const router = express.Router();
const config = require("../../config/db");
const sql = require("mssql");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get("/save_query/:fileContent/:fileUser/:fileType", async (req, res) => {
  let fileContent = req.params.fileContent;
  let fileUser = req.params.fileUser;
  let fileType = req.params.fileType;

  console.log(fileUser, fileType);

  fileContent = fileContent.replaceAll("'", "''");
  sql
    .connect(sql.connect(config))
    .then(() => {
      let saveTxt = `INSERT INTO _QUERIES (FILE_CONTENT, FILE_TYPE, FILE_USER ) VALUES ('${fileContent}', '${fileType}', '${fileUser}' )`;

      return sql.query(saveTxt);
    })
    .then((result) => {
      if (result.rowsAffected > 1) {
        return res.status(200).send({
          msg: `query run successfully \n Number of rows affected: ${result.rowsAffected}`,
          verify: `SUCCESS`,
        });
      } else {
        return res.status(500).send({
          msg: `query run successfully \n No record found \n ${result.rowsAffected}`,
          verify: `NO_RECORD`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ msg: `${err.message}`, verify: `ERROR` });
    });
});

router.get("/run_query/:runTxt", async (req, res) => {
  let runTxt = req.params.runTxt;

  sql
    .connect(sql.connect(config))
    .then(() => {
      return sql.query(`${runTxt}`);
    })
    .then((result) => {
      return res.status(200).send({
        msg: `query run successfully \n Number of rows affected: ${result.rowsAffected}`,
        verify: `SUCCESS`,
        queryResult: `${JSON.stringify(result.recordset)}`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        msg: `${err.message}`,
        verify: `ERROR`,
      });
    });
});

router.get("/sql_history/:fileType", async (req, res) => {
  let fileType = req.params.fileType;
  sql
    .connect(sql.connect(config))
    .then(() => {
      return sql.query(
        `SELECT * FROM _QUERIES WHERE FILE_TYPE = '${fileType}' ORDER BY DATE_CREATED DESC`
      );
    })
    .then((result) => {
      return res.status(200).send(result.recordset);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ msg: `${err.message} \n Line number ${err.lineNumber}` });
    });
});

module.exports = router;
