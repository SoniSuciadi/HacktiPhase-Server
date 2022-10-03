require("dotenv");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("this app is running on port", PORT);
});
