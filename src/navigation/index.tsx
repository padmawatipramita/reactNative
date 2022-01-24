import React from 'react';
import { 
    NavigationContainer 
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import HomeScreen from '../screen/HomeScreen';
import DetailScreen from '../screen/DetailScreen';
import FavScreen from '../screen/FavScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }} 
                initialRouteName={"HomeScreen"}
                >
                <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
                <Stack.Screen name={"FavScreen"} component={FavScreen} />
                <Stack.Screen name={"DetailScreen"} component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;