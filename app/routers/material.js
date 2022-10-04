const MaterialController = require("../controllers/MaterialController");
const { authentication, authorization } = require("../middlewares/auth");

const router = require("express").Router();

router.use(authentication);
router.get("/", MaterialController.fetchMaterials);
router.post("/", authorization, MaterialController.postNewMaterial);
router.get("/:id", MaterialController.getSingleMaterial);
router.put("/:id", authorization, MaterialController.editMaterial);
router.delete("/:id", authorization, MaterialController.deleteMaterial);

module.exports = router;
