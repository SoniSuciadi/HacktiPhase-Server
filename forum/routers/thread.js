const router = require("express").Router();
const app = require("../app");
const threadController = require("../controllers/threadController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", threadController.fetchThreads);
router.post("/", threadController.createThread);
router.get("/:id", threadController.fetchThreadById);
router.delete("/:id", threadController.deleteThread);
router.put("/:id", threadController.updateThread);

module.exports = router;
