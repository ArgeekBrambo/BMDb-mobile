const { Movie, User, Cast, Genre, MovieCast } = require("../models");
const { sequelize } = require("../models");

class ControllerMovie {
    static async getAll(req, res, next) {
        try {
            const movies = await Movie.findAll({
                include: [
                    { 
                        model: MovieCast,
                        include: [
                            { 
                                model: Cast, 
                                as: "cast",
                                attributes: ["id", "name", "profilePict"]
                            }
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt", "castId", "movieId"] }
                    },
                    { 
                        model: Genre, 
                        as: "genre" ,
                        attributes: ["id", "name"]
                    },
                ],
                attributes: { exclude: ["createdAt", "updatedAt", "genreId"] },
                order: [["id", "ASC"]]
            });
            res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    }

    static async addMovie(req, res, next) {
        const { original_title, poster_path, backdrop_path, overview, release_date, genre, castname, vote_count, vote_average,ObjectId } = req.body;
        // const authorId = req.user.id;
        const trans = await sequelize.transaction();
        try {
            if(!original_title || !overview) {
                throw { name: "BadRequest" };
            }
            const newMovie = await Movie.create({
                original_title,
                poster_path,
                backdrop_path,
                overview,
                release_date,
                genreId: genre,
                ObjectId,
                vote_count,
                vote_average
            }, {
                transaction: trans
            });
            const cast = await Cast.findOrCreate({
                where: {
                    name: castname
                },
                defaults: {
                    name: castname,
                    profilePict: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                },
                transaction: trans
            })
            const movieCast = await MovieCast.create({
                movieId: newMovie.id,
                castId: cast[0].id
            }, {
                transaction: trans
            });
            await trans.commit()
            res.status(201).json({newMovie, movieCast});
        } catch (error) {
            await trans.rollback()
            next(error);
        }
    }

    static async populateForm(req, res, next) {
        try {
            const movie = await Movie.findByPk(req.params.id, {
                include: [
                    { 
                        model: MovieCast,
                        include: [
                            { 
                                model: Cast, 
                                as: "cast",
                                attributes: ["id", "name", "profilePict"]
                            }
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt", "castId", "movieId"] }
                    },
                    { 
                        model: Genre, 
                        as: "genre" ,
                        attributes: ["id", "name"]
                    },
                ],
                attributes: { exclude: ["createdAt", "updatedAt", "genreId"] },
            });
            if(!movie) {
                throw { name: "NotFound" };
            }
            // console.log(movie);
            res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    }

    static async editMovie(req, res, next) {
        const { original_title, poster_path, backdrop_path, overview, release_date, genre, castname, vote_count, vote_average } = req.body;
        const { id } = req.params;
        const authorId = req.user.id;
        const newMovie = {
            original_title,
            poster_path,
            backdrop_path,
            overview,
            release_date,
            genreId: genre.id,
            authorId,
            vote_count,
            vote_average
        };
        const newCast = {
            name: castname,
            profilePict: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        }

        const trans = await sequelize.transaction();
        try {
            if(!original_title || !overview) {
                throw { name: "BadRequest" };
            }
            const movie = await Movie.update(newMovie, {
                where: {
                    id
                },
                returning: true,
                transaction: trans
            });
            const cast = await Cast.findOrCreate({
                where: {
                    name: castname
                },
                defaults: newCast,
                transaction: trans  
            })
            const movieCast = await MovieCast.update({
                castId: cast[0].id
            }, {
                where: {
                    movieId: id
                },
                returning: true,
                transaction: trans
            })
            await trans.commit()
            res.status(200).json({movie, movieCast});
        } catch (error) {
            next(error);
        }
    }

    static async deleteMovie(req, res, next) {
        const { id } = req.params;
        try {
            const movie = await Movie.findByPk(id);
            if(!movie) {
                throw { name: "NotFound" };
            }
            await Movie.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "Movie deleted" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllerMovie;
