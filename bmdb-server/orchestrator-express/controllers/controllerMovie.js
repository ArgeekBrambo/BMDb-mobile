const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const servicePostgres = 'http://localhost:4002';
const serviceMongoDb = 'http://localhost:4001';

class ControllerMovie {
    static async getAll(req, res, next) {
        try {
            let cacheMoviesData = await redis.get('movies:data');
            if (cacheMoviesData) {
                return res.status(200).json(JSON.parse(cacheMoviesData));
            }
            const movieResponse = await axios.get(`${servicePostgres}/movies`);
            const movies = movieResponse.data;
            const userResponse = await axios.get(`${serviceMongoDb}/user`);
            const users = userResponse.data;

            const result = movies.map(movie => {
                const user = users.find(user => user._id === movie.ObjectId);
                return {
                    id: movie.id,
                    title: movie.original_title,
                    slug: movie.slug,
                    MovieCasts: movie.MovieCasts,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    overview: movie.overview,
                    genre: movie.genre,
                    user: user
                };
            })

            // console.log('====================================');
            // console.log(result);
            // console.log('====================================');
            // console.log('====================================');
            // console.log(movies, users);
            // console.log('====================================');
            // res.status(200).json(data);
            await redis.set('movies:data', JSON.stringify(result));

            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async addMovie(req, res, next) {
        try {
            const { original_title, overview, poster_path, backdrop_path, release_date, vote_average, vote_count, genre, ObjectId, castname } = req.body;

            const newMovie = await axios.post(`${servicePostgres}/movies`, {
                original_title,
                overview,
                poster_path,
                backdrop_path,
                release_date,
                vote_average,
                vote_count,
                genreId: genre,
                ObjectId,
                castname,
                profilePict: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            });
            await redis.del('movies:data');
            res.status(201).json(newMovie.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async populateForm(req, res, next) {
        try {
            const { id } = req.params;
            const movieResponse = await axios.get(`${servicePostgres}/movies/${id}`);
            const movie = movieResponse.data;
            const userResponse = await axios.get(`${serviceMongoDb}/user/${movie.ObjectId}`);
            const user = userResponse.data;

            const result = {
                id: movie.id,
                title: movie.original_title,
                slug: movie.slug,
                MovieCasts: movie.MovieCasts,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                overview: movie.overview,
                genre: movie.genre,
                user: user
            };
            res.status(200).json(result); 
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async editMovie(req, res, next) {
        try {
            const { id } = req.params;
            const { original_title, overview, poster_path, backdrop_path, release_date, vote_average, vote_count, genre, ObjectId, castname } = req.body;
            const editMovie = await axios.put(`${servicePostgres}/movies/${id}`, {
                original_title,
                overview,
                poster_path,
                backdrop_path,
                release_date,
                vote_average,
                vote_count,
                genreId: genre,
                ObjectId,
                castname,
                profilePict: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            });
            await redis.del('movies:data');
            res.status(200).json(editMovie.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params;
            const deleteMovie = await axios.delete(`${servicePostgres}/movies/${id}`);
            await redis.del('movies:data');
            res.status(200).json(deleteMovie.data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ControllerMovie;