const { Journey, StudentJourney } = require("../models");

class JourneyController {
  static async fetchJourneys(req, res, next) {
    console.log("iniiii");
    try {
      const journeys = await Journey.findAll({
        where: {
          AssignmentId: req.params.AssignmentId,
        },
        include: {
          model: StudentJourney,
          where: {
            UserId: req.user.id,
          },
        },
      });
      res.status(200).json(journeys);
    } catch (error) {
      next(error);
    }
  }

  static async getSingleJourney(req, res, next) {
    try {
      const journey = await Journey.findOne({
        where: {
          id: req.params.JourneyId,
        },
        include: {
          model: StudentJourney,
          where: {
            UserId: req.user.id,
          },
        },
      });
      res.status(200).json(journey);
    } catch (error) {
      next(error);
    }
  }

  static async changeStatusJourney(req, res, next) {
    try {
      const journey = await StudentJourney.findOne({
        where: {
          id: req.params.StudentJourneyId,
          UserId: req.user.id,
        },
      });
      if (!journey) {
        throw { code: 404, msg: "Journey not found" };
      }
      const editJourney = await StudentJourney.update(
        {
          status: journey.status === "complete" ? "uncomplete" : "complete",
        },
        {
          where: {
            id: req.params.StudentJourneyId,
          },
        }
      );
      res.status(200).json(editJourney);
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

module.exports = JourneyController;
