const express = require("express");
const router = express.Router();
const tokenConfig = require("../../config/config.json");
const config = require("../../config/db");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const app = express();

const tokenList = {};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get("/loginUser/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  sql
    .connect(sql.connect(config))
    .then(() => {
      return sql.query(
        `SELECT * FROM _USER WHERE USERNAME = '${username}' `
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

router.post("/login", (req, res) => {
  const postData = req.body;
  const user = {
    email: postData.email,
    password: postData.password,
  };
  // do the database authentication here, with user name and password combination.
  const token = jwt.sign(user, tokenConfig.secret, {
    expiresIn: tokenConfig.tokenLife,
  });
  const refreshToken = jwt.sign(user, tokenConfig.refreshTokenSecret, {
    expiresIn: tokenConfig.refreshTokenLife,
  });
  const response = {
    status: "Logged in",
    token: token,
    refreshToken: refreshToken,
  };
  tokenList[refreshToken] = response;
  res.status(200).json(response);
});

router.post("/token", (req, res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const user = {
      email: postData.email,
      name: postData.name,
    };
    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife,
    });
    const response = {
      token: token,
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
});

router.use(require("../../middleware/tokenChecker"));

module.exports = router;
