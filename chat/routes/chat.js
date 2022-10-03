const express = require("express");
const Chat = require("../controllers/chat");

const route = express.Router();

route.get("/", Chat.getChats);
route.post("/", Chat.sendMessage);

module.exports = route;
