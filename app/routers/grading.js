const JourneyController = require("../controllers/JourneyController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication, authorization);
router.get("/:AssignmentId", JourneyController.fetchJourneys);
router.get("/:JourneyId", JourneyController.getSingleJourney);
router.patch("/:StudentJourneyId", JourneyController.changeStatusJourney);

module.exports = router;
