const { verifyToken } = require("../helpers/helpers");
const { User } = require("../models");

async function auth(req, res, next) {
  try {
    const { access_token } = req.headers;
    const id = verifyToken(access_token);
    const userLogin = await User.findOne({
      where: {
        id,
      },
    });
    req.user = userLogin;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = auth;
