"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Thread.hasMany(models.Comment);
      Thread.belongsTo(models.User);
      // define association here
    }
  }
  Thread.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};
