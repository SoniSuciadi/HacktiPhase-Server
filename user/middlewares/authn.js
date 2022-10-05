const { User } = require("../models");
const { tokenToPayload } = require("../helper/helper");

const authn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "401" };
    }

    const payload = tokenToPayload(access_token);
    const foundUser = await User.findByPk(payload.id);
    if (!foundUser) {
      throw { name: "401" };
    }

    req.user = {
      id: foundUser.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authn;
