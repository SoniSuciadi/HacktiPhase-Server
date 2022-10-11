const JourneyController = require("../controllers/JourneyController");
const { authentication } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/assignment/:AssignmentId", JourneyController.fetchJourneys);
router.get("/detail/:AssignmentId/:UserId", JourneyController.getSingleJourney);
router.patch("/:StudentJourneyId", JourneyController.changeStatusJourney);

module.exports = router;
