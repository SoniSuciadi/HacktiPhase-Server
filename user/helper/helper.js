const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashing) => bcrypt.compareSync(password, hashing);

const payloadToToken = (payload) => jwt.sign(payload, process.env.SECRET);
const tokenToPayload = (token) => jwt.verify(token, process.env.SECRET);

module.exports = { hashPassword, comparePassword, payloadToToken, tokenToPayload };
