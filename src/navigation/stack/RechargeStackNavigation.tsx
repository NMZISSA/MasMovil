import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Recharge from "../../screen/Recharge";

const RechargeStack = createStackNavigator();

export default ({navigation}) => {
    return(
        <RechargeStack.Navigator>
            <RechargeStack.Screen 
                name="Recharge"
                options={{
                    title: 'Recargas',
                    headerShown: false
                }}
                component={Recharge}
                />
            {/* <RechargeStack.Screen 
                name="Movements"
                options={{
                    title: 'Movimientos',
                    headerShown: true
                }}
                component={Movements}
            /> */}
        </RechargeStack.Navigator>
    )
}