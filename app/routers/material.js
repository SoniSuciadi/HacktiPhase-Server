const MaterialController = require("../controllers/MaterialController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", MaterialController.fetchMaterials);
router.get("/week/:id", MaterialController.fetchMaterialsByWeek);
router.get("/:id", MaterialController.getSingleMaterial);

module.exports = router;
