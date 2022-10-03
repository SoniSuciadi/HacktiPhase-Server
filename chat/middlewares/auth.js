const verifyToken = require("../helpers/helpers");
const { user } = require("../models");

async function auth(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    const { id } = verifyToken(access_token);
    const userLogin = await user.findByPk(id);
    req.user = userLogin;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = auth;
