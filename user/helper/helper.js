const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashing) =>
  bcrypt.compareSync(password, hashing);

const payloadToToken = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET);
const tokenToPayload = (token) => jwt.verify(token, process.env.TOKEN_SECRET);

module.exports = {
  hashPassword,
  comparePassword,
  payloadToToken,
  tokenToPayload,
};
