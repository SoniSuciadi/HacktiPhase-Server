const { Op } = require("sequelize");
const { User } = require("../models");

class UserController {
  static async changeStatus(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      await User.update(
        {
          status: user.status === "active" ? "inactive" : "active",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        msg: `User with ID ${req.params.id} updated to ${user.status === "active" ? "inactive" : "active"}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async massChangePhaseBatch(req, res, next) {
    try {
      await User.update(
        {
          PhaseBatchId: req.body.phaseBatchId,
        },
        {
          where: {
            id: {
              [Op.in]: req.body.users,
            },
          },
        }
      );
      res.status(201).json({
        msg: `User with ID's ${req.body.users} updated to PhaseBatchID ${req.body.phaseBatchId}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
