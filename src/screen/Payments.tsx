import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments ({navigation}){
    return(
        <SafeAreaView style={{flex: 1}}>
            <Text>Otros Pagos</Text>
        </SafeAreaView>
    );
}