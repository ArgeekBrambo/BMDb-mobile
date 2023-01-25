import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigators/MainStack";
// App.js

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}
