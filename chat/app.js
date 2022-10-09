require("./config/db");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const server = require("http").createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(auth);
app.use("/", route);
app.use(errorHandler);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
io.on("connection", (socket) => {
  console.log(socket.id, "<<<<<<<<<<<<<<<<"); // x8WIv7-mJelg7on_ALbx
});
module.exports = server;
