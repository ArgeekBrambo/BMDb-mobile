'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      original_title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      poster_path: {
        type: Sequelize.STRING
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      vote_average: {
        type: Sequelize.INTEGER
      },
      vote_count: {
        type: Sequelize.INTEGER
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genres',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      ObjectId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};