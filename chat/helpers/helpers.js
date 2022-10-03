const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  return payload;
};

module.exports = verifyToken;
