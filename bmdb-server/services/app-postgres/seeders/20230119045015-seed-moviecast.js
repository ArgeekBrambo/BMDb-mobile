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
    const dataMovieCast = require('../data/moviecasts.json');
    dataMovieCast.forEach(moviecast => {
      moviecast.createdAt = new Date();
      moviecast.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('MovieCasts', dataMovieCast, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MovieCasts', null, {});
  }
};
