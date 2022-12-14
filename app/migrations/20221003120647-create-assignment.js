"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Assignments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      day: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      week: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deadline: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      scorePercentage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      PhaseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Phases",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Assignments");
  },
};
