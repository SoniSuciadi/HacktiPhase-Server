const { Material } = require("../models");

class MaterialController {
  static async fetchMaterials(req, res, next) {
    try {
      const materials = await Material.findAll({
        where: {
          PhaseId: req.user.PhaseId,
        },
      });
      res.status(200).json(materials);
    } catch (error) {
      next(error);
    }
  }

  static async fetchMaterialsByWeek(req, res, next) {
    try {
      const materials = await Material.findAll({
        where: {
          PhaseId: req.user.PhaseId,
          week: req.params.id,
        },
      });
      res.status(200).json(materials);
    } catch (error) {
      next(error);
    }
  }

  static async getSingleMaterial(req, res, next) {
    try {
      const material = await Material.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (
        req.user.role === "student" &&
        req.user.PhaseId !== material.PhaseId
      ) {
        throw { code: 401, msg: "Unauthorized" };
      }
      res.status(200).json(material);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MaterialController;
