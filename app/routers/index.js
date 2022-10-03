const router = require("express").Router();
const assignment = require("./assignment");
const material = require("./material");

router.use("/assignment", assignment);
router.use("/material", material);

module.exports = router;
