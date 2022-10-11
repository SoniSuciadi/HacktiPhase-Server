const AssignmentController = require("../controllers/AssignmentController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", AssignmentController.fetchAssignments);
router.get("/week/:id", AssignmentController.fetchAssignmentsByWeek);
router.get("/:id", AssignmentController.getSingleAssignment);
router.patch("/:id", AssignmentController.gradingScore);

module.exports = router;
