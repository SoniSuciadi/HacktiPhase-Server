const PhaseBatchController = require("../controllers/PhaseBatchController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", authorization, PhaseBatchController.getSinglePhaseBatches);
// router.get("/:id", PhaseBatchController.getSinglePhaseBatches);

module.exports = router;
