const { Material } = require("../models");

class MaterialController {
  static async fetchMaterials(req, res, next) {
    try {
      let query = {};
      if (req.user.role === "student") {
        query.where = {
          PhaseId: req.user.PhaseId,
        };
      }
      const materials = await Material.findAll(query);
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

  static async postNewMaterial(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const { title, description, references, dayWeek, PhaseId } = req.body;
      const newMaterial = await Material.create({
        title,
        description,
        references,
        dayWeek,
        PhaseId,
      });
      res.status(201).json(newMaterial);
    } catch (error) {
      next(error);
    }
  }

  static async editMaterial(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const { title, description, references, dayWeek, PhaseId } = req.body;
      const editMaterial = await Material.update(
        {
          title,
          description,
          references,
          dayWeek,
          PhaseId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(editMaterial);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMaterial(req, res, next) {
    try {
      if (req.user.role !== "instructor") {
        throw { code: 401, msg: "Unauthorized" };
      }
      const deleteMaterial = await Material.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deleteMaterial);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MaterialController;
