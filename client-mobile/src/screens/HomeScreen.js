import React from "react";
import { View, Text } from "react-native";
import CarouselMovie from "../components/CarouselMovie";
import TrendingMovies from "../components/TrendingMovies";
import TrendingPeople from "../components/TrendingPeople";
import Styles from "../styles/OverallStyle";

const HomeScreen = (props) => {
    return (
        <View style={Styles.sectionBG}>
            <CarouselMovie navigation={props.navigation} />
            <TrendingPeople />
            <TrendingMovies navigation={props.navigation} />
        </View>
    );
};

export default HomeScreen;
