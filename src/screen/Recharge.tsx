import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState,Fragment,useRef} from "react";
import { StyleSheet,Text, View, Modal, Dimensions,Pressable, Alert,Image,Linking,KeyboardAvoidingView, Share} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { Snackbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import {captureRef} from 'react-native-view-shot';
//import  Share from 'react-native-share';
import {useFonts} from 'expo-font';
import { images, version } from "../constans";
import {
  Provider as PaperProvider,
  DefaultTheme,
  IconButton
} from "react-native-paper";
import { colors } from '../constans';
import { loadFonts } from "../utils/config";
import { color } from "react-native-reanimated";
import { recuperarDatoJSON } from "../utils/storage";
import LottieView from "lottie-react-native";
import ModalComunication from "../modals/ModalComunication";
import { Clientes } from "../class/IClientes";
import { Post } from "../services";
import { IRespuesta } from "../class/IRespuesta";
import { Movimientos } from "../class/IMovimientos";
import LottieLoader from "../components/LottieLoader";
import { initialLottieProps, pauseAnimation, playAnimation } from "../components/LottieLoader/LottieLoader";
import { enviarRecarga } from "../services/sms";
import AnimatedLottieView from "lottie-react-native";
import { toStrMoney } from "../utils/convertion";

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

var screen = Dimensions.get('window');

const userCliente : Clientes = null
const userVendedor : Clientes = null

export default function Recharge({ navigation }) {
  const modalComunicationref = useRef();
  const [can_touch, setCanTouch] = useState(true);
  const [number_color, setNumberColor] = useState("red");
  const [celular_error, setCelularError] = useState(false)
  const [numberCelular, setNumberCelular] = useState('');
  const [cargador,setCargador] = useState('');
  const [monto,setMonto] = useState('');
  const [pin,setPin] = useState('');
  const [numberContacto, setNumberContacto] = useState('')
  const [nombreContacto, setNombreContacto] = useState('')
  const [dataSaldo, setDataSaldo] = useState({producto:'',saldo:0});
  const [dataCliente, setDataCliente] = useState(userCliente);
  const [dataVendedor, setDataVendedor] = useState(userVendedor);
  const [lottieProps, setLottieProps] = useState(initialLottieProps);

  useFocusEffect(
      React.useCallback(()=>{
        return()=>{
            setDesc("")
            // setUrls('http://google.com.pe');
            setNumberCelular("")
            setCanTouch(true)
        }
  },[])
  );

  const [urls,setUrls] = useState("http://piloto.dacclaro.com.pe/pretups/");
  const [habil1,setHabil1] = useState(true);
  const [habil2,setHabil2] = useState(true);
  const [habil3,setHabil3] = useState(true);
  const [habil4,setHabil4] = useState(true);
  const [habil5,setHabil5] = useState(true);
  const [habil6,setHabil6] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [exitoVisible, setExitoVisible] = useState(false);
  const [isPago, setIsPago] = useState(true);
  const [rbtn,setRbtn]=useState('');
  const [b1,setB1] = useState(styles.btnmdesha);
  const [b2,setB2] = useState(styles.btnmdesha);
  const [b3,setB3] = useState(styles.btnmdesha);
  const [b4,setB4] = useState(styles.btnmdesha);
  const [b5,setB5] = useState(styles.btnmdesha);
  const [precio,setPrecio]=useState([3,5,10,15]);

  const habAll=()=>{
    setHabil1(!habil1)
    setHabil2(!habil2)
    setHabil3(!habil3)
    setHabil4(!habil4)
    setHabil5(!habil5)
    setB1(styles.btnmonto)
    setB2(styles.btnmonto)
    setB3(styles.btnmonto)
    setB4(styles.btnmonto)
    setB5(styles.btnmonto)
    setHabil6(true)
  }
  const hab3=()=>{
    setB1(styles.btnmonto)
    setB2(styles.btnmdesha)
    setB3(styles.btnmdesha)
    setB4(styles.btnmdesha)
    setB5(styles.btnmdesha)
    setHabil6(true)
  }
  const hab5=()=>{
    setB1(styles.btnmdesha)
    setB2(styles.btnmonto)
    setB3(styles.btnmdesha)
    setB4(styles.btnmdesha)
    setB5(styles.btnmdesha)
    setHabil6(true)
  }
  const hab10=()=>{
    setB1(styles.btnmdesha)
    setB2(styles.btnmdesha)
    setB3(styles.btnmonto)
    setB4(styles.btnmdesha)
    setB5(styles.btnmdesha)
    setHabil6(true)
  }
  const hab15=()=>{
    setB1(styles.btnmdesha)
    setB2(styles.btnmdesha)
    setB3(styles.btnmdesha)
    setB4(styles.btnmonto)
    setB5(styles.btnmdesha)
    setHabil6(true)
  }

  const habOtro=()=>{
    setB1(styles.btnmdesha)
    setB2(styles.btnmdesha)
    setB3(styles.btnmdesha)
    setB4(styles.btnmdesha)
    setB5(styles.btnmonto)
    setHabil6(false)
  }

  const inicializar=()=>{
    setIsPago(true)
    setHabil1(true)
    setHabil2(true)
    setHabil3(true)
    setHabil4(true)
    setHabil5(true)
    setHabil6(true)
    setNumberCelular('')
    setMonto('')
    setUrls("http://piloto.dacclaro.com.pe/pretups/");
    setB1(styles.btnmdesha)
    setB2(styles.btnmdesha)
    setB3(styles.btnmdesha)
    setB4(styles.btnmdesha)
    setB5(styles.btnmdesha)
    setRbtn('');
  }

  const abonar=()=>{
    if(numberCelular=='')
    {
      Alert.alert('Por favor ingrese número de celular');
    }
    else{
      setModalVisible(!modalVisible)
    }
  }

const datos = {cargador:dataCliente==null?'':dataCliente.Cargador, pin:'3s108'};
const[temp,setTemp]=useState('');
const[op1,setOp1]=useState('');
const[op2,setOp2]=useState('');
const[op3,setOp3]=useState('');
const[op4,setOp4]=useState('');
const [visiblesb2, setVisiblesb2] = useState(false)
const [snack_message2, setSnackMsg2] = useState('')
const[erro,setErro]=useState('');
const[id,setId]=useState('');
const[estado,setEstado]=useState('');
const[receptor,setReceptor]=useState('');
const[abonado,setAbonado]=useState(0);
const[ima,setIma]=useState();

let recuperar=(dac)=>{
  console.log(dac);
  setErro(dac[0]);
  setId(dac[1]);
  setEstado(dac[2]);
  setReceptor(dac[3].slice(2,11));
  setAbonado(dac[4]);
  if (dac[2] == 'EXITOSO') {
    setExitoVisible(true)
    var Movimientos : Movimientos = {
      Id_Movimiento: 0,
      Id_Cliente: dataCliente.Id_Cliente,
      Celular: dac[3].slice(2,11),
      Cod_SubServicio: 'RC10',
      Monto: dac[4],
      Comision: 0,
      FechaEmision: new Date(),
      Des_Movimiento: 'Recarga',
      ID_Resultado: dac[1],
      Obs_Movimiento: dac[2],
      Cod_Usuario: 'APP'
    }
    Post('USP_CRL_MOVIMIENTOS_G',Movimientos).then((data: IRespuesta)=>{
      // alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
  }
  pauseAnimation(setLottieProps)
  }
/*===================MODAL RESPUESTA======================================*/
const [boton,setBoton]=useState(styles.btnvisible);
const [hhh,setHhh]=useState('');
const [desc,setDesc]=useState('');
const [btn,setBtn]=useState(false);
const [recibo,setRecibo]=useState(styles.recibozero);
const [logo,setLogo]=useState({ height: 30, width: "100%" });
const [anime, setAnime]= useState(true)
const kk=()=>{
  
  pauseAnimation(setLottieProps)
  if(estado=='EXITOSO'){
    setExitoVisible(true)
    setDesc('');
      setHhh('Se recargó s/. '+abonado+' al número \n'+receptor);
      setBoton(styles.btn1);
      setIma(require('../../assets/check.png'));
      setRecibo(styles.recibo);
      //setLogo({ height: 70, width: 70,paddingBottom:5 });
      setAnime(true)
  }
  else if(estado=='FALLIDA'){
      setHhh(erro);
      setBtn(true);
      setIma(require('../../assets/error.png'));
      setAnime(false)
  }
  else{
    setAnime(false)
      setHhh('No se puede realizar la operacion, \nIntentelo de Nuevo.');
  }
}

/*=======================================================================*/


function falloR(pdata){
  setExitoVisible(true)
  pauseAnimation(setLottieProps)
  setHhh(erro);
  setDesc(pdata[0]);
  setBtn(true);
  setIma(require('../../assets/error.png'));
  setAnime(false)
}

function validar(){
  
}

function timer(){
setTimeout(() => {
  validar()
}, 5000);
}
  /*===================*/

function sepuede(){

  const saldonuevo = +dataSaldo.saldo - +parseFloat(monto.toString())
  console.log(saldonuevo);
  
  if (saldonuevo <= 3 ) {
    Alert.alert('Saldo Insuficiente','Comuníquese con su vendedor o con el Area de recargas')
    setModalVisible(!modalVisible);
  }else{
    console.log('confe');    
    Recargar()
    setModalVisible(!modalVisible)
    timer()
  }
}

const Recargar=()=>{
  playAnimation(setLottieProps)
  setUrls('http://piloto.dacclaro.com.pe/PretupsIRIS/c2sRechargeAction?serviceName=Recarga%20Virtual&retailerMSISDN='+dataCliente.Cargador+'&subscriberMSISDN=51'+numberCelular+'&rechargeAmout='+monto+'&subscriberLang=sp&retailerLang=sp&subserviceName=CVG&languagelistsize=2&languagecode=No%20aplicable%20&retailerPIN='+dataCliente.PIN_Claro);
  console.log('http://piloto.dacclaro.com.pe/PretupsIRIS/c2sRechargeAction?serviceName=Recarga%20Virtual&retailerMSISDN='+dataCliente.Cargador+'&subscriberMSISDN=51'+numberCelular+'&rechargeAmout='+monto+'&subscriberLang=sp&retailerLang=sp&subserviceName=CVG&languagelistsize=2&languagecode=No%20aplicable%20&retailerPIN='+dataCliente.PIN_Claro);
  setTemp(inyeccion);
}

const rayos=()=>{
  setOp1('http://piloto.dacclaro.com.pe/PretupsIRIS/c2sRechargeAction?serviceName=Recarga%20Virtual&retailerMSISDN='+dataCliente.Cargador+'&subscriberMSISDN=51'+numberCelular+'&rechargeAmout='+monto+'&subscriberLang=sp&retailerLang=sp&subserviceName=CVG&languagelistsize=2&languagecode=No%20aplicable%20&retailerPIN='+dataCliente.PIN_Claro);
  setOp2("http://piloto.dacclaro.com.pe/PretupsIRIS/conformationAction?offerSelectedId=TopUp:"+monto+"|"+dataCliente.Cargador+"&redirect=YES");
  setOp3('http://piloto.dacclaro.com.pe/PretupsIRIS/conformationAction?offerSelectedId=TopUp%3A'+monto+'%7C'+dataCliente.Cargador);
  setOp4('http://piloto.dacclaro.com.pe/PretupsIRIS/finalPreviewAction?retailerMSISDN='+dataCliente.Cargador+'&offerId=TopUp:'+monto);
}

const inyeccion=`
let a = window.location.href;
var recuperar=[];
var terro = '';
var tid = '';
var test = '';
var trec = '';
var tabo = '';
if(a == "${op2}" )
{
  document.querySelector('input[name="btnSubmit"]').click();
}
else if(a == "${op3}" )
{
  document.querySelector('input[name="btnSubmit"]').click();
}
else if(a == "${op4}" )
{
  var dato = document.querySelector("body > table > tbody > tr:nth-child(1) > td").innerText;
  if(dato.length <= 80){
    setTimeout(errores,1000);
  }
  else{
    setTimeout(errores,1000);
  }
}
else if(a == "${op1}" )
{
  document.querySelector('input[name="btnSubmit"]').click();
}
/*else
{
  alert('Error:','revise su conexión');
}*/

function sendPostMessage(){
  window.ReactNativeWebView.postMessage(JSON.stringify(recuperar));
}

function errores(){
  terro = document.querySelector("body > table > tbody > tr:nth-child(1) > td").innerText;
  tid = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerText;
  test = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerText;
  recuperar.push(terro);
  recuperar.push(tid);
  recuperar.push(test);
  recuperar.push(trec);
  recuperar.push(tabo);
  setTimeout(sendPostMessage,1000);
}

function rellenar(){
  tid = document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerText;
  test = document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerText;
  trec = document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(4) > td:nth-child(2)").innerText;
  tabo = document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(7) > td:nth-child(2)").innerText;
  recuperar.push(terro);
  recuperar.push(tid);
  recuperar.push(test);
  recuperar.push(trec);
  recuperar.push(tabo);
  setTimeout(sendPostMessage,1000);
}
`;

async function traerData() {
  setDataSaldo(await recuperarDatoJSON('PREPAGO'))
  setDataCliente(await recuperarDatoJSON('LOGIN'))
  setDataVendedor(await recuperarDatoJSON('VENDEDOR'))
}

useEffect(()=>{
  traerData()
},[])


function openModalComunication(numberContacto, nombreContacto) {
  setNumberContacto(numberContacto)
  setNombreContacto(nombreContacto)
  modalComunicationref.current.openModal()
}

function WhatNumber(numberContacto){
  Linking.openURL(`whatsapp://send?text=hello&phone=51${numberContacto}`)
  cerrarModal()
}

//===========================================IMAGEN Y COMPARTIR==========================================================================

const handleSMSPress = async()=>{
  setVisiblesb2(true)
  await enviarRecarga(receptor,abonado);
  setSnackMsg2('Mensaje Enviado')
}

const enviarwpp = async()=>{
  Linking.openURL('whatsapp://send?text=RECARGA EXITOSA!! \n Realizaste una recarga de s/.'+abonado+'.00 \n Cobertura Total&phone=51'+receptor)
}

const viewRef = useRef();
const enviarComprobante = async () => {
   try{
     const imgg = await captureRef(viewRef, {
       format:'png',
       quality:0.7,
     });
     const shareOptions = {
      //  title: 'Share via',
      //  message: 'some message',
       url: imgg,
      //  whatsAppNumber: "+51931831762",  // country code + phone number
       filename: 'Recarga' , // only for base64 file in Android
      };
    
       await Share.open(shareOptions);
   } catch(err){
     console.error(err);
   }
 }

 var pad = function(num) { return ('00'+num).slice(-2) };
 var tiempo = new Date();
 tiempo = tiempo.getDate()         + '/' +
 pad(tiempo.getMonth() + 1)  + '/20' +
 pad(tiempo.getFullYear())       + '          ' +
 pad(tiempo.getHours())      + ':' +
 pad(tiempo.getMinutes())    + ':' +
 pad(tiempo.getSeconds());
//=========================================================================================================================================

  return (
    <PaperProvider>
      <LottieLoader lottieProps={lottieProps} />
      <KeyboardAvoidingView behavior="height"  style={{flex:1, backgroundColor: 'white',}}>
      <ModalComunication ref={modalComunicationref} numberContacto={numberContacto}  nombreContacto={nombreContacto} dataVendedor={dataVendedor}/>
      <View /*style ={{flex:1, height:100}}*/>
        <WebView
          source={{ uri: urls }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={temp}
          onMessage={(e: { nativeEvent }) => {
            console.log(JSON.parse(e.nativeEvent.data)[2]);      
            if (JSON.parse(e.nativeEvent.data)[2] === 'FALLIDA') {
              falloR(JSON.parse(e.nativeEvent.data))
            } else {
              recuperar(JSON.parse(e.nativeEvent.data));
            }                 
            //añadir timer
          }}
        />
      </View>      
      <ScrollView style={{backgroundColor:theme.colors.background}}>
      <View style={{zIndex:1,backgroundColor:'transparent', flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:0}}>
          <Text>{version}</Text>
      </View>
        <View>
          <Text
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              paddingHorizontal: 20,
              fontWeight: "bold",
              color: colors.primary,
              fontSize: 30,
            }}
          >
            RECARGA VIRTUAL
          </Text>
        </View>
        {
          dataSaldo.saldo >= 10 ?
          <View>
            <View
        style={styles.Vista1}
        >
              <View style={{width:'100%',  paddingRight:10}}>
                <TextInput
                  value={numberCelular}
                  placeholderTextColor={colors.letras}
                  label={"Nro. Celular"}
                  mode={"outlined"}
                  multiline={false}
                  placeholder={'999 999 999'}
                  keyboardType={"numeric"}
                  disabled={!can_touch}
                  onFocus={() => setNumberColor("#000000")}
                  onBlur={() => setNumberColor("#00000080")}
                  error={celular_error}
                  maxLength={9}
                  onChangeText={phone => {
                    if(phone.length == 0 || phone.length < 9) {
                      setCelularError(true)
                    } else {
                      habAll()
                    }
                    setNumberCelular(phone)
                    }}
                  theme={{ colors: { text: "black" } }}
                  style={{ backgroundColor: "white" }}
                  >
                  </TextInput>
                <Ionicons
                  style={{ position: "absolute", top: 20, right: 10 }}
                  name={"md-phone-portrait"}
                  size={25}
                  color={number_color}
                />
              </View>
        </View>
        <View style={{
            alignContent: "space-between", width:'96%',
            paddingLeft:5,
            marginBottom: 1,
            marginTop: 10,
            backgroundColor:'transparent',
        }}>
            <Text style={{marginLeft:10, fontWeight:"bold", fontSize:15}}>Monto a Recargar:</Text>
            <View style={{ flexDirection: "row", paddingBottom:10, marginHorizontal:8, borderRadius:10, backgroundColor:'transparent',alignItems:'center', justifyContent:'space-between',}}>
                <TouchableOpacity
                  style={[b1,]}
                  onPressOut={() => {rayos(),setIsPago(false)}}
                  onPressIn={() => {setMonto('3'),hab3()}}
                  disabled={habil1}>
                  <Text style={styles.textStyle2}>s/. 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[b2,]}
                  onPressOut={() => {rayos(),setIsPago(false)}}
                  onPressIn={() => {setMonto('5'),hab5()}}
                  disabled={habil2}>
                  <Text style={styles.textStyle2}>s/. 5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[b3,]}
                  onPressOut={() => {rayos(),setIsPago(false)}}
                  onPressIn={() => {setMonto('10'),hab10()}}
                  disabled={habil3}>
                  <Text style={styles.textStyle2}>s/. 10</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[b4,]}
                  onPressOut={() => {rayos(),setIsPago(false)}}
                  onPressIn={() => {setMonto('15'),hab15()}}
                  disabled={habil4}>
                  <Text style={styles.textStyle2}>s/. 15</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[b5,]}
                  onPressOut={() => {rayos(),setIsPago(true)}}
                  onPressIn={() => {habOtro()}}
                  disabled={habil5}>
                  <Text style={[styles.textStyle2,{textAlign:'center'}]}>Otro{'\n'}Monto</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{
            paddingTop: 7,
            alignContent: "space-between",
            paddingBottom:30,
          }}>

          <View style={{ width: "50%", alignSelf:"center"}}>
            <TextInput
              label={"Otro monto"}
              mode={"outlined"}
              multiline={false}
              placeholder="0.00"
              keyboardType={"numeric"}
              style={{height: 50}}
              onChangeText={(monto)=>{setMonto(monto),setRbtn(monto)}}
              onEndEditing={() => {setMonto(monto),rayos(),setIsPago(!isPago),habOtro()}}
              disabled={habil6}
              value={rbtn}>
              </TextInput>
          </View>
        </View>
        <View style={{ width: "60%", paddingTop:10, alignSelf:"center"}}>
          <TouchableOpacity
            disabled={isPago}
            style={[styles.buttonRecarga,{backgroundColor: !isPago ? colors.button : '#C6C6C6',}]}
            onPress={()=>{abonar()}}
          >
             <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width:'100%'
              }}
            >
              <Text style={styles.textStyle2}>RECARGAR s/. {monto == '' ? '0.00' : toStrMoney(parseFloat(monto))}</Text>
            </View>
          </TouchableOpacity>
        </View>
          </View>
          :
          <View style={{alignItems:"center"}}>

            <LottieView
            speed={1}
            autoPlay loop
            source={require("../../assets/45933-callcenter.json")}
            style={{
              width: 128,
              height: 100,
              backgroundColor: 'transparent',
            }}
          />
            <View style={{width: "90%",
              justifyContent: "center",
              alignItems: "center",}}>
              <Text style={{fontSize:20, textAlign:"center"}}>
              Su cargador esta bloqueado
              temporalmente por tener saldo
              mínimo, Comuníquese con su
              vendedor: {dataVendedor == null ? ' ': dataVendedor.Des_Cliente }</Text>
              <Text style={{fontSize:20, marginTop: 10}}>
                <TouchableOpacity
                  onPress={()=>openModalComunication(dataVendedor == null ? '': dataVendedor.Celular_Contacto, dataVendedor == null ? '': dataVendedor.Des_Cliente)}
                >
                <Text style={{fontSize:20, color:"blue"}}> <Ionicons name="call" size={24} color="blue" />{' '} {dataVendedor == null ? '': dataVendedor.Celular_Contacto}</Text>
                </TouchableOpacity>
              </Text>
              <Text style={{fontSize:20, textAlign:"center"}}>
              Area de Recargas
              para su abastecimiento. </Text>
              <Text style={{fontSize:20, marginTop: 10}}>
                <TouchableOpacity
                  onPress={()=>openModalComunication('984708998', 'Area de Recargas')}
                >
                <Text style={{fontSize:20, color:"blue"}}> <Ionicons name="call" size={24} color="blue" />{' '}984708998</Text>
                </TouchableOpacity>
                {'   '}
                <TouchableOpacity
                  onPress={()=>openModalComunication('984709076', 'Area de Recargas')}
                >
                <Text style={{fontSize:20, color:"blue"}}> <Ionicons name="call" size={24} color="blue" />{' '} 984709076</Text>
                </TouchableOpacity>
              </Text>


            </View>


          </View>
        }

        {/* =========== MODAL CONFIRMACIÓN ============================ */}
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View
                        style={{
                        alignItems: "center",
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop:10,
                        marginBottom:20,
                        backgroundColor:'transparent',
                        borderBottomWidth:0.4,
                        paddingBottom:10,
                        width:'100%'
                      }}
                    >
                      <Text style={{color:'black', }}>¿Estás Seguro?</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: 'center',
                        marginTop:10,
                        marginBottom:20,
                      }}
                    >
                      <Text style={[styles.modalText,{fontSize:11}]}>Se recargará s/. {monto} al número </Text>
                      <Text style={{fontWeight:'700'}}> {numberCelular}</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "flex-end",
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                      >
                      <Pressable
                        style={[styles.button, styles.buttonOpen,{backgroundColor:'red'}]}
                        onPress={() => sepuede()}
                      >
                        <Text style={[styles.textStyle,{color:'white'}]}>SI</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible),inicializar()}}
                      >
                        <Text style={styles.textStyle}>NO</Text>
                      </Pressable>
                      </View>
                  </View>
                </View>
          </Modal>
        {/* =========================================================== */}

        {/* =========== MODAL EXITO/FALLO DE RECARGA ============================ */}
          <Modal
              animationType="slide"
              transparent={true}
              visible={exitoVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setExitoVisible(!exitoVisible);
              }}
              onShow={()=>{kk(),inicializar()}}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View
                        style={{
                        alignItems: "flex-start",
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginTop:10,
                      }}
                    >
                      <Text style={{fontWeight:"bold"}}>RECARGA {estado}</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: 'center',
                        marginTop:10,
                        width:'70%'
                      }}
                    >
                      <Text style={styles.textStyle}>{hhh}</Text>
                      <Text style={styles.textStyle}>{desc}</Text>
                    </View>
                    <View>
                    {anime ? <AnimatedLottieView
                  speed={1}
                  autoPlay
                  loop
                  source={require('../../assets/check.json')}
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: 'transparent',
                  }}
                /> : <AnimatedLottieView
                speed={1}
                autoPlay
                loop
                source={require('../../assets/cross.json')}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'transparent',
                }}
              />}
                    </View>
                    {/* ====================================================================================================================== */}
<View >
<View ref={viewRef}
  style={recibo}>
    <Image style={logo} source={images.pcLogo} resizeMode='contain'/>
    <Text style={[styles.textStyle]}>{dataCliente==null?'':dataCliente.Des_Cliente}</Text>
    <Text style={[styles.textStyle]}>{tiempo}</Text>
    <View style={{
        paddingTop: 3,
        justifyContent: "space-between",
        width:200,
        marginBottom: 1,
        marginTop: 7,
        flexDirection:'row'
    }}>
        <Text style={styles.textStyle}>Detalle</Text>
        <Text style={styles.textStyle}>Importe</Text>
    </View>
    <View style={{
        justifyContent: "space-between",
        width:200,
        marginBottom: 5,
        flexDirection:'row',
        paddingBottom:7
    }}>
        <Text style={styles.textStyle}>Cel. {receptor}</Text>
        <Text style={styles.textStyle}>{abonado}.00</Text>
    </View>
    <Text style={styles.textStyle}>________________________________</Text>
    <View style={{
        justifyContent: "space-between",
        width:200,
        marginBottom: 1,
        flexDirection:'row',
        paddingBottom: 15
    }}>
        <Text style={styles.textStyle}>TOTAL</Text>
        <Text style={styles.textStyle}>s/.{abonado}.00</Text>
    </View>
    <Text style={styles.textStyle}>No usar papel evita la tala de árboles, contribuye a cuidar nuestro medio ambiente. {'\n '+version}</Text>
</View>
</View>

{/* ====================================================================================================================== */}
<View
                    style={{
                    }}>
                    <View style={{flexDirection: 'row', alignContent:"space-around"}}>
                      
                      <Pressable
                        style={{borderColor:"white",height:50,marginRight:10}}
                        onPress={() => {
                          enviarwpp();
                        }}
                        //disabled={btn}
                      >
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Ionicons
                            name="logo-whatsapp"
                            size={35}
                            color="red"
                          />
                        </View>
                      </Pressable>
                      <Pressable
                        style={{borderColor:"white",height:50,marginRight:10}}
                        onPress={() => {
                          enviarComprobante();
                        }}
                        //disabled={btn}
                      >
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Ionicons
                            name="share-social"
                            size={35}
                            color="red"
                          />
                        </View>
                      </Pressable>
                      <Pressable
                        style={{borderColor:"white",height:50,marginRight:10}}
                        onPress={() => {
                          handleSMSPress();
                        }}
                        //disabled={btn}
                      >
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Ionicons
                            name="ios-chatbox-ellipses-outline"
                            size={35}
                            color="red"
                          />
                        </View>
                      </Pressable>
                    </View>
                    <View>
                      <Pressable
                      style={{borderColor:"white",borderWidth:1,elevation:5,borderRadius:5,backgroundColor:"red",height:40,marginBottom:10}}
                      onPress={() => {
                        setExitoVisible(false),
                        navigation.navigate('PrincipalStack')
                      }}>
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={styles.textStyle2}>Aceptar</Text>
                      </View>
                    </Pressable>
                    </View>                    
                  </View>
                </View>
              </View>
            </Modal>
        {/* =============================================================== */}

      </ScrollView>
      <Snackbar            
        visible={visiblesb2}
        onDismiss={() => setVisiblesb2(false)}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
          },
        }}
      >
        {snack_message2}
      </Snackbar>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  img:{
    width:37,
    height:20,
    marginTop: 15,
    marginBottom: 15,
    marginRight:15,
    marginLeft:15
  },
  Vista1:{
    height: 60,
    width:'96%',
    paddingLeft:5,
    marginBottom: 20,
    paddingTop: 20,
    marginTop: 7,
    alignItems:"center",
    alignSelf:"center",
    alignContent:"center",
    flexDirection:'row'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    width:'70%',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btn1: {
    elevation: 5,
    height: 45,
    width: "60%",
    backgroundColor: theme.colors.button,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  btnvisible:{
    backgroundColor: 'transparent',
    height: 10,
    width: "60%",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  btnmonto: {
    elevation: 5,
    minWidth:'18%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent:'center',
    alignContent:'center',
  },
  btnmdesha: {
    elevation: 5,
    minWidth:'18%',
    height: 50,
    backgroundColor:'#C6C6C6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent:'center',
    alignContent:'center',
  },
  btn2: {
    elevation: 5,
    height: 45,
    width: "60%",
    backgroundColor: theme.colors.button,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginBottom:50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width:'50%',
    backgroundColor: 'transparent',
   // borderWidth:0.5,
    borderTopWidth:0.5,
    borderColor:'#818182',
  },
  buttonOpen:{
    borderBottomStartRadius: 8,
  },
  buttonClose:{
    borderBottomEndRadius:8,
  },
  buttonRecarga:{
    minWidth: "20%",
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    elevation: 5,

  },
  textStyle2: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  recibo:{
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:0,
    elevation:2,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10,
  },
  recibozero:{
    width:0,
    height:0,
    backgroundColor:'#ffffff'
  },
});
