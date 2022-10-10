const { verifyToken } = require("../helpers/helper");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const { id } = verifyToken(access_token);

    const userLogin = await User.findByPk(id);

    req.user = userLogin;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
