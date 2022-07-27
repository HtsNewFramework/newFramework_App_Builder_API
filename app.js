const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
var cors_proxy = require("cors-anywhere");
// const path = require("path");
// var enforce = require("express-sslify");
// var http = require("http");

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

app.use(
  cors({
    origin: "*",
  })
);

const start = async () => {
  try {
    cors_proxy
      .createServer({
        originWhitelist: [], // Allow all origins
        requireHeader: ["origin", "x-requested-with"],
        removeHeaders: ["cookie", "cookie2"],
      })
      .listen(PORT, async () => {
        router.get("", (req, res) => {
          res.send({ msg: "Application up and running" });
        });
      });
  } catch (err) {
    console.log(err);
  }
};

start();
