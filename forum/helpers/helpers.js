const jwt = require("jsonwebtoken");

const signJwt = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET);

const verifyToken = (token) => {
  let payload = jwt.verify(token, process.env.TOKEN_SECRET);
  return payload;
};

module.exports = { verifyToken, signJwt };
