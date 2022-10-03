const { Batch, Phase, PhaseBatch, User } = require("../models");

class PhaseBatchController {
  static async fetchPhaseBatch(req, res, next) {
    try {
      const phasebatches = await PhaseBatch.findAll({
        include: [
          {
            model: Phase,
          },
          {
            model: Batch,
          },
        ],
      });
      res.status(200).json(phasebatches);
    } catch (error) {
      next(error);
    }
  }

  static async getSinglePhaseBatches(req, res, next) {
    try {
      if (
        req.user.role === "student" &&
        req.user.PhaseBatchId !== req.params.id
      ) {
        throw { code: 401, msg: "Unauthorized" };
      }
      const phasebatches = await User.findOne({
        where: {
          PhaseBatchId: req.params.id,
        },
        include: {
          model: PhaseBatch,
          include: [
            {
              model: Phase,
            },
            {
              model: Batch,
            },
          ],
        },
      });
      res.status(200).json(phasebatches);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhaseBatchController;
