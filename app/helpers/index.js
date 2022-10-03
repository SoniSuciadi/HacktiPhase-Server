const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signJwt = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET);
const verifyJwt = (token) => jwt.verify(token, process.env.TOKEN_SECRET);

const compareBcrypt = (string, hash) => bcrypt.compareSync(string, hash);
const hashBcrypt = (string) => bcrypt.hashSync(string);

module.exports = {
  signJwt,
  verifyJwt,
  compareBcrypt,
  hashBcrypt,
};
