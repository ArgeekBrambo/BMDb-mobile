'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId', as: 'genre' });
      Movie.hasMany(models.MovieCast, { foreignKey: 'movieId' });
    }
  }
  Movie.init({
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Original title is required' },
        notEmpty: { msg: 'Original title is required' }
      }
    },
    slug: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    release_date: DataTypes.STRING,
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Overview is required' },
        notEmpty: { msg: 'Overview is required' }
      }
    },
    vote_average: DataTypes.INTEGER,
    vote_count: DataTypes.INTEGER,
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Genres',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  Movie.beforeCreate((instance, options) => {
    instance.slug = instance.original_title.split(' ').join('-').toLowerCase();
  })
  return Movie;
};