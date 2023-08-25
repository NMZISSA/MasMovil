import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useRef }  from "react"
import { Image, StyleSheet, Text, View, KeyboardAvoidingView,TextInput as TxtInput,Pressable,Dimensions, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Provider as PaperProvider, DefaultTheme,TextInput } from "react-native-paper";
import LottieLoader from "../components/LottieLoader";
import { initialLottieProps, pauseAnimation } from "../components/LottieLoader/LottieLoader";
import { images } from "../constans";
import { guardarDato, guardarDatoJSON, recuperarDatoJSON } from "../utils/storage";
import { TextInputMask } from "react-native-masked-text";
import { colors } from "../constans"
import { eleve } from "../constans";
import ModalAddNumber from "../modals/ModalAddNumber";
import { SafeAreaView } from "react-native-safe-area-context";
import { enviarSms } from "../services/sms";
import { getDias, getRegistrado, getTraerxCargador, Post } from "../services";
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    txt:colors.txt,
    href:colors.href,
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  },
  eleve:{
    btn:eleve.button,
  }
};

interface LottieProps {
    speed: number,
    color: string,
    lottiecolor: string,
    zindex: number
}

const emptyFormaPago = null;

export default function ChangePinSms({navigation}){

  const [numberCelular, setNumberCelular] = useState('');
  const [can_touch, setCanTouch] = useState(true);
  const [number_color, setNumberColor] = useState("red");
  const [celular_error, setCelularError] = useState(false);
  const modalAddNumberref = useRef();
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const [visible, setVisible] = useState(false);
  const [formaPagoSelected, setFormaPagoSelected] = useState(emptyFormaPago)
  const [empresa, setEmpresa] = useState('Pale Consultores');
  const [numero, setNumero] = useState('9** *** 158');
  const [habil, setHabil] = useState(true);
  const [renv, setRenv] = useState(true);
  const [isVal,setIsVal] = useState(true);
  const [conti,setConti] = useState(true);
  const [codigo,setCodigo] = useState('');
  const [sms,setSms] = useState(0);
  const [time,setTime]=useState(60);
  const [startTimer,setStartTimer]=useState(false);
  let interval = useRef();


useEffect(() => {
  if(startTimer==true){
       interval = setInterval(() => {
         
            if (time == 0) {
              clearInterval(interval.current)
              setTime(60)
              setStartTimer(false)  
              setRenv(false)
            }
            else{
              setTime(time => time - 1)
            }
            
            
    }, 1000);
  };
  return () => {
      clearInterval(interval.current);
  }
}, [startTimer])


  function verificar(x,y){
      if (x == y) {
      //setConti(false); 
      navigation.navigate('PasswordChange')

    }
    else{
      Alert.alert('Codigo Erroneo','Ingrese el codigo correcto');
      setStartTimer(true);
    }
  }

  useEffect(()=>{
    const x=setSms(Math.floor(Math.random() * (9999 - 1000)) + 1000)

  },[])

  async function validacioncell(){
    console.log('asdasdsa');
      //setHabil(true)
      setRenv(false)
      enviarSms('977860065', sms)
    
  }



  async function continuar() {
    
  }

  return(
    <PaperProvider theme={theme}>
      <View style={{flex:1, backgroundColor: theme.colors.background, justifyContent: "space-evenly"}}>
              
        <View style={{alignItems:"center",}}>

        <View style={{
          alignItems:"center",
          paddingTop: 15
        }}>
            
            <Text style={[styles.texto,{color:  colors.txt2, fontSize:25}]}>Ingrese código de validación</Text>
            <Text style={[styles.texto,{color: colors.txt2}]}>Solicitar código a soporte</Text>

            <TxtInput 
                style={{color: habil ? colors.txt : 'white', fontSize:25,height:55}}
                placeholder={habil ? '_ _ _ _' : '' }
                keyboardType='numeric'
                editable={habil}
                maxLength={4}
                value={codigo}
                onChangeText={(codigo)=>{setCodigo(codigo)}}
                onEndEditing={()=>{setCodigo(codigo),verificar(codigo,sms)}}>
            </TxtInput>

            

            <Pressable
              disabled={renv}
              onPress={() => enviarSms('977860065',sms)}
            >
                <Text style={[styles.press,{color: renv == true ? '#666161' : 'blue',}]}>Reenviar código en {time != 0 ? time : ( setTime(60),setStartTimer(false)) } seg</Text>
                
            </Pressable>
        </View>
        {/*
        <View style={{
          alignItems:"center",
          paddingTop: 15
        }}>
            <TouchableOpacity style={[styles.button,{ backgroundColor: !isVal ? colors.button : '#C6C6C6',}]} 
            disabled={isVal} onPress={()=>{
              validacioncell(),
            setStartTimer(true)}}>
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Validar</Text>
              </View>
            </TouchableOpacity>
        </View>
         */}
       </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    elevation: 5,
    height: 55,
    width: "60%",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  bun: {
    elevation: theme.eleve.btn,
    height: 45,
    width: "80%",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    elevation: 2,
    height: 60,
    width: "90%",
    backgroundColor: theme.colors.background,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor:  theme.colors.primary,
    flexDirection: "row",
    marginTop: 5,
    
  },
  textInput:{
    borderRadius:5,
    width:'100%',
    backgroundColor:'white',
    height:40,
    elevation:0,
    marginTop:15,
    fontSize:25,
    color:theme.colors.txt,

},
  countContainer: {

},
texto: {
  fontSize:13, 
  paddingTop:5,
  color:theme.colors.txt,
},
press:{
  marginTop:10,
  color:theme.colors.href,
  textDecorationLine:'underline',
  fontSize:13
},
});
