import { View, Text, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "../styles/Constants";
import axios from "axios";
import Loader from "./Loader";
import Styles from "../styles/OverallStyle";

const TrendingPeople = () => {
    const [loading, setLoading] = useState(true);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://api.themoviedb.org/3/trending/person/week?api_key=fcf91c8aa652949d7dd3db150a5fcc8b"
            )
            .then((result) => {
                // console.log(result.data.results);
                setPeople(result.data.results);
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
                    {/* <Text>{people}</Text> */}
                    <Text style={Styles.heading}>Trending People</Text>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={people}
                        renderItem={displayPeople}
                        horizontal
                    />
                </View>
            )}
        </View>
    );
};

const displayPeople = ({ item }) => {
    return (
        <View style={Styles.trendingPeopleContainer}>
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/original${item?.profile_path}`,
                }}
                style={Styles.trendingPeopleImage}
            />
            <Text style={Styles.trendingPeopleName}>{item?.name}</Text>
        </View>
    );
};

export default TrendingPeople;
