const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");

const cardRouter = require("./routes/query/card");
const fileHistoryRouter = require("./routes/query/fileHistory");

// Authentication Route
const auth = require("./routes/authentication/login");

dotenv.config();
const PORT = process.env.PORT || 1433;

// CORS Middleware
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "../client/build"));

app.set("port", process.env.PORT || 3000);

// Route Middleware

app.use(cardRouter);
app.use(fileHistoryRouter);

// Authentication
app.use(auth);



const start = async () => {
  try {
    app.listen(PORT, async (req, res) => {
      // console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
