import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Styles from "../styles/OverallStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = (props) => {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://bmdb.foxhub.space/customers/movies/" +
                    props.route.params.movieId
            )
            .then((result) => {
                setMovie(result.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                                        movie.backdrop_path,
                                }}
                                style={Styles.imageBg}
                            />
                        </View>
                        <Text style={Styles.detailsMovieTitle}>
                            {movie.original_title}
                        </Text>
                    </View>
                )}
                <Text style={Styles.heading}>OVERVIEW</Text>
                <Text style={Styles.overview}>{movie.overview}</Text>

                <View style={Styles.detailsContainer}>
                    <View>
                        <Text style={Styles.heading}>RELEASE DATE</Text>
                        <Text style={Styles.details}>{movie.release_date}</Text>
                    </View>
                    <View>
                        <Text style={Styles.heading}>VOTE COUNT</Text>
                        <Text style={Styles.detailsRight}>
                            {movie.vote_count}
                        </Text>
                    </View>
                </View>

                <View style={Styles.detailsContainer}>
                    <View>
                        <Text style={Styles.heading}>GENRE</Text>
                        <Text style={Styles.details}>{movie.genre?.name}</Text>
                    </View>
                    <View>
                        <Text style={Styles.heading}>RATING</Text>
                        <Text style={Styles.detailsRight}>
                            {movie.vote_average}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MovieDetails;
