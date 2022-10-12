const UserController = require("../controllers/UserController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication, authorization);
router.patch("/migrate", UserController.massChangePhaseBatch);
router.patch("/:id", UserController.changeStatus);

module.exports = router;
