require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const cors = require("cors");
const commentRouter = require("./routers/comment");
const threadRouter = require("./routers/thread");
const errorHandler = require("./middlewares/errorHandler");
const auth = require("./middlewares/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(auth);
app.use("/comments", commentRouter);
app.use("/threads", threadRouter);
app.use(errorHandler);

// app.listen(port, () => console.log("Swimming on port: " + port));

module.exports = app;
