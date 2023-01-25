import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
