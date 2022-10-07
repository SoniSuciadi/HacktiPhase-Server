"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PhaseBatches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BatchId: {
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
      startedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("PhaseBatches");
  },
};
