import BaseDetailPage from "@/scene-components/fitness-app/BaseDetailPage";
import BasePage from "@/scene-components/fitness-app/BasePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    main: undefined;
    submain: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="main">
                <Stack.Screen
                    name="main"
                    component={BasePage}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="submain"
                    // @ts-ignore: Unreachable code error
                    component={BaseDetailPage}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;