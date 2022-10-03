"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assignment.init(
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
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Link is required",
          },
          notEmpty: {
            msg: "Link is required",
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
      deadline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Deadline is required",
          },
          notEmpty: {
            msg: "Deadline is required",
          },
        },
      },
      scorePercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Score percentage is required",
          },
          notEmpty: {
            msg: "Score percentage is required",
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
      modelName: "Assignment",
    }
  );
  return Assignment;
};
