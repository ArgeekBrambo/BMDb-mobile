import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Constants from "./src/styles/Constants";
import Icon from "react-native-vector-icons/Ionicons";
import MovieDetails from "./src/screens/MovieDetails";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloConfig";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={headerStyle}
                    />
                    <Stack.Screen
                        name="movieDetails"
                        component={MovieDetails}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}

const headerStyle = {
    title: "BMDb",
    headerStyle: {
        backgroundColor: Constants.baseColor,
    },
    headerTitleStyle: {
        color: Constants.textColor,
        backgroundColor: "#f3ce13",
    },
    headerLeft: () => (
        <Icon name="menu" size={34} color={Constants.textColor} />
    ),
    headerRight: () => (
        <Icon name="search" size={28} color={Constants.textColor} />
    ),
};

export default App;
