const PhaseBatchController = require("../controllers/PhaseBatchController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", authorization, PhaseBatchController.fetchPhaseBatch);
router.get("/lecture", authorization, PhaseBatchController.getLecture);
router.get("/user", PhaseBatchController.getSinglePhaseBatches);

module.exports = router;
