import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CellValidation from "../../screen/CellValidation";
import User from "../../screen/User";
import Bienvenido from "../../screen/example";

const PaymentsStack = createStackNavigator();

export default ({navigation}) => {
    return(
        <PaymentsStack.Navigator>
            <PaymentsStack.Screen 
                name="CellValidation"
                options={{
                    title: 'Otros pagos',
                    headerShown: false
                }}
                component={Bienvenido}
                />
            {/* <PaymentsStack.Screen 
                name="Movements"
                options={{
                    title: 'Movimientos',
                    headerShown: true
                }}
                component={Movements}
            /> */}
        </PaymentsStack.Navigator>
    )
}