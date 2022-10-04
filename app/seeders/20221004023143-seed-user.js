"use strict";

const { hashBcrypt } = require("../helpers");

const data = require("../seed.json").users;
const table = "Users";
data.forEach((el) => {
  el.createdAt = el.updatedAt = new Date();
  el.password = hashBcrypt(el.password)
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(table, data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(table, null, {});
  },
};
