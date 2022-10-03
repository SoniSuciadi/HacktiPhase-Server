require("./config/db");
const express = require("express");
const app = express();
const PORT = 3000;
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
