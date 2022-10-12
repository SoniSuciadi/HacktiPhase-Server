"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Phase.hasMany(models.Material);
      Phase.hasMany(models.Assignment);
    }
  }
  Phase.init(
    {
      phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phase is required",
          },
          notEmpty: {
            msg: "Phase is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Phase",
    }
  );
  return Phase;
};
