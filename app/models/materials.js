'use strict';
const {
  Model
} = require('sequelize');
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
  Materials.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    references: DataTypes.TEXT,
    dayWeek: DataTypes.STRING,
    PhaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Materials',
  });
  return Materials;
};