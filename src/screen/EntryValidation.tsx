import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import arrayShuffle from 'array-shuffle';
import {
  Provider as PaperProvider,
  DefaultTheme,
  IconButton,
  Snackbar
} from "react-native-paper";
import { colors } from '../constans';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { guardarDatoJSON, recuperarDatoJSON } from '../utils/storage';
import { getDias, getLogin } from '../services';
import { enviarSms } from '../services/sms';

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



export default function EntryValidation({route, navigation}) {
  const [pin, setPin]= useState('');
  const [arrayNumero,setArrayNumero] =useState(['1','2','3','4','5','6','7','8','9','0']);
  // const [arrayNumero,setArrayNumero] =useState([{item:1},{item:2},{item:3},{item:4},{item:5},{item:6},{item:7},{item:8},{item:9},{item:0}]);
  const [isVisibleButton, setIsVisibleButton] = useState(true)
  const [isVisiblePIN, setIsVisiblePIN] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snack_message, setSnackMsg] = useState('')
  const [ddias, setDdias] = useState(60)
  const {celular} = route.params 
  const [intentos, setIntentos] = useState(0);
  const [visibleForget, setVisibleForget] = useState('none')
  const [visibleCode, setVisibleCode] = useState(true)
  const [celNumero, setCelNumero] = useState('')
  const [sms,setSms] = useState('');
  const [codeSms,setCodeSms] = useState('');
  const [nSms, setNSms] = useState('¿ Has olvidado tu Clave ?')

  useEffect(()=>{
    const shuffle=arrayShuffle(arrayNumero)
    setArrayNumero(shuffle)   
    const x=setSms(Math.floor(Math.random() * (9999 - 1000)) + 1000)  
  },[])

  useEffect(()=>{
    console.log(pin);
    
    if (pin.length == 6) {
      setIsVisibleButton(false);
      setIsVisiblePIN(true)
    }
    if (pin.length < 6) {
      setIsVisibleButton(true);
      setIsVisiblePIN(false)
    }
  },[pin])

  useEffect(()=>{
    if(intentos == 1){
      setVisibleForget('flex')
    }
  },[intentos])

  async function recuperarLogin(cargador,pin){
    console.log(cargador);
    
    const resp = await getLogin(cargador,pin);    
    console.log(resp);
    
    let res = resp[0]
    var param = {
      Id_Cliente:res.Id_Cliente
    }
    setVisible(true)
    if (res.code == '000') {
      const dias = await getDias(param)
      console.log(dias.resultado[0]);
      if (dias.resultado[0].Dias >= ddias) {
        Alert.alert('Informacion', 'Es necesario que cambia su PIN')
        await guardarDatoJSON('DAY',dias.resultado[0])
        navigation.navigate('Validation')
      }else{
        setSnackMsg('¡ Bienvenido a ' + res.Nombre_Contacto +' !')
        await guardarDatoJSON('LOGIN', res)  
        navigation.navigate('MainApp')
      }      
    } else {
      setSnackMsg('¡ ' + res.message + ' !');
      setIntentos(intentos + 1);
      setPin('')
    }
    
  }
  
  const login = async () =>{
      // validatePwd(pwd);
      const dataEmpresas = await recuperarDatoJSON('DATA_INI')
      let empresa = dataEmpresas.filter(x => x.select == true)
      setCelNumero(empresa[0].cargador)
      console.log(empresa);

      console.log(pin);
      if (empresa != []) {
        recuperarLogin(celular, pin)      
      }else {
      recuperarLogin(empresa[0].cargador, pin)
      }
      // navigation.navigate('MainApp')
  }

  async function enviarSMS() {
    await enviarSms(celNumero,sms)
    setVisibleCode(false)
    setNSms('¿ Reenviar Codigo ?')
  }

  function validadCode(){
    setVisible(true)
    if(sms == codeSms){
      setSnackMsg('¡ Ingrese su nueva Contraseña!')
      navigation.replace('Validation')
    }else{
      setSnackMsg('¡ Codigo de Validacion Incorrecto !')
    }
  }


  return (
    <PaperProvider>
    <View style={styles.container}>
    <Text style={styles.title}>Ingresa tu {'\n'} clave de acceso</Text>
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
      <View style={{alignItems:'center', display:visibleForget}}>
        <TouchableOpacity onPress={()=>enviarSMS()}>
          <Text style={{color:'blue'}}>{nSms}</Text>          
        </TouchableOpacity>
      </View>
      <View style={{alignItems:'center', display: visibleCode ? 'none' : 'flex'}}>
        <TextInput maxLength={4} placeholder={'_ _ _ _'} keyboardType='numeric' value={codeSms} onChangeText={(codeSms)=>setCodeSms(codeSms)} style={{height:50}}></TextInput>
        <Text style={{paddingBottom:10}} >Ingrese Codigo de validación</Text>
        <View>
          <TouchableOpacity disabled={codeSms.length == 4 ? false : true} onPress={()=>validadCode()}
           style={{borderWidth:1, borderRadius:5, borderColor:'white', backgroundColor:codeSms.length == 4 ? 'red' : '#C6C6C6', paddingHorizontal:15,paddingVertical:8, elevation:5}}>
            <Text style={{color:'white'}}>Validar</Text>
          </TouchableOpacity>
        </View>
        
      </View>
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
          onPress={()=>login()}>
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
                Entrar al Sistema
              </Text>
            </View>
          </TouchableOpacity>
      </View>
      <Snackbar            
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
          },
        }}
      >
        {snack_message}
      </Snackbar>
    </View></PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.background,
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
    textAlign: 'center',
    paddingTop:10
  },
  nmr:{
    fontSize: 25, 
    color: "#000000", 
    fontWeight: "600",
  },
});