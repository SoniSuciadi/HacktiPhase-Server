'use strict';
const {
  Model
} = require('sequelize');
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
  PhaseBatch.init({
    BatchId: DataTypes.INTEGER,
    PhaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhaseBatch',
  });
  return PhaseBatch;
};