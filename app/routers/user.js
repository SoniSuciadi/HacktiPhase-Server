const UserController = require("../controllers/UserController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication, authorization);
router.patch("/activate", UserController.massChangeToActive);
router.patch("/inactivate", UserController.massChangeToInactive);
router.patch("/migrate", UserController.massChangePhaseBatch);

module.exports = router;
