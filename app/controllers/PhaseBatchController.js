const {
  Batch,
  Phase,
  PhaseBatch,
  User,
  Material,
  Assignment,
} = require("../models");

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

  static async getLecture(req, res, next) {
    try {
      const findStartDate = await PhaseBatch.findOne({
        where: {
          id: req.user.PhaseBatchId,
        },
      });
      const diffTime = Math.abs(new Date(findStartDate.startedAt) - new Date());
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      const diffDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24) - 7 * diffWeeks
      );
      const lecture = await PhaseBatch.findOne({
        include: {
          model: Phase,
          include: [
            {
              model: Material,
              where: {
                day: diffDays,
                week: diffWeeks,
              },
              required: false,
            },
            {
              model: Assignment,
              where: {
                day: diffDays,
                week: diffWeeks,
              },
              required: false,
            },
          ],
        },
        where: {
          id: req.user.PhaseBatchId,
        },
      });
      res.status(200).json(lecture);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PhaseBatchController;
