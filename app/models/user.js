"use strict";
const { Model } = require("sequelize");
const { hashBcrypt } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.PhaseBatch);
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full name is required",
          },
          notEmpty: {
            msg: "Full name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email is already taken",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Wrong email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 32],
            msg: "Password length must be 6-32 digit",
          },
        },
      },
      role: DataTypes.STRING,
      PhaseBatchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phase batch id is required",
          },
          notEmpty: {
            msg: "Phase batch id is required",
          },
        },
      },
      expo_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          user.password = hashBcrypt(user.password);
        },
      },
    }
  );
  return User;
};
