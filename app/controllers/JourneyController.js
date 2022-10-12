const { Journey, StudentJourney } = require("../models");

class JourneyController {
  static async fetchJourneys(req, res, next) {
    try {
      const journeys = await Journey.findAll({
        where: {
          AssignmentId: req.params.AssignmentId,
        },
      });
      res.status(200).json(journeys);
    } catch (error) {
      next(error);
    }
  }

  static async getSingleJourney(req, res, next) {
    console.log("first");
    try {
      const journey = await Journey.findAll({
        where: {
          AssignmentId: req.params.AssignmentId
        },
        include: {
          model: StudentJourney,
          where: {
            UserId: req.params.UserId
          },
          required: false
        }
          
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
          JourneyId: req.params.JourneyId,
          UserId: req.user.id,
        },
      });
      if (!journey) {
        let data = await StudentJourney.create({
          JourneyId: req.params.JourneyId,
          UserId: req.user.id,
          status: "complete",
        });
        res.status(201).json(data);
      }
      const editJourney = await StudentJourney.update(
        {
          status: journey.status === "complete" ? "incomplete" : "complete",
        },
        {
          where: {
            JourneyId: req.params.JourneyId,
            UserId: req.user.id,
          },
        }
      );
      res.status(200).json(editJourney);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JourneyController;
