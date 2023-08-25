import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../../screen/Dashboard";
import Movements from "../../screen/Movements";

const MainStack = createStackNavigator();

export default ({navigation}) => {
    return(
        <MainStack.Navigator>
            <MainStack.Screen 
                name="Principal"
                options={{
                    title: 'Home',
                    headerShown: false
                }}
                component={Dashboard}
                />
            <MainStack.Screen 
                name="Movements"
                options={{
                    title: 'Movimientos',
                    headerShown: true
                }}
                component={Movements}
            />
        </MainStack.Navigator>
    )
}