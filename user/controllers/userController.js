const {
  comparePassword,
  payloadToToken,
  hashPassword,
} = require("../helper/helper");
const { User, Assignment, AssignmentDetail } = require("../models");

class userController {
  static async register(req, res, next) {
    try {
      const {
        fullName,
        email,
        password,
        role,
        PhaseBatchId,
        expo_token,
        status,
      } = req.body;
      const newUser = await User.create({
        fullName,
        email,
        password,
        role,
        PhaseBatchId,
        expo_token,
        status,
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EMAIL_REQUIRED" };
      }
      if (!password) {
        throw { name: "PASSWORD_REQUIRED" };
      }
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        throw { name: "INVALID_CREDENTIAL" };
      }
      const checkPassword = comparePassword(password, foundUser.password);
      if (!checkPassword) {
        throw { name: "INVALID_CREDENTIAL" };
      }

      const payload = {
        id: foundUser.id,
      };

      const access_token = payloadToToken(payload);
      res.status(200).json({
        id: foundUser.id,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      let {
        fullName,
        email,
        password,
        role,
        PhaseBatchId,
        expo_token,
        status,
      } = req.body;

      password = hashPassword(password);
      const editedUser = await User.update(
        { fullName, email, password, role, PhaseBatchId, expo_token, status },
        { where: { id } }
      );
      res.status(200).json({ msg: `User with id ${id} updated successfully` });
    } catch (error) {
      next(error);
    }
  }
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
        msg: `User with ID ${req.params.id} updated to ${
          user.status === "active" ? "inactive" : "active"
        }`,
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
  static async editExpoUser(req, res, next) {
    try {
      const { id } = req.user;
      const { expo_token } = req.body;
      console.log(expo_token);
      const editedUser = await User.update({ expo_token }, { where: { id } });
      res.status(200).json({
        msg: `User with id ${id} Expo Token updated to ${expo_token}`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await User.destroy({ where: { id } });
      res.status(200).json({ msg: `User with id ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async getScore(req, res, next) {
    try {
      const { id } = req.user;

      let userScore = await User.findOne({
        where: id,
        include: {
          model: AssignmentDetail,
          include: {
            model: Assignment,
          },
        },
      });
      res.status(200).json(userScore);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
