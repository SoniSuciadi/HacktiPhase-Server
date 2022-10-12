const verifyToken = require("../helpers/helpers");
const { User } = require("../models");

async function auth(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token, "-----=====");
    const { id } = verifyToken(access_token);
    const userLogin = await User.findByPk(id);
    req.user = userLogin;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
module.exports = auth;
