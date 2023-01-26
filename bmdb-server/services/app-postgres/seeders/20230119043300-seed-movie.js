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
    const dataMovie = require('../data/movies.json');
    dataMovie.forEach(movie => {
      movie.createdAt = new Date();
      movie.updatedAt = new Date();
      movie.slug = movie.title.toLowerCase().replace(/ /g, '-');
      delete movie.adult;
      delete movie.id
      delete movie.original_language
      delete movie.popularity
      delete movie.title
      delete movie.video
    });
    await queryInterface.bulkInsert('Movies', dataMovie, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
