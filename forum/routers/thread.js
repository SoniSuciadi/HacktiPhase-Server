const router = require("express").Router();
const threadController = require("../controllers/threadController");

router.get("/", threadController.fetchThreads);
router.post("/", threadController.createThread);
router.get("/:id", threadController.fetchThreadById);
router.delete("/:id", threadController.deleteThread);
router.put("/:id", threadController.updateThread);

module.exports = router;
