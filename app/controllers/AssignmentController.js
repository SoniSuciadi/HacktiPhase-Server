const { Assignment, AssignmentDetail, User, sequelize } = require("../models");

class AssignmentController {
  static async fetchAssignments(req, res, next) {
    try {
      let query = {
        where: {
          PhaseId: req.user.PhaseId,
        },
        include: {
          model: AssignmentDetail,
        },
      };
      if (req.user.role === "student") {
        query.where = {
          PhaseId: req.user.PhaseId,
        };
        query.include.where = {
          UserId: req.user.id,
        };
      }
      const assignments = await Assignment.findAll(query);
      res.status(200).json(assignments);
    } catch (error) {
      next(error);
    }
  }

  static async fetchAssignmentsByWeek(req, res, next) {
    try {
      let query = {
        where: {
          PhaseId: req.user.PhaseId,
          week: req.params.id,
        },
        include: {
          model: AssignmentDetail,
        },
      };
      const assignments = await Assignment.findAll(query);
      res.status(200).json(assignments);
    } catch (error) {
      next(error);
    }
  }

  static async getSingleAssignment(req, res, next) {
    try {
      const assignment = await User.findAll({
        where: {
          PhaseBatchId: req.user.PhaseBatchId,
          role: "student",
        },
        include: {
          model: AssignmentDetail,
          where: {
            AssignmentId: req.params.id,
          },
          required: false,
        },
      });
      if (
        req.user.role === "student" &&
        req.user.PhaseId !== assignment.PhaseId
      ) {
        throw { code: 401, msg: "Unauthorized" };
      }
      res.status(200).json(assignment);
    } catch (error) {
      next(error);
    }
  }

  static async gradingScore(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let array = req.body.map((el) => {
        AssignmentDetail.update(
          {
            score: el.score,
          },
          {
            where: {
              id: el.id,
              AssignmentId: req.params.id,
            },
          }
        );
      });
      await Promise.all(array);
      await t.commit();
      res.status(200).json({
        msg: "Score updated",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = AssignmentController;
