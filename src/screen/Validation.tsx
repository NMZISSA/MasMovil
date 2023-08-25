import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import arrayShuffle from 'array-shuffle';
import {
  Provider as PaperProvider,
  DefaultTheme,
  IconButton
} from "react-native-paper";
import { colors } from '../constans';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { guardarDato,recuperarDato } from "../utils/storage";

const theme = {
  ...DefaultTheme,
  roundness: 10,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: "rgba(201,19,64,1)", //for the fab button 201 - 19 - 64 141 - 21 - 50
    background: colors.background,
    placeholder: "#00000080", // border color y placeholder
    button: "rgba(0, 115, 140, 55)",
    letras: "#666666",
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  },
};
 

export default function Validation({navigation}) {
  const [pin, setPin]= useState('');
  const [claroPin,setClaroPin]=useState('');
  const [arrayNumero,setArrayNumero] =useState(['1','2','3','4','5','6','7','8','9','0']);
  // const [arrayNumero,setArrayNumero] =useState([{item:1},{item:2},{item:3},{item:4},{item:5},{item:6},{item:7},{item:8},{item:9},{item:0}]);
  const [isVisibleButton, setIsVisibleButton] = useState(true)
  const [isVisiblePIN, setIsVisiblePIN] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snack_message, setSnackMsg] = useState('')
  const [color,setColor] =('#C6C6C6')

  useEffect(()=>{
    const shuffle=arrayShuffle(arrayNumero)
    setArrayNumero(shuffle) 
    traerPin()    
  },[])

  useEffect(()=>{
    console.log(pin
      );
    
    if (pin.length === 6) {
      console.log('fo');
      
      setIsVisibleButton(false);
      setIsVisiblePIN(true)
    }
    if (pin.length < 6) {
      setIsVisibleButton(true);
      setIsVisiblePIN(false)
    }
  },[pin])

  const validatePwd = (pwd) => {
    // const pwdRegex = /^(?=.*\d)(?=.*[0-9])(?!.*(.)\1)\S{6}/gm;
    // const pwdincremente = /^(?!.*(?:12|23|34|45|56|67|78|89|90|98|87|76|65|54|43|32|21)).+$/gmi;
    // //cambiar validacion incremental :  pwdincremente.test(pwd)
    // if(pwdRegex.test(pwd) && pwdincremente.test(pwd)){
    //     //return (Alert.alert("contraseña: "+pwd));
    //     console.log(pin)
        envCod(pin)
        navigation.navigate('Revalidation')
    // }else{
    //     return (Alert.alert("Contraseña Inválida",'no se admiten secuencias como: \n 111111, 123456 , 654321, 112233'),setPin(""));
    // }
  }

  async function traerPin() {
    setClaroPin(await recuperarDato('PIN'))
  }


  async function envCod(cod) {
    await guardarDato('VALID',cod);
  }

  const revPin=(pi,cpi)=>{
    const fifi = pi.slice(0,-2)
    console.log(fifi)
    console.log(cpi)
    if (fifi == cpi) {
      validatePwd(pi)
    }
    else{
      Alert.alert('Pin Invalido','recuerde que los 4 primeros digitos deben ser su PIN CLARO')
      setPin('');
    }
}


  return (
  <PaperProvider>
    <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <Text style={styles.title}>Ingresa tu {'\n'}clase de acceso</Text>
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <FontAwesome
            style={{marginRight: 10}}
            name={pin.length > 0 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
          <FontAwesome
            style={{marginRight: 10}}
            name={pin.length > 1 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
          <FontAwesome
            style={{marginRight: 10}}
            name={pin.length > 2 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
          <FontAwesome
            style={{marginRight: 10}}
            name={pin.length > 3 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
          <FontAwesome
            style={{marginRight: 10}}
            name={pin.length > 4 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
          <FontAwesome
            name={pin.length > 5 ? 'circle' : 'circle-o'}
            size={20}
            color={'rgba(178, 8, 8, 0.78)'}
          />
      </View>
        <View style={styles.gallery}>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[0]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[1]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[1]}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[2]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[2]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[3]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[3]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[4]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[4]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[5]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[5]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[6]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[6]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[7]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[7]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[8]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[8]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnErase} onPress={() => setPin('')}>
              <Fontisto name="trash" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[9]); }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[9]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnErase} onPress={() => setPin((pin) => pin.slice(0, pin.length - 1))}>
              <FontAwesome5 name="backspace" size={24} color="black" />
              </TouchableOpacity>
        </View>
      
        <View>
      <TouchableOpacity style={{elevation: 5,
          height: 55,
          width: "80%",
          backgroundColor: !isVisibleButton ? 'red' :'#C6C6C6',//theme.colors.button,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "white",
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",}}  
          disabled={isVisibleButton} 
          onPressIn={()=>{
            validatePwd(pin)
            }}>
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 13, color: "white", fontWeight: "bold" }}
              >
                Continuar
              </Text>
            </View>
          </TouchableOpacity>
      </View>

    </View>
   </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 57,
    height: 57,
    marginTop: 15,
    marginBottom: 15,
    marginRight:15,
    marginLeft:15,
    borderRadius: 50
    },
  btnErase: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    width: 57,
    height: 57,
    marginTop: 15,
    marginBottom: 15,
    marginRight:15,
    marginLeft:15,
    borderRadius: 50
    },
  caja: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  gallery: {
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:300,
    padding:15
  },
  img:{
    width:37,
    height:20,
    marginTop: 15,
    marginBottom: 15,
    marginRight:15,
    marginLeft:15

  },
  title:{
    fontSize: 25, 
    color: "red", 
    fontWeight: "600",
    padding: 25, 
    width:350,
    textAlign: 'center',

  },
  pwd:{
    fontSize: 18, 
    color: "#DDDDDD", 
    fontWeight: "bold",
    padding: 20, 
    textAlign: 'center',

  },
  nmr:{
    fontSize: 25, 
    color: "#000000", 
    fontWeight: "600",
  },
  btn1: {
    elevation: 5,
    height: 55,
    width: "80%",
    backgroundColor: theme.colors.button,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
});