const AssignmentController = require("../controllers/AssignmentController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", AssignmentController.fetchAssignments);
router.post("/", authorization, AssignmentController.postNewAssignment);
router.get("/:id", AssignmentController.getSingleAssignment);
router.put("/:id", authorization, AssignmentController.editAssignment);
router.delete("/:id", authorization, AssignmentController.deleteAssignment);

module.exports = router;
