const express = require("express");
const router = express.Router();
const config = require("../../config/db");
const fs = require("fs");
const { promisify } = require("util");
const sql = require("mssql");
const { DownloaderHelper } = require("node-downloader-helper");
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
  let filePath = fs.promises.readdir("./script file/area");

  let savePath = fs.promises.readdir("./script file/saveScript");

  var lengthy = await filePath;
  lengthy = lengthy.length;

  sql.connect(sql.connect(config)).then(() => {
    return sql
      .query(`SELECT * FROM _QUERIES WHERE FILE_ID = ${fileID}`)
      .then((res) => {
        let queryFile = res.recordset[0].FILE_CONTENT;

        let writeFile = promisify(fs.writeFile);
        let file = `./script file/area/area_${lengthy + 1}.sql`;

        writeFile(file, queryFile);

        const dl = new DownloaderHelper(file, savePath.toString());

        dl.on("end", () => console.log("Download Completed"));
        dl.start();
        fs.unlink(`./script file/area/area_${lengthy}.sql`);
      })
      .catch((err) => {
        return res.json({ msg: `${err.message}` });
      });
  });
});

router.get("/loginUser/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  sql
    .connect(sql.connect(config))
    .then(() => {
      return sql.query(
        `SELECT * FROM _USER WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`
      );
    })
    .then((result) => {
      if (result.rowsAffected > 0) {
        return res.status(200).send({
          msg: `user successfully logged In`,
          verify: `SUCCESS`,
          userDetails: `${JSON.stringify(result.recordset)}`,
        });
      } else {
        return res.status(500).send({
          msg: `Invalid credentials supplied`,
          verify: `ERROR`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        msg: `${err.message} \n Line number ${err.lineNumber}`,
        verify: `ERROR`,
      });
    });
});

module.exports = router;
