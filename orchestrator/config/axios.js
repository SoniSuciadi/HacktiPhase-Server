const axios = require("axios");
const apiChat = axios.create({
  // baseURL: "https://hacktiphase-chat.herokuapp.com",
  baseURL: "http://localhost:3003/",
});

module.exports = { apiChat };
