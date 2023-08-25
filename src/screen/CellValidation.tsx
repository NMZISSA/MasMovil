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

export default function CellValidation({navigation}){

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
  const [habil, setHabil] = useState(false);
  const [renv, setRenv] = useState(true);
  const [isVal,setIsVal] = useState(true);
  const [conti,setConti] = useState(true);
  const [codigo,setCodigo] = useState('');
  const [sms,setSms] = useState(0);
  const [time,setTime]=useState(60);
  const [startTimer,setStartTimer]=useState(false);
  let interval = useRef();

  async function guardarUserDataCRL(userData) {
    await guardarDatoJSON("login", userData);
    // console.log(userData);
    pauseAnimation(setLottieProps);
    navigation.navigate('validation');
    
  }

  async function getNotificaciones(userData) {
    setTimeout(() => {
      setVisible(false)
      guardarUserDataCRL(userData)
    }, 1000);
  }
  
async function envDatos(dat) {
  await guardarDato('CARGA',dat);
}

  useFocusEffect(
    React.useCallback(()=>{
      return()=>{
          setNumberCelular("")
          setCanTouch(true)
      }
},[])
);

useEffect(() => {
  if(startTimer==true){
       interval = setInterval(() => {
         
            if (time == 0) {
              clearInterval(interval.current)
              setTime(60)
              setStartTimer(false)  
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

const lleno =()=>{
  if(numberCelular.length < 9 || numberCelular.startsWith('9') == false)
  {
    Alert.alert('Celular Inválido','Por favor ingrese número de celular válido');
    setNumberCelular('');
  }
  else{
    setIsVal(false)
  }
}

  function verificar(x,y){
    if (x == y) {
      setConti(false);
      
    }
    else{
      Alert.alert('Codigo Erroneo','Ingrese el codigo correcto');
    }
  }

  useEffect(()=>{
    const x=setSms(Math.floor(Math.random() * (9999 - 1000)) + 1000)
  },[])

  async function validacioncell(){
    console.log('asdasdsa');
    var celular = {
      Cargador : numberCelular
    }
    console.log('resp');

    const resp = await getRegistrado(celular)
    setTimeout(() => {
      if (resp == null) {
        console.log('hola');        
      }
    }, 1000);
  
    var dataini = await recuperarDatoJSON('DATA_INI')
    if (dataini == null) {
      dataini = []      
    }
    console.log(dataini.lenght);    
    if (resp.resultado[0].code=='000') {
      if (dataini.lenght >= 1) {
        dataini.forEach(empresa => {
          empresa.select = false        
        });
      }
      console.log(dataini);      
      var comercio ={
        comercio:resp.resultado[0].Comercio,
        cargador:resp.resultado[0].Cargador,
        select:true
      }
      dataini.push(comercio)
      await guardarDatoJSON('DATA_INI', dataini)      
      Alert.alert('El usuario ya esta registrado','Introduzca su clave de Acceso')
      navigation.navigate('EntryValidation', {celular:numberCelular})
    } else if (resp.resultado[0].code=='002') {           
      Alert.alert('Informacion','El numero ingresado no esta registrado \nO no es una Bodega  \nComuniquese con Mas Movil.')
    } else {
      
      setHabil(true)
      setRenv(false)
      enviarSms(numberCelular, sms)
    }
  }

  async function continuar() {
    var celular = {
      Cargador : numberCelular
    }
    const resp = await getTraerxCargador(celular)
    console.log(resp);    
    Post('USP_CRL_CLIENTES_LOGIN_GxLogin',celular).then((data: IRespuesta)=>{
      // alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
    navigation.navigate('User', {userbd: resp})
    envDatos(numberCelular)
  }

  return(
    <SafeAreaView style={{flex:1, marginTop:-30}}>
    {/* <PaperProvider theme={theme}> */}
      <LottieLoader  lottieProps={lottieProps} />
      <View style={{flex:1, backgroundColor: theme.colors.background, justifyContent: "space-evenly"}}>
        <View style={{ height:'20%', width:'100%', backgroundColor: theme.colors.background, alignItems:'center', justifyContent:'center', marginTop: 20,marginBottom:10  }}>
          <Image style={{ height: 180, width: 180 }} source={images.pLogo} resizeMode='contain'/>
        </View>
        <View style={{alignItems:"center",}}>
              <View style={{width:'90%',  }}> 
                <TextInput
                  value={numberCelular}
                  placeholderTextColor={colors.letras}
                  label={"Nro. Celular"}
                  mode={"outlined"}
                  multiline={false}
                  placeholder={'999 999 999'}
                  keyboardType={"numeric"}
                  disabled={!can_touch}
                  maxLength={9}
                  onFocus={() => setNumberColor("#000000")}
                  onBlur={() => setNumberColor("#00000080")}
                  error={celular_error}
                  onEndEditing={() => lleno()}
                  onChangeText={phone => {
                    if(phone.length == 0 || phone.length < 9) {
                      setCelularError(true)
                    } else {
                      setCelularError(false) 
                    }  
                    setNumberCelular(phone)
                    }}
                  theme={{ colors: { text: "black" } }}
                  style={{ backgroundColor: "white" }}
                  render = { props => 
                    <TextInputMask
                      {...props}
                      type={'custom'}
                      options={{
                        /**
                         * mask: (String | required | default '')
                         * the mask pattern
                         * 9 - accept digit.
                         * A - accept alpha.
                         * S - accept alphanumeric.
                         * * - accept all, EXCEPT white space.
                        */
                        mask: '999999999',
                        
                      }}                   
                    />
                  }>
                </TextInput>
                <Ionicons
                  style={{ position: "absolute", top: 20, right: 10 }}
                  name={"md-phone-portrait"}
                  size={25}
                  color={number_color}
                />
              </View>

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
                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>{habil ? 'Reenviar' : 'Validar'}</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={{
          alignItems:"center",
          paddingTop: 15
        }}>
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

            <Text style={[styles.texto,{color: habil ? colors.txt : 'white',}]}>Ingrese código de validación</Text>

            <Pressable
              disabled={renv}
            >
                {/* <Text style={[styles.press,{color: !renv ? colors.href : 'white',}]}>Reenviar código en {time != 0 ? time : ( setTime(60),setStartTimer(false)) } seg</Text> */}
                
            </Pressable>
        </View>
        <View style={{
          alignItems:"center",
          paddingTop: 15
        }}>
            <TouchableOpacity 
              style={[styles.bun,{ backgroundColor: !conti ? colors.button : 'white', elevation: !conti ? eleve.button:0,marginTop:10}]} 
              disabled={conti}
              onPress={()=>{continuar()}}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Continuar</Text>
              </View>
            </TouchableOpacity>
        </View>
       </View>
      </View>
    {/* </PaperProvider> */}
    </SafeAreaView>
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
  fontSize:11
},
});
