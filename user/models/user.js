"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can not be empty",
          },
          notNull: {
            msg: "Name can not be null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already used",
        },
        validate: {
          notEmpty: {
            msg: "Email can not be empty",
          },
          notNull: {
            msg: "Email can not be null",
          },
          isEmail: {
            msg: "Please use right email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password can not be empty",
          },
          notNull: {
            msg: "Password can not be null",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role can not be empty",
          },
          notNull: {
            msg: "Role can not be null",
          },
        },
      },
      PhaseBatchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phase Batch can not be empty",
          },
          notNull: {
            msg: "Phase Batch can not be null",
          },
        },
      },
      expo_token: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status can not be empty",
          },
          notNull: {
            msg: "Status can not be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};
