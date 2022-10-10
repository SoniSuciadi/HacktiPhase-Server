const app = require("../app");
const Controller = require("../controllers/commentController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.use(authentication);
router.post("/", Controller.createComment);
router.get("/", Controller.fetchComments);
router.get("/:id", Controller.fetchCommentById);
router.delete("/:id", Controller.deleteComment);
router.put("/:id", Controller.updateComment);

module.exports = router;
