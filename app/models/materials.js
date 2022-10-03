"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materials.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      references: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "References is required",
          },
          notEmpty: {
            msg: "References is required",
          },
        },
      },
      dayWeek: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Day and week is required",
          },
          notEmpty: {
            msg: "Day and week is required",
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
      modelName: "Materials",
    }
  );
  return Materials;
};
