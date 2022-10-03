const jwt = require("jsonwebtoken");
const key = "sdsdasdsadkjsadasjdhkasd";
const verifyToken = (token) => {
  let payload = jwt.verify(token, key);
  return payload;
};

module.exports = verifyToken;
