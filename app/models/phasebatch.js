"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhaseBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhaseBatch.init(
    {
      BatchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Batch id is required",
          },
          notEmpty: {
            msg: "Batch id is required",
          },
        },
      },
      PhaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phase id is required",
          },
          notEmpty: {
            msg: "Phase id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "PhaseBatch",
    }
  );
  return PhaseBatch;
};
