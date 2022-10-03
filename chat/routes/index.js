const express = require("express");
const route = express.Router();
const routeChat = require("./chat");

route.use("/chats", routeChat);

module.exports = route;
