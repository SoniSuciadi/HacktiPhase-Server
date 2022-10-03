const { Assignment, AssignmentDetail } = require("../models");

class AssignmentController {
  static async fetchAssignments(req, res, next) {
    try {
      let query = {
        include: {
          model: AssignmentDetail,
        },
      };
      if (req.user.role === "student") {
        query.where = {
          PhaseId: req.user.PhaseId,
        };
      }
      const assignments = await Assignment.findAll(query);
      res.status(200).json(assignments);
    } catch (error) {
      next(error);
    }
  }

  static async getSingleAssignment(req, res, next) {
    try {
      const assignment = await Assignment.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          model: AssignmentDetail,
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

  static async postNewAssignment(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const {
        title,
        description,
        link,
        dayWeek,
        deadline,
        scorePercentage,
        PhaseId,
      } = req.body;
      const newAssignment = await Assignment.create({
        title,
        description,
        link,
        dayWeek,
        deadline,
        scorePercentage,
        PhaseId,
      });
      res.status(201).json(newAssignment);
    } catch (error) {
      next(error);
    }
  }

  static async editAssignment(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const {
        title,
        description,
        link,
        dayWeek,
        deadline,
        scorePercentage,
        PhaseId,
      } = req.body;
      const editAssignment = await Assignment.update(
        {
          title,
          description,
          link,
          dayWeek,
          deadline,
          scorePercentage,
          PhaseId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(editAssignment);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAssignment(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const deleteAssignment = await Assignment.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deleteAssignment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AssignmentController;
