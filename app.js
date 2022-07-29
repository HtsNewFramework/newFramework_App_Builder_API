const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const helmet = require("helmet");
var cors_proxy = require("cors-anywhere");
// const path = require("path");
// var enforce = require("express-sslify");
// var http = require("http");

app.use(helmet());

const cardRouter = require("./routes/query/card");
const fileHistoryRouter = require("./routes/query/fileHistory");

// Authentication Route
const auth = require("./routes/authentication/login");
const router = require("./routes/query/card");

dotenv.config();
const PORT = process.env.PORT || 1433;

// CORS Middleware

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 3000);

// Route Middleware
app.use(cardRouter);
app.use(fileHistoryRouter);

// Authentication
app.use(auth);

// app.use(enforce.HTTPS());

const start = async () => {
  try {
    app.listen(PORT, async () => {
      router.get("", (req, res) => {
        res.send({ msg: "Application up and running" });
        console.log(res.body);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

start();
