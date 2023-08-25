import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme, Provider, Text } from "react-native-paper";


export default function Direccion({navigation}) {
    return(
        <PaperProvider>
            <View>
                <Text>DireccDion</Text>
            </View>
        </PaperProvider>
    )
}