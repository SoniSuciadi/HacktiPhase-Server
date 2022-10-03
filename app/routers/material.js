const MaterialController = require("../controllers/MaterialController");
const { authentication } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", MaterialController.fetchMaterials);
router.post("/", MaterialController.postNewMaterial);
router.get("/:id", MaterialController.getSingleMaterial);
router.put("/:id", MaterialController.editMaterial);
router.delete("/:id", MaterialController.deleteMaterial);

module.exports = router;
