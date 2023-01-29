import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Styles from "../styles/OverallStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from "@apollo/client";

const GET_MOVIE = gql`
    query ExampleQuery($id: ID!) {
        movie(id: $id) {
            id
            original_title
            overview
            poster_path
            backdrop_path
            release_date
            vote_average
            vote_count
            genre {
                id
                name
            }
            ObjectId
            MovieCasts {
                cast {
                    id
                    name
                    profilePict
                }
            }
            user {
                _id
                username
                email
                role
                phoneNumber
                address
            }
        }
    }
`;

const MovieDetails = (props) => {
    // console.log(props.route.params.id)
    // const [loading, setLoading] = useState(true);
    // const [movie, setMovie] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get(
    //             "https://bmdb.foxhub.space/customers/movies/" +
    //                 props.route.params.movieId
    //         )
    //         .then((result) => {
    //             setMovie(result.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: props.route.params.movieId },
    });
    // console.log(props.route.params.movieId, "movieId");
    // console.log(data, "data");

    return (
        <SafeAreaView>
            <View style={Styles.sectionBG}>
                {loading ? (
                    <Loader />
                ) : (
                    <View>
                        <View>
                            <Image
                                source={{
                                    uri:
                                        "https://image.tmdb.org/t/p/original" +
                                        data?.movie.backdrop_path,
                                }}
                                style={Styles.imageBg}
                            />
                        </View>
                        <Text style={Styles.detailsMovieTitle}>
                            {data?.movie.original_title}
                        </Text>
                    </View>
                )}
                <Text style={Styles.heading}>OVERVIEW</Text>
                <Text style={Styles.overview}>{data?.movie.overview}</Text>

                <View style={Styles.detailsContainer}>
                    <View>
                        <Text style={Styles.heading}>RELEASE DATE</Text>
                        <Text style={Styles.details}>
                            {data?.movie.release_date}
                        </Text>
                    </View>
                    <View>
                        <Text style={Styles.heading}>VOTE COUNT</Text>
                        <Text style={Styles.detailsRight}>
                            {data?.movie.vote_count}
                        </Text>
                    </View>
                </View>

                <View style={Styles.detailsContainer}>
                    <View>
                        <Text style={Styles.heading}>GENRE</Text>
                        <Text style={Styles.details}>
                            {data?.movie?.genre?.name}
                        </Text>
                    </View>
                    <View>
                        <Text style={Styles.heading}>RATING</Text>
                        <Text style={Styles.detailsRight}>
                            {data?.movie.vote_average}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MovieDetails;
