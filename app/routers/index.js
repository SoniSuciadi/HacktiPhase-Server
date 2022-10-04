const router = require("express").Router();
const assignment = require("./assignment");
const material = require("./material");
const journey = require("./journey");
const phasebatch = require("./phasebatch");

router.use("/assignment", assignment);
router.use("/material", material);
router.use("/journey", journey);
router.use("/phasebatch", phasebatch);

module.exports = router;
