import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "../styles/Constants";
import axios from "axios";
import Loader from "./Loader";
import Styles from "../styles/OverallStyle";

const TrendingMovies = (props) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get("https://bmdb.foxhub.space/customers/movies")
            .then((result) => {
                setMovies(result.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <View>
            {loading ? (
                <Loader />
            ) : (
                <View>
                    <Text style={Styles.heading}>Trending Movies</Text>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={movies}
                        horizontal={true}
                        renderItem={(item) => displayMovies(item, props)}
                        ItemSeparatorComponent={() => (
                            <View style={{ width: 10 }} />
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const displayMovies = ({ item }, props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate("movieDetails", { movieId: item.id });
            }}
        >
            <Image
                source={{
                    uri:
                        "https://image.tmdb.org/t/p/original" +
                        item.poster_path,
                }}
                style={Styles.posterImage}
            />
            <Text style={Styles.movieTitle}>{item.original_title}</Text>
        </TouchableOpacity>
    );
};

export default TrendingMovies;
