import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Collections from "../../screen/Collections";

const CollectionsStack = createStackNavigator();

export default ({navigation}) => {
    return(
        <CollectionsStack.Navigator>
            <CollectionsStack.Screen 
                name="Collections"
                options={{
                    title: 'Recaudaciones',
                    headerShown: false
                }}
                component={Collections}
                />
            {/* <RechargeStack.Screen 
                name="Movements"
                options={{
                    title: 'Movimientos',
                    headerShown: true
                }}
                component={Movements}
            /> */}
        </CollectionsStack.Navigator>
    )
}