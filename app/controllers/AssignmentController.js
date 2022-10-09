const { Assignment, AssignmentDetail, User } = require("../models");

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
      console.log(req.params);
      let query = {
        where: {
          PhaseId: req.user.PhaseId,
          week: req.params.id,
        },
        include: {
          model: AssignmentDetail,
        },
      };
      if (req.user.role === "student") {
        //---- buakannya yang ini ngak ya ?????
        // query.include.where = {
        //   UserId: req.user.id,
        // };
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
          PhaseId: req.user.PhaseId,
        },
        include: {
          model: AssignmentDetail,
          include: {
            model: User,
            where: {
              PhaseBatchId: req.user.PhaseBatchId,
            },
          },
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
