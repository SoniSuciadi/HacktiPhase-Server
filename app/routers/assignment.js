const AssignmentController = require("../controllers/AssignmentController");

const router = require("express").Router();

router.get("/", AssignmentController.fetchAssignments);
router.post("/", AssignmentController.postNewAssignment);
router.get("/:id", AssignmentController.getSingleAssignment);
router.put("/:id", AssignmentController.editAssignment);
router.delete("/:id", AssignmentController.deleteAssignment);

module.exports = router;
