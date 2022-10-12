const axios = require("axios");
const apiChat = axios.create({
  baseURL: "https://hacktiphase-chat.herokuapp.com",
});

module.exports = { apiChat };
