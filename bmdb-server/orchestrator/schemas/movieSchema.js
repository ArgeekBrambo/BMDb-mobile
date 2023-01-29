const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const servicePostgres = "http://localhost:4002";
const serviceMongoDb = "http://localhost:4001";

const typeDefs = `#graphql

    type Movie {
        id: ID
        original_title: String
        overview: String
        poster_path: String
        backdrop_path: String
        release_date: String
        vote_average: Float
        vote_count: Int
        genre: Genre
        ObjectId: String
        MovieCasts: [MovieCast]
        user: User
    }

    type Genre {
        id: ID
        name: String
    }

    type MovieCast {
        cast: Cast
    }

    type Cast {
        id: ID
        name: String
        profilePict: String
    }
    
    type User {
        _id: String
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type AddMovieResponse {
        id: ID
        original_title: String
        poster_path: String
        backdrop_path: String
        overview: String
        release_date: String
        genreId: Int
        ObjectId: String
        vote_count: Int
        vote_average: Float
        slug: String
    }

    type AddMovieCastResponse {
        id: ID
        movieId: Int
        castId: Int
    }

    type CombinedResponse {
        newMovie: AddMovieResponse
        movieCast: AddMovieCastResponse
    }

    type CombinedResponseEdit {
        editMovie: AddMovieResponse
        movieCast: AddMovieCastResponse
    }

    input MovieInput {
        original_title: String
        overview: String
        poster_path: String
        backdrop_path: String
        release_date: String
        vote_average: Float
        vote_count: Int
        genre: Int
        ObjectId: String
        castname: String
    }

    input EditMovieInput {
        id: ID
        editInput: MovieInput
    }

    type DeleteResponse {
        message: String
    }
    

    type Query {
        movies: [Movie]
        movie(id: ID): Movie
        # users: [User]
        # movieUsers: [Movie, User]
    }

    type Mutation {
        addMovie(MovieInput: MovieInput): CombinedResponse
        editMovie(EditMovieInput: EditMovieInput): CombinedResponseEdit
        deleteMovie(id: ID): DeleteResponse
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const movies = await redis.get("movies");
                if (movies) {
                    return JSON.parse(movies);
                }
                const movieResponse = await axios.get(
                    `${servicePostgres}/movies`
                );
                const userResponse = await axios.get(`${serviceMongoDb}/user`);

                const movieData = movieResponse.data;
                const userData = userResponse.data;
                // console.log(userData);

                const movieUsers = movieData.map((movie) => {
                    const user = userData.find(
                        (user) => user._id === movie.ObjectId
                    );
                    return {
                        ...movie,
                        user,
                    };
                });
                // console.log(movieUsers);
                await redis.set("movies", JSON.stringify(movieUsers));
                return movieUsers;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        movie: async (_, args) => {
            try {
                const movie = await redis.get(`movie:${args.id}`);
                if (movie) {
                    return JSON.parse(movie);
                }
                const movieResponse = await axios.get(
                    `${servicePostgres}/movies/${args.id}`
                );
                const userResponse = await axios.get(`${serviceMongoDb}/user`);

                const movieData = movieResponse.data;
                const userData = userResponse.data;

                const user = userData.find(
                    (user) => user._id === movieData.ObjectId
                );

                const movieUser = {
                    ...movieData,
                    user,
                };
                await redis.set(`movie:${args.id}`, JSON.stringify(movieUser));
                return movieUser;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },

    Mutation: {
        addMovie: async (_, args) => {
            try {
                const movieResponse = await axios.post(
                    `${servicePostgres}/movies`,
                    args.MovieInput
                );
                console.log(movieResponse.data);
                const movieData = movieResponse.data;
                await redis.del("movies");
                return movieData;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        editMovie: async (_, args) => {
            try {
                const movieResponse = await axios.put(
                    `${servicePostgres}/movies/${args.EditMovieInput.id}`,
                    args.EditMovieInput.editInput
                );
                // console.log(movieResponse.data);
                const movieData = movieResponse.data;
                // console.dir(movieData, { depth: null });
                await redis.del("movies");
                return movieData; 
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        deleteMovie: async (_, args) => {
            try {
                const movieResponse = await axios.delete(
                    `${servicePostgres}/movies/${args.id}`
                );
                // console.log(movieResponse);
                await redis.del("movies");
                return movieResponse.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
};

module.exports = { typeDefs, resolvers };
