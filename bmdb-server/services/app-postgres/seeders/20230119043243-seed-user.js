'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const dataUser = require('../data/users.json');
    dataUser.forEach(user => {
      const bcrypt = require('bcrypt');
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = bcrypt.hashSync(user.password, 10);
    });
    await queryInterface.bulkInsert('Users', dataUser, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
