const AssignmentController = require("../controllers/AssignmentController");
const { authentication } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", AssignmentController.fetchAssignments);
router.post("/", AssignmentController.postNewAssignment);
router.get("/:id", AssignmentController.getSingleAssignment);
router.put("/:id", AssignmentController.editAssignment);
router.delete("/:id", AssignmentController.deleteAssignment);

module.exports = router;
