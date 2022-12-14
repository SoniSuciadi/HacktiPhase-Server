const { verifyJwt } = require("../helpers");
const { User, PhaseBatch, Phase } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const token = verifyJwt(access_token);
    const user = await User.findOne({
      include: {
        model: PhaseBatch,
      },
      where: {
        id: token.id,
      },
    });
    if (!user) {
      throw { code: 404, msg: "User not found" };
    }
    req.user = {
      id: user.id,
      role: user.role,
      PhaseId: user.PhaseBatch.PhaseId,
      PhaseBatchId: user.PhaseBatch.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      throw { code: 401, msg: "Unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authorization };
