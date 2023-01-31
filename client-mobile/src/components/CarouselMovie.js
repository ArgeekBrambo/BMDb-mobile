import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SliderBox } from "react-native-image-slider-box";
import Constants from "../styles/Constants";
import { useQuery, gql } from "@apollo/client";

const GET_MOVIES = gql`
    query {
        movies {
            id
            original_title
            backdrop_path
        }
    }
`;

const CarouselMovie = (props) => {
    // const [MovieList, setMovieList] = useState([]);
    // const [ImageList, setImageList] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("https://bmdb.foxhub.space/customers/movies")
    //         .then((result) => {
    //             setMovieList(result.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     // console.log(MovieList);
    // }, []);

    // useEffect(() => {
    //     const imageList = MovieList.map((movie) => {
    //         return "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
    //     });
    //     setImageList(imageList.slice(0, 10));
    //     // console.log(imageList);
    // }, [MovieList]);

    const { loading, error, data } = useQuery(GET_MOVIES);
    // console.log(data);

    if (loading) return <Text>Loading...</Text>;
    return (
        <View>
            <SliderBox
                // images={ImageList}
                images={data?.movies.map((movie) => {
                    // console.log(movie);
                    return (
                        "https://image.tmdb.org/t/p/original" +
                        movie.backdrop_path
                    );
                })}
                sliderBoxHeight={200}
                dotColor={Constants.secondaryColor}
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay={true}
                circleLoop={true}
                resizeMethod={"resize"}
                resizeMode={"cover"}
                paginationBoxStyle={{
                    position: "absolute",
                    bottom: 0,
                    padding: 0,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                ImageComponentStyle={{
                    borderRadius: 15,
                    width: "97%",
                    marginTop: 5,
                }}
                imageLoadingColor="#2196F3"
                onCurrentImagePressed={(index) => {
                    // console.log(props);
                    props.navigation.navigate("movieDetails", {
                        movieId: data?.movies[index].id,
                    });
                }}
            />
        </View>
    );
};

export default CarouselMovie;
