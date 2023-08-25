import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Image, Alert, Dimensions, SegmentedControlIOSComponent, ScrollView, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import arrayShuffle from 'array-shuffle';
import {
  Provider as PaperProvider,
  DefaultTheme,
  IconButton,
  Modal,
  Checkbox
} from "react-native-paper";
import { colors, version } from '../constans';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { eliminarDatoJSON, guardarDato,guardarDatoJSON,recuperarDato, recuperarDatoJSON } from "../utils/storage";
import { Post } from "../services";
import { IRespuesta } from "../class/IRespuesta";
import { Clientes } from "../class/IClientes";
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playAnimation } from '../components/LottieLoader/LottieLoader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

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
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin]= useState('');
  const [arrayNumero,setArrayNumero] =useState(['1','2','3','4','5','6','7','8','9','0']);
  const [isVisibleButton, setIsVisibleButton] = useState(true)
  const [isVisiblePIN, setIsVisiblePIN] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snack_message, setSnackMsg] = useState('')
  const [color,setColor] = ('#C6C6C6')
  const [pwd,setPwd] = useState('');
  const [newPin,setNewPin] = useState('');
  const [cambio,setCambio] = useState('');
  const [checked, onChecked] = useState(false)

  //===============================================================

  const [claroPin,setClaroPin]=useState('');
  const [cargador,setCargador]=useState('');
  const [comercio,setComercio]=useState('');
  const [direccion,setDireccion]=useState('');
  const [referencia,setReferencia]=useState('');
  const [ubigeo,setUbigeo]=useState('');
  const [latitud,setLatitud]=useState(0);
  const [longitud,setLongitud]=useState(0);
  const [dni,setDni]=useState('');
  const [nombre,setNombre]=useState('');
  const [celContacto,setCelContacto]=useState('');
  const [mail,setMail]=useState('');
  const [userWeb,setUserWeb]=useState('');
  const [userPwd,setUserPwd]=useState('');
  const [select,setSelect]=useState(true);
  const [empresas,setEmpresas]=useState([]);
  const [ddias, setDdias] = useState(60)
  var dataempresas = [];
  //===============================================================
  async function traerConstraseña() {
    const response = await recuperarDato('VALID')
    setPwd(response)
    //setNewPin(response.slice(0,-2))
  }

  async function traerPin() {
    setClaroPin(await recuperarDato('PIN'))
  }

  async function tCargador() {
    setCargador(await recuperarDato('CARGA'))
  }

  async function tUsuario() {
    const response = await recuperarDatoJSON('USR')
    setComercio(response.comercio)
    setNombre(response.nombre)
    setDni(response.dni)
    setMail(response.email)
    setCelContacto(response.celu)
  }
  
  async function tWeb() {
    const response = await recuperarDatoJSON('WEB')
    setUserWeb(response.usweb)
    setUserPwd(response.contraseña)
  }

  async function tDirection() {
    const response = await recuperarDatoJSON('DIREC')
    setDireccion(response.direcc)
    setReferencia(response.refe)
    setUbigeo(response.ubi)
  }

  async function tMap() {
    const response = await recuperarDatoJSON('MAP')
    setLatitud(response.latitude)
    setLongitud(response.longitude)
  }

  async function recDatos() {
    // dataempresas = await recuperarDatoJSON('DATA_INI')
    // console.log(dataempresas);
  }

  function cargaPin(){
    setNewPin(pwd.slice(0,-2))
    //setNewPin(pwd.substring(0,3))
  }
  async function dias(){
    const resp = await recuperarDatoJSON('DAY')
    console.log('********************************');
    console.log(resp);      
      setUserWeb(resp.CuentaWeb)
      setUserPwd(resp.Contraseña)
      setClaroPin(resp.PIN_Claro)
  }

  useEffect(()=>{
    const shuffle=arrayShuffle(arrayNumero)
    setArrayNumero(shuffle)
    traerConstraseña()
    traerPin()
    tCargador()
    tUsuario()
    tWeb()
    tDirection()
    tMap()
    dias()    
    console.log(userWeb,userPwd);
    
  },[])

 async function escribir(){
  var dataini = await recuperarDatoJSON('DATA_INI')
    if (dataini == null) {
      dataini = []      
    }
    if (dataini.lenght >= 1) {
      dataini.forEach(empresa => {
        empresa.select = false        
      });
    }
  var comer = {
    cargador:cargador,
    comercio:comercio,
    select:true
  }
  dataini.push(comer)
  await guardarDatoJSON('DATA_INI', dataini)  
  console.log('///////////');
  console.log(userWeb,userPwd);
  const twe = await recuperarDatoJSON('WEB')
  console.log(twe);
  console.log('///////////');
  
  var DatosClienteMovil: Clientes = {
    Cargador: cargador,
    Des_Cliente: comercio,
    Dir_Cliente: direccion,
    Ref_Cliente: referencia,
    Cod_Ubigeo: ubigeo,
    Latitud: latitud,
    Longitud: longitud,
    DNI_Contacto: dni,
    Nombre_Contacto: nombre,
    Celular_Contacto: celContacto,
    Email_Contacto: mail,
    CuentaWeb: userWeb,
    Contraseña: userPwd,
    PIN_Claro: claroPin,
    PIN: pin,
  }
  console.log(DatosClienteMovil);
  
  Post('USP_CRL_DATOS_CLIENTES_G_MOVIL',DatosClienteMovil).then((data: IRespuesta)=>{
    // alert(JSON.stringify(data))
  }).catch((e)=>{
    // alert(e)
  })
 }

 function verTerminosCondiciones() {
  var url = 'https://paleconsultores.com/Cobertura/POLITICASDEUSO.pdf'
  Linking.openURL(url)
  //this.props.navigation.navigate('VideoPlayer')
}

 async function envDatos() {
  await guardarDatoJSON('DATA_INI',dataempresas);
 }

  useEffect(()=>{
    if (pin.length == 6) {
      setIsVisibleButton(false);
      setIsVisiblePIN(true)
    }
    if (pin.length < 6) {
      setIsVisibleButton(true);
      setIsVisiblePIN(false)
    }
  },[pin])

  const validatePwd = (pwd) => {
    const pwdRegex = /^(?=.*\d)(?=.*[0-9])(?!.*(.)\1)\S{6}/gm;
    const pwdincremente = /^(?!.*(?:12|23|34|45|56|67|78|89|98|87|76|65|54|43|32|21)).+$/gmi;
    if(pwdRegex.test(pwd), pwdincremente.test(pwd)){
        return (Alert.alert("Contraseña: "+pwd));
    }else{
        return (Alert.alert("Contraseña insegura"),setPin(""));
    }
  }

  const comprobar=async ()=>{   
   console.log('***************');     
   console.log(pin);
   console.log(pwd);
   console.log('***************');

   
    if (pin == pwd) {
      if (checked == true) {
      insertar()        
      }else {
        Alert.alert('','Acepte los Terminos y Condiciones')
      }
      // setUrl('http://piloto.dacclaro.com.pe/pretups/')
      // setInyeccion(jsCode)
    }
    else{
      Alert.alert('Error','Reingrese la contraseña correctamente')
      setPin('');
    }
    console.log(newPin)
    console.log(pin)
  }

  const nuevoPin =()=>{
    if (pin.length == 4) {
      setNewPin('0852')
    }
  }


  async function insertar() {
    const resp = await recuperarDatoJSON('DAY')
    const resLongin = await recuperarDatoJSON('LOGIN')   

    
    if (resp.Dias >= ddias) {
      var nuevo = {
        Cargador : resp.Cargador,
        PIN_CLARO : newPin,
        PIN : pin
      }
      
      Post('USP_CRL_DATOS_CLIENTES_G_ActualizarPIN',nuevo).then((data: IRespuesta)=>{
        Alert.alert(JSON.stringify(data))
      }).catch((e)=>{
        // alert(e)
      })
      setModalVisible(!modalVisible);
      navigation.push('Home');
    }else{
      // console.log({cargador:resp.Cargador,comercio:resLongin[0].Des_Cliente,select:true});
      
      setModalVisible(!modalVisible);
      escribir();
      envDatos();
      console.log(dataempresas);
      setTimeout(() => {
        navigation.push('Home');        
      }, 2000);
    }
    
  }

  const [url, setUrl] = useState("http://google.com.pe");
  const [inyeccion,setInyeccion] = useState('');

  const jsCode = `
  let a = window.location.href;
  var mensaje='hola ';
  var recuperar='';

  if(a == "http://piloto.dacclaro.com.pe/pretups/"){
    document.querySelector('input[name="loginID"]').value = '${userWeb}';
    document.querySelector('input[name="password"]').value = '${userPwd}';
    document.querySelector('input[name="submit1"]').click();
  }
  else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
    window.frames['0'].document.querySelector('a[href="/pretups/userChannelCategoryAction.do?method=loadDomainList&page=0&moduleCode=CUSERS"]').click();
    setTimeout(autopin,1000);
  }

  function autopin(){
    window.frames['0'].document.querySelector('a[href="/pretups/changeSelfPinAction.do?method=loadSelfPin&urlCode=6&pageCode=CHSLPIN001"]').click();
    setTimeout(datos,1000);
  }
  function datos(){                    
    window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].multiBox"]').checked = true
    window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].oldSmsPin"]').value = '${claroPin}';
    window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].showSmsPin"]').value = '${newPin}';
    window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].confirmSmsPin"]').value = '${newPin}';
    window.frames[0].document.querySelector('input[name="changePin"]').click();
    setTimeout(vacio,1000);
  } 
  
  function vacio(){
    var error = window.frames['0'].document.querySelector('body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ol > li');
    if(error == null){
      setTimeout(confirmar,1000);
    }
    else {
      recuperar = error.innerText;
    }
  }

  function confirmar(){
    window.frames[0].document.querySelector('input[name="changeSmsPin"]').click();
    setTimeout(lleno,500);
  }

  function lleno(){
    var acier = window.frames['0'].document.querySelector('body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ul > li')
    if(acier == null){
      recuperar = 'EXITO';
    }
    else {
      recuperar = acier.innerText;
    }
  }

  function sendPostMessage(){
    window.ReactNativeWebView.postMessage(JSON.stringify(recuperar));
  }
  
  setTimeout(sendPostMessage,3000);
      `;

  return (
    <PaperProvider>
      
      
      {/* <View> 
        <View style={{height:222}}> 
      <WebView
          source={{ uri: url }}
          domStorageEnabled={true}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          injectedJavaScript={inyeccion}style={{backgroundColor:'#00000000'}}
          automaticallyAdjustContentInsets={false}
          onMessage={(e: {nativeEvent}) => {
            if (JSON.parse(e.nativeEvent.data) == 'EXITO'){
              insertar()   
              setUrl('http://google.com.pe')
            }
            else{
              setUrl('https://google.com.pe')
              Alert.alert('No se Pudo Realizar la Operacion','Porfavor Intentelo el Registro de nuevo \n Disculpe las Molestias')
              // navigation.push('CellValidation')
            }
          }}
        /> 
    </View>
    </View> */}
     <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
       <Text style={styles.title}>Reingresa tu {'\n'} clave de acceso</Text>
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

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[0]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[1]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[1]}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[2]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[2]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[3]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[3]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[4]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[4]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[5]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[5]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[6]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[6]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[7]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[7]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[8]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[8]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnErase} onPress={() => setPin('')}>
              <Fontisto name="trash" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { setPin(pin + arrayNumero[9]) }} disabled={isVisiblePIN}>
              <Text style={styles.nmr}>{arrayNumero[9]}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnErase} onPress={() => setPin((pin) => pin.slice(0, pin.length - 1))}>
              <FontAwesome5 name="backspace" size={24} color="black" />
              </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent', width: '70%' }}>
          <Checkbox 
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => { onChecked(!checked) }}
          />
           <Text onPress={()=>verTerminosCondiciones()} style={{ color: 'blue', textDecorationLine: 'underline' }}> He leido los Terminos y Condiciones</Text>
        </View>
        <View style={{backgroundColor: theme.colors.background, flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:10}}>
          <Text>{version}</Text>
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
          //disabled={isVisibleButton} 
          onPress = {()=>{comprobar()}}
          >
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
                Finalizar
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    </View>

    
{/* =========== MODAL CONFIRMACIÓN ============================ */}
    <Modal
      transparent={true}
      animationType='slide'
      visible={modalVisible}
      onRequestClose={() => {setModalVisible(!modalVisible);}}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View 
              style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Text style={{fontSize:25, color:'red', fontWeight:'800', paddingTop:20}}>BIENVENIDO</Text>
              
              <Image style={{ height: 180, width: 180 }} source={require('../../assets/check.png')} resizeMode='contain'/>

              <Text style={{fontSize:20,paddingBottom:30}}>Registro Exitoso </Text>   
              </View>
          </View>
        </View>
    </Modal>  
  {/* =========================================================== */}
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
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    width: WIDTH-50,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 30,
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
});
/*
let a = window.location.href;
      var mensaje='hola gil';
      var recuperar='';

      if(a == "http://piloto.dacclaro.com.pe/pretups/"){
        document.querySelector('input[name="loginID"]').value = '${userWeb}';
        document.querySelector('input[name="password"]').value = '${userPwd}';
        document.querySelector('input[name="submit1"]').click();
      }
      else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
        window.frames['0'].document.querySelector('a[href="/pretups/userChannelCategoryAction.do?method=loadDomainList&page=0&moduleCode=CUSERS"]').click();
        setTimeout(autopin,500);
      }

      function autopin(){
        window.frames['0'].document.querySelector('a[href="/pretups/changeSelfPinAction.do?method=loadSelfPin&urlCode=6&pageCode=CHSLPIN001"]').click();
        setTimeout(datos,500);
      }
      function datos(){                    
        window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].multiBox"]').checked = true
        window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].oldSmsPin"]').value = '${claroPin}';
        window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].showSmsPin"]').value = '${newPin}';
        window.frames[0].document.querySelector('input[name="msisdnListIndexed[0].confirmSmsPin"]').value = '${newPin}';
        window.frames[0].document.querySelector('input[name="changePin"]').click();
        setTimeout(vacio,500);
      } 
      
      function vacio(){
        var error = window.frames['0'].document.querySelector('body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ol > li');
        if(error == null){
          setTimeout(confirmar,500);
        }
        else {
          recuperar = error.innerText;
        }
      }

      function confirmar(){
        window.frames[0].document.querySelector('input[name="changeSmsPin"]').click();
        setTimeout(lleno,500);
      }

      function lleno(){
        var acier = window.frames['0'].document.querySelector('body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > ul > li').innerText;
        recuperar = acier
      }

      function sendPostMessage(){
        window.ReactNativeWebView.postMessage(JSON.stringify(recuperar));
      }
      
      setTimeout(sendPostMessage,3000);
    `;
*/