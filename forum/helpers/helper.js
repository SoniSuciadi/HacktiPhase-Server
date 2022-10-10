const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token) => {
  let payload = jwt.verify(token, process.env.TOKEN_SECRET);
  return payload;
};

const signJwt = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET);

module.exports = { verifyToken, signJwt };
