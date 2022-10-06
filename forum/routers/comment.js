const Controller = require("../controllers/commentController");
const router = require("express").Router();

router.post("/", Controller.createComment);
router.get("/", Controller.fetchComments);
router.get("/:id", Controller.fetchCommentById);
router.delete("/:id", Controller.deleteComment);
router.put("/:id", Controller.updateComment);

module.exports = router;
