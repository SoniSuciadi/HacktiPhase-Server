require("./config/db");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(auth);
app.use("/", route);
app.use(errorHandler);

module.exports = app;
