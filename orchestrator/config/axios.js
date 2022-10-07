const axios = require("axios");
const apiChat = axios.create({
  baseURL: "http://localhost:3003",
});

module.exports = { apiChat };
