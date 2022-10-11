const { Op } = require("sequelize");
const { User } = require("../models");

class UserController {
  static async massChangeToActive(req, res, next) {
    try {
      const user = await User.update(
        {
          status: "active",
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
        msg: `User with ID ${req.body.users} updated to active`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async massChangeToInactive(req, res, next) {
    try {
      await User.update(
        {
          status: "inactive",
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
        msg: `User with ID ${req.body.users} updated to inactive`,
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
        msg: `User with ID ${req.body.users} updated to inactive`,
      });
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = UserController;
