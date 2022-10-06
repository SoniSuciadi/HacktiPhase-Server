const axios = require("axios");
const apiChat = axios.create({
  baseURL: "http://localhost:3000",
});

module.exports = { apiChat };
