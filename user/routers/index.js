const router = require("express").Router();
const userController = require("../controllers/userController");
const authn = require("../middlewares/authn");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authn);

router.get("/users", userController.getUsers);
router.get("/users/score", userController.getScore);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.editUser);
router.patch("/users/expo", userController.editExpoUser);
router.patch("/users/:id", userController.changeStatus);
router.patch("/users/migrate", userController.massChangePhaseBatch);
router.delete("/users/:id", userController.deleteUser);


router.use(errorHandler);

module.exports = router;
