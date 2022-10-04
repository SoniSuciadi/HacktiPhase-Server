"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentJourney extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentJourney.belongsTo(models.User);
      StudentJourney.belongsTo(models.Journey);
    }
  }
  StudentJourney.init(
    {
      JourneyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Journey id is required",
          },
          notEmpty: {
            msg: "Journey id is required",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentJourney",
    }
  );
  return StudentJourney;
};
