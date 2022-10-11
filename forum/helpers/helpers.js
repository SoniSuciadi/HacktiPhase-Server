const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  let payload = jwt.verify(token, process.env.TOKEN_SECRET);
  return payload;
};

module.exports = verifyToken;
