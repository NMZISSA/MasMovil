import React, { useState,useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserCliente from '../../screen/UserCliente';
import {Alert, Dimensions, Pressable, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal, Text} from 'react-native-paper';
import { eliminarDatoJSON } from '../../utils/storage';
import { StackActions } from '@react-navigation/native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const UserStack = createStackNavigator();

export default ({navigation}) => {

  const [modalSmsChange, setModalSmsChange] = useState(false);
  const [sms, setSms] = useState(0);

  function signOutAsync(){
    eliminarDatoJSON('LOGIN') 
    eliminarDatoJSON('VENDEDOR')
    navigation.dispatch(
      StackActions.popToTop('Home')
    )
  }
  function closesesion(){    
    Alert.alert(
      'Cerrar Sesion',
      '¿Esta seguro de cerrar sesion?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Salir', onPress: () => signOutAsync() }
      ],
      { cancelable: false }
    );
  }

  function smsChange (){
     


  }

    useEffect(()=>{
    const x=setSms(Math.floor(Math.random() * (9999 - 1000)) + 1000)
  },[])

  return (
    <UserStack.Navigator
      initialRouteName="UserCliente"
      screenOptions={{headerMode: 'screen'}}>
      <UserStack.Screen
        name="UserCliente"
        options={{
          title: 'Usuario',
          headerStyle: { backgroundColor: '#F2F2F2'},
          headerTitleStyle: { color: "red", fontSize:30},
          headerShown: true,
          headerLeft: false,
          headerRight: () => (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangePinSms')
                //setModalSmsChange(true);
              }}
              style={{ borderRadius:5, borderWidth:1, borderColor:"white", backgroundColor:"red", elevation:5, width:95, marginRight:5}}>
              <View style={{flexDirection: 'row', alignItems:"center", marginRight:6, marginVertical:4}}>
                <Ionicons
                  name="keypad"
                  size={25}
                  color="white"
                  style={{marginRight: 2, marginLeft:8}}
                />
                <Text style={{color:"white", fontWeight:"bold"}}>{'Cambio\nClave'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => closesesion()}
              style={{ borderRadius:5, borderWidth:1, borderColor:"white", backgroundColor:"red", elevation:5, width:90}}>
              <View style={{flexDirection: 'row', alignItems:"center", marginRight:6, marginVertical:4}}>
                <FontAwesome
                  name="close"
                  size={25}
                  color="white"
                  style={{marginRight: 10, marginLeft:10}}
                />
                <Text style={{color:"white", fontWeight:"bold"}}>Cerrar Sesion</Text>
              </View>
            </TouchableOpacity>
            </View>            
            
          ),
        }}
        component={UserCliente}
      />
      {/* <UserStack.Screen 
                name="Movements"
                options={{
                    title: 'Movimientos',
                    headerShown: true
                }}
                component={Movements}
            /> */}
    </UserStack.Navigator>
  );
};
