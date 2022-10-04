const JourneyController = require("../controllers/JourneyController");
const { authentication } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/:AssignmentId", JourneyController.fetchJourneys);
router.get("/:JourneyId", JourneyController.getSingleJourney);
router.patch("/:StudentJourneyId", JourneyController.changeStatusJourney);

module.exports = router;
