const router = require("express").Router();
const assignment = require("./assignment");
const material = require("./material");
const journey = require("./journey");
const phasebatch = require("./phasebatch");
const user = require("./user");
const error = require("../middlewares/error");

router.use("/assignment", assignment);
router.use("/material", material);
router.use("/journey", journey);
router.use("/phasebatch", phasebatch);
router.use("/user", user);
router.use(error);

module.exports = router;
