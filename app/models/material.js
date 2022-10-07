"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Material.belongsTo(models.Phase);
    }
  }
  Material.init(
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
      session: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Session is required",
          },
          notEmpty: {
            msg: "Session is required",
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
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Day is required",
          },
          notEmpty: {
            msg: "Day is required",
          },
        },
      },
      week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Week is required",
          },
          notEmpty: {
            msg: "Week is required",
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
      modelName: "Material",
    }
  );
  return Material;
};
