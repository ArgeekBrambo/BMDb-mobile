"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MovieCast extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MovieCast.belongsTo(models.Movie, { foreignKey: "movieId", as: "movie" });
            MovieCast.belongsTo(models.Cast, { foreignKey: "castId", as: "cast" });
        }
    }
    MovieCast.init(
        {
            movieId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Movies",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            castId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Movies",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
        },
        {
            sequelize,
            modelName: "MovieCast",
        }
    );
    return MovieCast;
};
