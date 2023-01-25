import { StyleSheet, Dimensions } from "react-native";
import Constants from "./Constants";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Styles = StyleSheet.create({
    sectionBG: {
        backgroundColor: Constants.baseColor,
        height: deviceHeight,
    },
    trendingPeopleImage: {
        height: 70,
        width: 70,
        borderRadius: 500,
    },
    trendingPeopleName: {
        width: 60,
        color: Constants.textColor,
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
    },
    trendingPeopleContainer: {
        margin: 10,
    },
    heading: {
        fontSize: 19,
        color: Constants.fadedColor,
        margin: 10,
    },
    posterImage: {
        height: 250,
        width: 150,
        borderRadius: 10,
    },
    movieTitle: {
        color: Constants.textColor,
        width: 150,
        textAlign: "center",
        marginTop: 5,
        fontSize: 16,
    },
    imageBg: {
        width: deviceWidth,
        height: 250,
    },
    detailsMovieTitle: {
        fontSize: 28,
        color: Constants.textColor,
        textAlign: "center",
        marginTop: -40,
    },
    overview: {
        color: Constants.textColor,
        marginHorizontal: 10,
        textAlign: "justify",
        fontSize: 16,
    },
    details: {
        color: Constants.secondaryColor,
        fontSize: 15,
        marginLeft: 10,
        fontWeight: "bold",
    },
    detailsRight: {
        color: Constants.secondaryColor,
        fontSize: 15,
        marginRight: 10,
        fontWeight: "bold",
        textAlign: "right",
    },
    detailsStar: {
        marginTop: 2,
        marginLeft: 5,
        textAlign: "right",
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
});

export default Styles;
