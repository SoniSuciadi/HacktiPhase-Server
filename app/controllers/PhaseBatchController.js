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
      const phasebatches = await PhaseBatch.findOne({
        where: {
          id: req.user.PhaseBatchId,
        },
        include: [
          {
            model: Phase,
          },
          {
            model: Batch,
          },
          {
            model: User,
            where: {
              role: "student",
            },
          },
        ],
      });
      res.status(200).json(phasebatches);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhaseBatchController;
