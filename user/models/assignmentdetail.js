"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignmentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AssignmentDetail.belongsTo(models.User);
      AssignmentDetail.belongsTo(models.Assignment);
    }
  }
  AssignmentDetail.init(
    {
      UserId: DataTypes.INTEGER,
      AssignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Assignment id is required",
          },
          notEmpty: {
            msg: "Assignment id is required",
          },
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Score is required",
          },
          notEmpty: {
            msg: "Score is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AssignmentDetail",
    }
  );
  return AssignmentDetail;
};
