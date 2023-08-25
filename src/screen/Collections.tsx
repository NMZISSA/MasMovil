import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Text, View, Modal, Pressable, StyleSheet, Linking, Image, KeyboardAvoidingView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { DefaultTheme, Provider as PaperProvider, Snackbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import {captureRef} from 'react-native-view-shot';
// import * as Sharing from 'expo-sharing';
//import Share from 'react-native-share';
import { Deudas } from "../class/lDeudas";
import LottieLoader, { initialLottieProps, playAnimation, pauseAnimation } from '../components/LottieLoader/LottieLoader';
import { colors, version } from "../constans";
import { images } from "../constans";
import ModalComunication from "../modals/ModalComunication";
import { Clientes } from "../class/IClientes";
import { recuperarDatoJSON } from "../utils/storage";
import AnimatedLottieView from "lottie-react-native";
import { getSaldos, Post } from "../services";
import { Movimientos } from "../class/IMovimientos";
import { IRespuesta } from "../class/IRespuesta";
import { enviarRecaudacion } from "../services/sms";
import { toStrMoney } from "../utils/convertion";

const emptyDeudas: Deudas[] = [];

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
    button: "red",
    letras: "#666666",
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  },
};

const userCliente : Clientes = null
const userVendedor : Clientes = null

export default function Collections ({navigation}){
    const [numberCelular, setNumberCelular] = useState('');
    const [can_touch, setCanTouch] = useState(true);
    const [number_color, setNumberColor] = useState("red");
    const [celular_error, setCelularError] = useState(false);
    const [userCRL, setUserCRL] = useState('DCTBOD22996');//DCTBOD00001 DCTBOD22996
    const [passCRL, setPassCRL] = useState('M%5798oO');//CLARO05% M%5798oO
    const [tmpnum, setTmpnum] = useState('977860065');
    const [tmppin, setTmppin] = useState('3108');//2580 3108
    const [service, setService] = useState('5');
    const [subService, setSubService] = useState('CE:1:0:true');
    const [serviceC, setServiceC] = useState('6');
    const [subServiceC, setSubServiceC] = useState('CE:1:0:true');
    // CE:1:0:true CE:2:0:true CE:3:0:true CE:4:0:true CE:5:0:true
    // RC:Y:PRE DC:N:PRE RPB:N:PRE DTH:N:PRE FLRC:N:PRE CE:N:POST CBP:N:POST
    const [monto, setMonto] = useState('');
    const [comision, setComision] = useState('0.0');
    const [nroFactura, setNroFactura] = useState('');
    const [listDeudas, setListDeudas] = useState(emptyDeudas);
    const [isSelectd, setIsSelectd] = useState(true);
    const [isPago, setIsPago] = useState(true);
    const [isSearch, setIsSearch] = useState(true);
    const [url, setUrl] = useState("http://google.com.pe");
    const [lottieProps, setLottieProps] = useState(initialLottieProps);
    const [inject, setInject] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [exitoVisible, setExitoVisible] = useState(false);
    const [numberContacto, setNumberContacto] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [dataSaldo, setDataSaldo] = useState({producto:'',saldo:0});
    const [dataCliente, setDataCliente] = useState(userCliente);
    const [dataVendedor, setDataVendedor] = useState(userVendedor);
    const modalComunicationref = useRef();


    function validar(){
      
    }

    function timer(){
    setTimeout(() => {
    validar()
    }, 7000);
    }

    useFocusEffect(
        React.useCallback(()=>{
          return()=>{
              setMsg('')
              setNumberCelular("")
              setUrl('http://google.com.pe');
              setListDeudas(emptyDeudas)
              setCanTouch(true)
          }
    },[])
    );

    async function traerData() {
      setDataSaldo(await recuperarDatoJSON('RECAUDACION'))
      setDataCliente(await recuperarDatoJSON('LOGIN'))
      setDataVendedor(await recuperarDatoJSON('VENDEDOR'))
      
    }
    useEffect(() =>{
      traerData()
      
    },[]);

    useEffect(() =>{
      console.log(dataCliente);
      
     if (dataCliente != null) {
      setUserCRL(dataCliente.CuentaWeb);
        setPassCRL(dataCliente.Contraseña)
        setTmppin(dataCliente.PIN_Claro)
        traerSaldos()
     }
      
    },[dataCliente]);

    useEffect(()=>navigation.addListener('focus', () => {
      const isFocused = navigation.isFocused();
      console.log(isFocused);
      if(isFocused){
        console.log('CollectionsStack');
      } 
    }),
    [navigation])

    function pendientesRecaudo(data: Deudas[]){
      setListDeudas(data);
      console.log(data);      
      // setMonto()
      setUrl('http://google.com.pe');
      setInject('');
      pauseAnimation(setLottieProps)
    }


    const[erro,setErro]=useState('');
    const[id,setId]=useState('');
    const[estado,setEstado]=useState('');
    const[receptor,setReceptor]=useState('');
    const[abonado,setAbonado]=useState('');
    const[ima,setIma]=useState();


    function error(data){
      //Alert.alert(data[0].error, data[0].description);
      setErro(data[0].description);
      setEstado(data[0].error);
      setMsg(data[0].description)
      setUrl('http://google.com.pe');
      setInject('');
      pauseAnimation(setLottieProps)
    }

    function sepago(data){
      setExitoVisible(!exitoVisible)
      console.log(data);
      setId(data.idTransferencia);
      setEstado(data.estadoTransferencia);
      setReceptor(data.numeroDestinatario);
      setAbonado(data.montoTransferencia)
      setUrl('http://google.com.pe');
      setInject(''); 
      setDesc('')
      if (data.estadoTransferencia == 'EXITOSO') {
        var Movimientos : Movimientos = {
          Id_Movimiento: 0,
          Id_Cliente: dataCliente.Id_Cliente,
          Celular: data.numeroDestinatario,
          Cod_SubServicio: 'CE10',
          Monto: data.montoTransferencia,
          Comision: toStrMoney(parseFloat(comision)),
          FechaEmision: new Date(),
          Des_Movimiento: 'Recaudacion',
          ID_Resultado: data.idTransferencia,
          Obs_Movimiento: data.estadoTransferencia,
          Cod_Usuario: 'APP'
        }
        Post('USP_CRL_MOVIMIENTOS_G',Movimientos).then((data: IRespuesta)=>{
          // alert(JSON.stringify(data))
        }).catch((e)=>{
          // alert(e)
        })
      }
      setNumberCelular('')
      setIsPago(true)
      setIsSearch(true)
      pauseAnimation(setLottieProps)
    }

    function selectDeuda(index){
      console.log(index);
      listDeudas.forEach(deuda => {
        deuda.selected = false        
      });
      setNroFactura(listDeudas[0].idFactura)
      listDeudas[0].selected = true;      
      let copy = [...listDeudas]
      setMonto(listDeudas[0].pendientePago)
      setIsPago(false)
      setListDeudas(copy)
      setIsSelectd(false)      
    }

    const buscarDeuda=()=>{
      console.log('******************************************************************');  
      console.log(dataCliente);      
      console.log(userCRL);      
      console.log(passCRL);      
      console.log(tmppin);      
      console.log('******************************************************************');      
      setUrl('http://piloto.dacclaro.com.pe/pretups/');
      
      setTimeout(() => {
        setInject(jsCode1);
      }, 200);
      playAnimation(setLottieProps)
    }


    const busqueda=()=>{
      setTimeout(() => {
        buscarDeuda();
      }, 500);
    }

    const limpiar=()=>{
      setListDeudas(emptyDeudas);
      setMsg('');
    }



    const pagarDeuda=()=>{
      setUrl('http://piloto.dacclaro.com.pe/pretups/');
      setTimeout(() => {
        setInject(jsCode2);
      }, 200);
      playAnimation(setLottieProps)
    }

    const llamarPago=()=>{
      if(numberCelular=='')
      {
        Alert.alert('Por favor ingrese número de celular');
      }
      else{
        setModalVisible(!modalVisible)
      }
    }

    const jsCode1   = `
      let a = window.location.href;
      var mensaje='hola gil';
      var recuperar=[];
      var deudas = [];

      if(a == "http://piloto.dacclaro.com.pe/pretups/"){
        document.querySelector('input[name="loginID"]').value = '${userCRL}';
        document.querySelector('input[name="password"]').value = '${passCRL}';
        document.querySelector('input[name="submit1"]').click();
      }
      else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
        
        window.frames['0'].document.querySelector('a[href="/pretups/c2sRechargeAction.do?method=c2sRechargeAuthorize&moduleCode=C2STRF"]').click();
        setTimeout(datos,500);
      }else{
        mensaje = window.frames[0].document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ul > li").innerText;        
        let itemError = {
          error: 'FALLIDO',
          description: mensaje,
        }
        deudas.push(itemError)
      }

      function datos(){                    
        window.frames[0].document.querySelector('select[name="serviceType"]').getElementsByTagName('option')['${service}'].selected=true;
        window.frames[0].document.querySelector('select[name="serviceType"]').onchange("combo();javascript:loadBalance();subChange();blockAmount();change();displayTransactionID();");
        window.frames[0].document.querySelector('select[name="subServiceType"]').value = '${subService}';
        window.frames[0].document.querySelector('input[name="subscriberMsisdn"]').value = '${numberCelular}';
        window.frames[0].document.querySelector('input[name="pin"]').value = '${dataCliente == null ? '' :dataCliente.PIN_Claro}';          
        window.frames[0].document.querySelector('input.btn').click(); 
        setTimeout(confirmar,600);
      }        
      
      function confirmar(){            
        window.frames[0].document.querySelector('input.btn').click();
        setTimeout(reten,1500);
      }

      function reten(){
        mensaje = window.frames[0].document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ul > li").innerText;
        if(mensaje == 'Exito'){
          for (let i = 0; i < window.frames[0].document.querySelectorAll('form > table > tbody > tr > td > table:nth-child(3) > tbody > tr').length+1; i++) {
            if(i > 1){
              let itemRecaudo = {
                idFactura : window.frames[0].document.querySelector('form > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child('+i+') > td.tabcol:nth-child(2)').innerText,
                pendientePago : window.frames[0].document.querySelector('form > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child('+i+') > td.tabcol:nth-child(5)').innerText,
                totalPago : window.frames[0].document.querySelector('form > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child('+i+') > td.tabcol:nth-child(6)').innerText,
                fechaFin : window.frames[0].document.querySelector('form > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child('+i+') > td.tabcol:nth-child(9)').innerText,
                selected : false,
                montoPago : ''
              }
              deudas.push(itemRecaudo);
            }
          }   
        }
        else if(mensaje == 'No se encontraron facturas pendiente'){
          let itemError = {
            error: 'FALLIDO',
            description: mensaje
          }
          deudas.push(itemError)
        }
        else if(mensaje == 'Su solicitud no puede ser procesada en este momento. Gracias por utilizar el servicio Claro.'){
          let itemError = {
            error: 'FALLIDO',
            description: mensaje
          }
          deudas.push(itemError)
        }
        else{
          var mens = '';
          mens = window.frames[0].document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ol > li").innerText;
          if(mens != ''){
            let itemError = {
              error: 'FALLIDO',
              description: mens,
              otro: mens
            }
            deudas.push(itemError)
          }else{
            let itemError = {
              error: 'FALLIDO',
              description: mensaje,
              otro: mens
            }
            deudas.push(itemError)
          }                    
        }
      }
      
      function sendPostMessage(){
        window.ReactNativeWebView.postMessage(JSON.stringify(deudas));
      }
      
      setTimeout(sendPostMessage,3000);
    `;

    const jsCode2 = `
      let a = window.location.href;
      var mensaje='hola';
      // var recuperar=[];
      var deudas = [];

      if(a == "http://piloto.dacclaro.com.pe/pretups/"){
        document.querySelector('input[name="loginID"]').value = '${userCRL}';
        document.querySelector('input[name="password"]').value = '${passCRL}';
        document.querySelector('input[name="submit1"]').click();
      }
      else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
        
        window.frames['0'].document.querySelector('a[href="/pretups/c2sRechargeAction.do?method=c2sRechargeAuthorize&moduleCode=C2STRF"]').click();
        setTimeout(datos,1000);
      }

      function datos(){                    
        window.frames[0].document.querySelector('select[name="serviceType"]').getElementsByTagName('option')['${serviceC}'].selected=true;
        window.frames[0].document.querySelector('select[name="serviceType"]').onchange("combo();javascript:loadBalance();subChange();blockAmount();change();displayTransactionID();");
        // window.frames[0].document.querySelector('input[name="subscriberMsisdn"]').value = '953761136';
        // window.frames[0].document.querySelector('input[name="invoiceno"]').value = 'SB01-0199889342';
        // window.frames[0].document.querySelector('input[name="amount"]').value = '1';
        window.frames[0].document.querySelector('input[name="subscriberMsisdn"]').value = '${numberCelular}';
        window.frames[0].document.querySelector('input[name="invoiceno"]').value = '${nroFactura}';
        window.frames[0].document.querySelector('input[name="amount"]').value = '${monto}'
        window.frames[0].document.querySelector('input[name="pin"]').value = '${tmppin}';          
        window.frames[0].document.querySelector('input.btn').click(); 
        setTimeout(confirmar,1000);
      }
      
      function confirmar(){            
        window.frames[0].document.querySelector('input.btn').click();
        setTimeout(reten,1000);
      }

      function reten(){
        if(window.frames[0].document.querySelector('form > table > tbody > tr > td > table.back > tbody > tr:nth-child(2) > td:nth-child(2)').innerText == 'En proceso'){
          setTimeout(verificacion,1000)
        }else{
          mensaje = window.frames[0].document.querySelector("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ul > li").innerText;      
          let itemError = {
            error: 'FALLIDOP',
            description: mensaje
          }
          deudas.push(itemError)
          setTimeout(sendPostMessage,800)
        }
      }

      function verificacion(){
        window.frames[0].document.querySelector('a[href="javascript:submitNotification()"]').click();         
        setTimeout(traerdata,1000)        
      }

      function traerdata(){
        let itemRecaudo = {
          idTransferencia : window.frames[0].document.querySelector('form > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td.tabcol:nth-child(2)').innerText,
          estadoTransferencia : window.frames[0].document.querySelector('form > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td.tabcol:nth-child(2)').innerText,
          numeroDestinatario : window.frames[0].document.querySelector('form > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td.tabcol:nth-child(2)').innerText,
          montoTransferencia : window.frames[0].document.querySelector('form > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td.tabcol:nth-child(2)').innerText
        }
        deudas.push(itemRecaudo)
        setTimeout(sendPostMessage,1000)
      }
      
      function sendPostMessage(){
        window.ReactNativeWebView.postMessage(JSON.stringify(deudas));
      }      
    `;
/*===================MODAL RESPUESTA======================================*/
const [boton,setBoton]=useState(styles.btnvisible);
const [hhh,setHhh]=useState('');
const [msg,setMsg]=useState('');
const [desc,setDesc]=useState('');
const [btn,setBtn]=useState(false);
const [visiblesb2, setVisiblesb2] = useState(false)
const [snack_message2, setSnackMsg2] = useState('')
const [recibo,setRecibo]=useState(styles.recibozero);
const [logo,setLogo]=useState({ height: 30, width: "100%" });
const [anime, setAnime]= useState(true)
const kk=()=>{
  pauseAnimation(setLottieProps)
  if(estado=='EXITOSO'){
      setHhh('Se recargó s/. '+abonado+' al número \n'+receptor);
      setBoton(styles.btn1);
      setIma(require('../../assets/check.png'));
      setRecibo(styles.recibo);
      setLogo({ height: 30, width: "100%" });
      setMonto('')
      setListDeudas(emptyDeudas)
      setAnime(true)
  }
  else if(estado=='FALLIDOP'){
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

function pagoF(pdata){
  setExitoVisible(!exitoVisible)
  pauseAnimation(setLottieProps)
  setDesc(pdata[0].description);
  setBtn(true);
  setIma(require('../../assets/error.png'));
  setAnime(false)
}

async function traerSaldos(){  
  console.log('/////////////////////////');
  
  var params = {
    Cod_Producto : '101',
    Id_Cliente : dataCliente.Id_Cliente
  }
  console.log(params);  
  const resp = await getSaldos(params)
  setComision(resp.resultado[0].Comision)
  console.log('/////////////////////////');

}




function openModalComunication(numberContacto, nombreContacto) {
  setNumberContacto(numberContacto)
  setNombreContacto(nombreContacto)
  modalComunicationref.current.openModal()
}
/*=======================================================================*/  
//===========================================IMAGEN Y COMPARTIR==========================================================================

const handleSMSPress = async()=>{
  setVisiblesb2(true)
  await enviarRecaudacion(receptor,monto,nroFactura)
  setSnackMsg2('Mensaje Enviado')

  }

  const enviarwpp = async()=>{
  Linking.openURL('whatsapp://send?text=RECAUDACION EXITOSA!! \n Realizaste el pago de tu factura '+nroFactura+' por s/.'+abonado+' más s/.'+comision+' de comisión \n Mas Movil&phone=51'+receptor)
}
  
  const viewRef = useRef();
  /*const enviarComprobante = async () => {
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
       filename: 'test' , // only for base64 file in Android
      };
    
       await Share.open(shareOptions);
      //  await Sharing.shareAsync(imgg);
     } catch(err){
       console.error(err);
     }
   }*/
  
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
        <ModalComunication
          ref={modalComunicationref}
          numberContacto={numberContacto}
          nombreContacto={nombreContacto}
          dataVendedor={dataVendedor}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{height:1}}> 
          <WebView
            source={{uri: url}}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            injectedJavaScript={inject}
            onMessage={(e: {nativeEvent}) => {
              console.log(e.nativeEvent);
              if (JSON.parse(e.nativeEvent.data)[0].error == 'FALLIDO') {
                error(JSON.parse(e.nativeEvent.data));
              } else if (JSON.parse(e.nativeEvent.data)[0].error == 'FALLIDOP') {
                pagoF(JSON.parse(e.nativeEvent.data));
              } else if (
                JSON.parse(e.nativeEvent.data)[0].estadoTransferencia ==
                'EXITOSO'
              ) {
                sepago(JSON.parse(e.nativeEvent.data)[0]);
              } else {
                pendientesRecaudo(JSON.parse(e.nativeEvent.data));
              }
            }}
          />
          </View> 
          <ScrollView style={{backgroundColor: theme.colors.background}}>
          <View style={{zIndex:1,backgroundColor:'transparent', flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:0}}>
          <Text>{version}</Text>
       </View>
            <View>
              <Text
                style={{
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  /*fontFamily: 'lm3',*/
                  paddingHorizontal: 20,
                  fontWeight: 'bold',
                  color: colors.primary,
                  fontSize: 30,
                }}>
                RECAUDACION
              </Text>
            </View>
            {dataSaldo && dataSaldo.saldo >= 0 ? (
              <View>
                <View
                  style={{
                    height: 60,
                    width: '96%',
                    paddingLeft: 5,
                    marginBottom: 20,
                    paddingTop: 20,
                    marginTop: 7,
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '80%', paddingRight: 10}}>
                    <TextInput
                      value={numberCelular}
                      placeholderTextColor={colors.letras}
                      label={'Nro. Celular'}
                      mode={'outlined'}
                      multiline={false}
                      placeholder={'999 999 999'}
                      keyboardType={'numeric'}
                      disabled={!can_touch}
                      onFocus={() => setNumberColor('#000000')}
                      onBlur={() => setNumberColor('#00000080')}
                      onPressIn={() => setNumberCelular('')}
                      error={celular_error}
                      onEndEditing={() => setIsSearch(false)}
                      onChangeText={phone => {
                        if (phone.length == 0 || phone.length < 9) {
                          setCelularError(true);
                        } else {
                          setCelularError(false);
                        }
                        setNumberCelular(phone);
                      }}
                      theme={{colors: {text: 'black'}}}
                      style={{backgroundColor: 'white'}}
                      render={props => (
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
                      )}></TextInput>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignContent: 'center',
                      paddingTop: 5,
                    }}>
                    <TouchableOpacity
                      disabled={isSearch}
                      onPress={() => {limpiar(), busqueda()}}
                      //onPress={() => {buscarDeuda(), setNumberCelular('') }}
                      style={{
                        height: 60,
                        borderRadius: 7,
                        borderWidth: 1,
                        elevation: 5,
                        borderColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: !isSearch ? colors.button : '#C6C6C6',
                      }}>
                      <Ionicons name="search" size={35} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 25,
                    alignContent: 'space-between',
                  }}>
                  <Text
                    style={{marginLeft: 10, fontWeight: 'bold', fontSize: 15}}>
                    Deudas:
                  </Text>
                  <Text
                    style={{marginLeft: 20, fontWeight: 'bold', fontSize: 20}}>
                    {msg}
                  </Text>
                  {listDeudas.map((prop, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginTop: 10,
                        marginHorizontal: 8,
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        borderColor: colors.primary,
                      }}>
                      <View
                        style={{
                          width: '20%',
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => selectDeuda(index)}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 25,
                              height: 25,
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: prop.selected
                                ? colors.button
                                : 'black',
                              borderRadius: 15,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: prop.selected
                                  ? colors.button
                                  : 'transparent',
                                borderRadius: 11,
                              }}></View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{width: '80%', alignContent: 'center'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Nro: <Text>{prop.idFactura}</Text>
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            {prop.fechaFin}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingTop: 10,
                          }}>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Total:{' '}
                            <Text style={{fontSize: 15, fontWeight: 'normal'}}>
                              {prop.totalPago}
                            </Text>
                          </Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            Pendiente Pago:{' '}
                            <Text style={{fontSize: 15, fontWeight: 'normal'}}>
                              {prop.pendientePago}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}

                  <View
                    style={{width: '60%', alignSelf: 'center', paddingTop: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>
                      Monto a Pagar:{' '}
                    </Text>
                    <View style={{width: '70%', alignSelf: 'center'}}>
                      <TextInput
                        selectTextOnFocus={true}
                        placeholderTextColor={theme.colors.button}
                        label={'Pago'}
                        mode={'outlined'}
                        multiline={false}
                        placeholder={'00.00'}
                        keyboardType="numeric"
                        value={monto}
                        disabled={isSelectd}
                        onChangeText={monto => setMonto(monto)}
                        onFocus={() => setNumberColor('#000000')}
                        onBlur={() => setNumberColor('#00000080')}
                        theme={{colors: {text: 'black'}}}
                        style={{backgroundColor: 'white'}}></TextInput>
                    </View>
                    <Text
                      style={{
                        paddingTop: 15,
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Comision de Bodega : <Text style={{fontSize: 20}}>s/. {toStrMoney(parseFloat(comision))}</Text>
                    </Text>
                  </View>
                </View>
                <View
                  style={{width: '60%', paddingTop: 10, alignSelf: 'center'}}>
                  <TouchableOpacity
                    disabled={isPago}
                    onPress={() => llamarPago()}
                    style={{
                      minWidth: '20%',
                      height: 50,
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 10,
                      backgroundColor: !isPago ? colors.button : '#C6C6C6',
                      elevation: 5,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Pagar S/. {toStrMoney(+monto + +comision)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <AnimatedLottieView
                  speed={1}
                  autoPlay
                  loop
                  source={require('../../assets/45933-callcenter.json')}
                  style={{
                    width: 128,
                    height: 100,
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  style={{
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    Su cargador esta bloqueado temporalmente por tener saldo
                    mínimo, Comuníquese con su vendedor:{' '}
                    {dataVendedor == null ? ' ' : dataVendedor.Des_Cliente}
                  </Text>
                  <Text style={{fontSize: 20, marginTop: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        openModalComunication(
                          dataVendedor == null
                            ? ''
                            : dataVendedor.Celular_Contacto,
                          dataVendedor == null ? '' : dataVendedor.Des_Cliente,
                        )
                      }>
                      <Text style={{fontSize: 20, color: 'blue'}}>
                        {' '}
                        <Ionicons name="call" size={24} color="blue" />{' '}
                        {dataVendedor == null
                          ? ''
                          : dataVendedor.Celular_Contacto}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    Area de Recargas para su abastecimiento.{' '}
                  </Text>
                  <Text style={{fontSize: 20, marginTop: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        openModalComunication('984708998', 'Area de Recargas')
                      }>
                      <Text style={{fontSize: 20, color: 'blue'}}>
                        {' '}
                        <Ionicons name="call" size={24} color="blue" />{' '}
                        984708998
                      </Text>
                    </TouchableOpacity>
                    {'   '}
                    <TouchableOpacity
                      onPress={() =>
                        openModalComunication('984709076', 'Area de Recargas')
                      }>
                      <Text style={{fontSize: 20, color: 'blue'}}>
                        {' '}
                        <Ionicons name="call" size={24} color="blue" />{' '}
                        984709076
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            )}

            {/* =========== MODAL CONFIRMACIÓN ============================ */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                      marginBottom: 20,
                      backgroundColor: 'transparent',
                      borderBottomWidth: 0.4,
                      paddingBottom: 10,
                      width: '100%',
                    }}>
                    <Text style={{color: 'black'}}>¿Estás Seguro?</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 1,
                      marginBottom: 20,
                      width: '80%',
                    }}>
                    <Text style={[styles.modalText]}>
                      <Text style={{fontWeight: '700'}}>Factura:</Text>{' '}
                      {nroFactura}
                    </Text>
                    <Text style={[styles.modalText]}>
                      <Text style={{fontWeight: '700'}}>Nro Celular:</Text>{' '}
                      {numberCelular}
                    </Text>
                    <Text style={[styles.modalText]}>
                      <Text style={{fontWeight: '700'}}>Monto a Abonar:</Text>{' '}
                      s/.{toStrMoney(parseFloat(monto))}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonOpen,
                        {backgroundColor: 'red'},
                      ]}
                      onPress={() => {
                        pagarDeuda(), setModalVisible(!modalVisible), timer();
                      }}>
                      <Text style={[styles.textStyle, {color: 'white'}]}>
                        SI
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
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
                // Alert.alert('Modal has been closed.');
                setExitoVisible(!exitoVisible);
              }}
              onShow={kk}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginTop: 10,
                    }}>
                    <Text style={{fontWeight:"bold"}}>Pago {estado}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                      width: '70%',
                    }}>
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
                  <View>
                    <View ref={viewRef} style={recibo}>
                      <Image
                        style={logo}
                        source={images.pcLogo}
                        resizeMode="contain"
                      />
                      <Text style={[styles.textStyle]}>
                        {dataCliente == null ? '' : dataCliente.Des_Cliente}
                      </Text>
                      <Text style={[styles.textStyle]}>{tiempo}</Text>
                      <View
                        style={{
                          paddingTop: 3,
                          justifyContent: 'space-between',
                          width: 200,
                          marginBottom: 1,
                          marginTop: 7,
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.textStyle}>Celular</Text>
                        <Text style={styles.textStyle}>{receptor}</Text>
                      </View>
                      <View
                        style={{
                          paddingTop: 3,
                          justifyContent: 'space-between',
                          width: 200,
                          marginBottom: 1,
                          marginTop: 7,
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.textStyle}>Factura</Text>
                        <Text style={styles.textStyle}>Abono</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          width: 200,
                          marginBottom: 5,
                          flexDirection: 'row',
                          paddingBottom: 7,
                        }}>
                        <Text style={styles.textStyle}>{nroFactura}</Text>
                        <Text style={styles.textStyle}>{toStrMoney(parseFloat(abonado))}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          width: 200,
                          marginBottom: 5,
                          flexDirection: 'row',
                          paddingBottom: 7,
                        }}>
                        <Text style={styles.textStyle}>Comisión de Bodega</Text>
                        <Text style={styles.textStyle}>{toStrMoney(parseFloat(comision))}</Text>
                      </View>
                      <Text style={styles.textStyle}>
                        ________________________________
                      </Text>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          width: 200,
                          marginBottom: 1,
                          flexDirection: 'row',
                          paddingBottom: 15,
                        }}>
                        <Text style={styles.textStyle}>TOTAL</Text>
                        <Text style={styles.textStyle}>
                          s/. {toStrMoney(parseFloat((+abonado + +comision).toString()))}
                        </Text>
                      </View>
                      <Text style={styles.textStyle}>
                      No usar papel evita la tala de árboles, contribuye a cuidar nuestro medio ambiente. {'\n '+version}
                      </Text>
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
                          //enviarComprobante();
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
                        setExitoVisible(!exitoVisible),
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
    width: "10%",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  btnmonto: {
    elevation: 5,
    minWidth:'20%',
    height: 50,
    backgroundColor: theme.colors.button,
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