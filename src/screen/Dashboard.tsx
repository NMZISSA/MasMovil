import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, RefreshControl, Text, View, Modal, ScrollView, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { colors, version } from "../constans";
import { DefaultTheme, Provider as PaperProvider, Snackbar, TextInput } from "react-native-paper";
import { Clientes } from '../class/IClientes'
import { guardarDatoJSON, recuperarDatoJSON } from "../utils/storage";
import LottieLoader from "../components/LottieLoader";
import { initialLottieProps, pauseAnimation, playAnimation } from "../components/LottieLoader/LottieLoader";
import { Producto_cliente_saldos } from "../class/IProducto_cliente_saldos";
import { getComision, getMovimientos, getVendedor, Post } from "../services";
import { IRespuesta } from "../class/IRespuesta";
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

const userCliente : Clientes = null

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Dashboard({navigation}) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saldoColeccion, setSaldoColeccion] = useState({producto:'',saldo:0});
  const [saldoPrepago, setSaldoPrepago] = useState({producto:'',saldo:0});
  const [dataCliente, setDataCliente] = useState(userCliente)
  const [visiblesb, setVisiblesb] = useState(false)
  const [visiblesb2, setVisiblesb2] = useState(false)
  const [snack_message2, setSnackMsg2] = useState('')
  const [snack_message, setSnackMsg] = useState('')
  const [dataMovimientos, setDataMovimientos] = useState([])
  const [comision,setComision] = useState(0);
  const datos = {cargador:'957764196', pin:'2580'};
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const [userCRL, setUserCRL] = useState('DCTBOD00001');
  // const [passCRL, setPassCRL] = useState('');
  const [passCRL, setPassCRL] = useState('CLARO05%');
  const [url, setUrl] = useState("http://google.com.pe");
  const [inject, setInject] = useState('');
  const [on, setOn] = useState(false);
  let cont = 1;


  async function asignarsaldo(data){
    console.log(data);  
    if(data.length > 1){
      if (data[0].producto == 'Recaudación') {
        setSaldoColeccion(data[0])
        setSaldoPrepago(data[1])
        await guardarDatoJSON('RECAUDACION', data[0])
        await guardarDatoJSON('PREPAGO', data[1])
      }
      if (data[0].producto == 'Prepago') {
        setSaldoPrepago(data[0]) 
        setSaldoColeccion(data[1]) 
        await guardarDatoJSON('PREPAGO', data[0])    
        await guardarDatoJSON('RECAUDACION', data[1]) 
      }
    }else{
      cont++;  
      if (data[0].producto == 'Recaudación') {
        setSaldoColeccion(data[0])
        await guardarDatoJSON('RECAUDACION', data[0])
        await guardarDatoJSON('PREPAGO', '0')
      }
      if (data[0].producto == 'Prepago') {
        setSaldoPrepago(data[0]) 
        await guardarDatoJSON('PREPAGO', data[0])    
        await guardarDatoJSON('RECAUDACION', '0') 
      }
    }
     
    newSaldos(data)
    setUrl('http://google.com.pe')
    pauseAnimation(setLottieProps)
  } 

  async function traerComision(IdCliente){
    var param = {
      Id_Cliente: IdCliente
    }
    const resp = await getComision(param)
    // console.log(resp);
    setComision(resp.resultado[0].Comision)
    traerMovimientos(IdCliente)
  }

  async function traerMovimientos(IdCliente){
    var param = {
      Id_Cliente: IdCliente
    }
    const resp = await getMovimientos(param)    
    setDataMovimientos(resp.resultado)
    
  }

  async function newSaldos(data){
    // console.log(new Date());
    let saldoRecarga = 0
    let saldoRecudacion = 0
    if (data[0].producto == 'Recaudación') {
      saldoRecudacion =  data[0].saldo
      saldoRecarga = data[1].saldo
    }
    if (data[0].producto == 'Prepago') {
      saldoRecarga = data[0].saldo
      saldoRecudacion = data[1].saldo
    } 
    // console.log(saldoPrepago)    
    var ProductoClienteSaldoP : Producto_cliente_saldos = {
      Cod_Producto: '102',
      Id_Cliente: dataCliente.Id_Cliente,
      Saldo: saldoRecarga,
      FechaSaldo: new Date(),
      Cod_Usuario: 'APP'
    }
    var ProductoClienteSaldoR : Producto_cliente_saldos = {
      Cod_Producto: '101',
      Id_Cliente: dataCliente.Id_Cliente,
      Saldo: saldoRecudacion,
      FechaSaldo: new Date(),
      Cod_Usuario: 'APP'
    }
    // setVisiblesb(true)
    // setVisiblesb2(true)
    Post('USP_CRL_PRODUCTO_CLIENTE_SALDOS_G',ProductoClienteSaldoP).then((data: IRespuesta)=>{
      // setSnackMsg('¡ Recarga '+ saldoRecarga +' !')
      // Alert.alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
    Post('USP_CRL_PRODUCTO_CLIENTE_SALDOS_G',ProductoClienteSaldoR).then((data: IRespuesta)=>{
      // setSnackMsg2('¡ Recaudacion '+ saldoRecudacion +' !')
      // Alert.alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
    traerVendedor(dataCliente.Id_Vendedor)
  }

  async function traerVendedor(Id_Vendedor) {
    var param = {
      Id_Cliente: Id_Vendedor
    }
    const resp = await getVendedor(param)
    await guardarDatoJSON('VENDEDOR', resp.resultado[0])
  }

  async function cargarDatos(){
    setDataCliente(await recuperarDatoJSON('LOGIN'))
    // console.log(dataClient);
    // setDataCliente(dataClient)
    // setUserCRL(dataClient.CuentaWeb)
    // setPassCRL(dataClient.Contraseña)
  }

  function esHoy(fecha){
    const hoy = new Date()
    const fechaE = new Date(fecha)
    var diasdif= hoy.getTime()-fechaE.getTime();
    var contdias = Math.round(diasdif/(1000*60*60*24));
    // console.log(contdias)
    if(contdias == 0)
    return 'Hoy '+new Date(fechaE).getHours()+':'+new Date(fechaE).getMinutes()
    else if (contdias == 1)
    return 'Ayer ' +new Date(fechaE).getHours()+':'+new Date(fechaE).getMinutes()
    else
    return new Date(fecha).getDate()+'/'+new Date(fecha).getMonth()+'/'+new Date(fecha).getFullYear()+' '+new Date(fechaE).getHours()+':'+new Date(fechaE).getMinutes()
  }

  const jsCode = `
    let a = window.location.href;
    if(a == "http://piloto.dacclaro.com.pe/pretups/"){
      document.querySelector('input[name="loginID"]').value = '${dataCliente == null ? '' : dataCliente.CuentaWeb}';
      document.querySelector('input[name="password"]').value = '${dataCliente == null ? '' : dataCliente.Contraseña}';
      document.querySelector('input[name="submit1"]').click();
    }
    else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
      window.frames[0].document.querySelector('a[href="/pretups/c2sTransferEnquiry.do?method=c2sTransferEnquiryAuthorise&moduleCode=C2SENQ"]').click();
      function balance(){
        window.frames[0].document.querySelector('a[href="/pretups/channelUserBalanceAction.do?method=showParentSearchForViewBalance&viewType=self&urlCode=6&pageCode=CUSRBALV03"]').click();
      }
      setTimeout(balance, 500);
      var saldo = [];
      var sas = {hola:'jo'};

      function sendPostMessage(){
        if(window.frames[0].document.querySelectorAll('form > table > tbody > tr > td > table > tbody > tr').length > 5){
          for (let i = 0; i < window.frames[0].document.querySelectorAll('form > table > tbody > tr > td > table > tbody > tr').length+1; i++) {
              if(i == 6 || i == 7){
                  let itemSaldo= {
                      producto: window.frames[0].document.querySelector("form > table > tbody > tr > td > table > tbody > tr:nth-child("+i+") > td.tabcol:nth-child(2)").innerText,
                      saldo: window.frames[0].document.querySelector("form > table > tbody > tr > td > table > tbody > tr:nth-child("+i+") > td.tabcol:nth-child(5)").innerText
                      }
                  saldo.push(itemSaldo);
              }
          }
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(saldo));
      }
      setTimeout(sendPostMessage, 1500)
    }
  `;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setUrl('http://google.com.pe')
    cargarDatos()
    // console.log(dataCliente);    
    setUrl('http://piloto.dacclaro.com.pe/pretups/')
    setInject(jsCode)
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    cargarDatos()
    setTimeout(() => {
      pauseAnimation(setLottieProps)      
    }, 10000);
  }, []);

  // useEffect(()=>navigation.addListener('beforeRemove', (e) => {
  //   // Prevent default behavior of leaving the screen
  //   e.preventDefault();
  //   const isFocused = navigation.isFocused();
  //   // console.log(isFocused+'PrincipalStack');
  //   if(isFocused){
  //     BackHandler.exitApp();
  //   }
  //   else{
  //     navigation.jumpTo('PrincipalStack')
  //   }
  //   // Prompt the user before leaving the screen
  // }),
  // [navigation])

  useEffect(()=>navigation.addListener('focus', ()=>{
    // console.log('hola');
    cargarDatos()
    setUrl('http://piloto.dacclaro.com.pe/pretups/')
    // console.log(dataCliente);
    setInject(jsCode)
    
  }),[navigation])


  useEffect(() => {   

    if (dataCliente == null) {
      playAnimation(setLottieProps)
    } else {           
      setUrl('http://piloto.dacclaro.com.pe/pretups/')
      setInject(jsCode)
      // if(cont==1){
      traerComision(dataCliente.Id_Cliente)
      // }
  // }, [dataCliente]);
      // cont++;
    }

  }, [dataCliente]);



  return (
    <PaperProvider>
        
     <LottieLoader lottieProps={lottieProps} />
      
     <ScrollView bounces={true}
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
     style={{flex: 1,backgroundColor:theme.colors.background}}>      
     <View style={{zIndex:1,backgroundColor:'transparent', flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:0}}>
          <Text>{version}</Text>
      </View>
      <View>
        <Text
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            /*fontFamily: "lm3",*/
            paddingHorizontal: 20,
            fontWeight: "bold",
            color: colors.primary,
            fontSize: 30,
            paddingTop:0
          }}
        >
          Bienvenido al Sistema{" "}
          <Text
            style={{
              /*fontFamily: "lm3",*/
              fontSize: 30,
              color: colors.primary,
            }}
          >
            Recarga y Recaudación
          </Text>
        </Text>
        <Text
        style={{
          textAlign: "center",
          //fontFamily: "lm2",
          fontSize: 27,
          color: colors.letras,
          marginTop:15
        }}>
          {dataCliente == null ? '' : dataCliente.Des_Cliente}
        </Text>
      </View>
      <View style={{paddingTop:10}}>
        <Text
          style={{
            textAlign:'center',
            fontWeight:'bold',
            fontSize: 10,
            color: colors.letras,
          }}
        >ACTUALIZADO AL: { new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()+' '+new Date().getHours()+':'+new Date().getMinutes() }</Text>
        <Text
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            /*fontFamily: "lm3",*/
            paddingHorizontal: 20,
            paddingTop: 10,
            fontWeight: "bold",
            color: colors.letras,
            fontSize: 23,
          }}
        >
          Saldo Recarga:{" "}
          <Text
            style={{
              /*fontFamily: "lm3",*/
              fontSize: 23,
              color: colors.primary,
            }}
          >
            s/. {toStrMoney(parseFloat(saldoPrepago.saldo.toString()))}
          </Text>
        </Text>
        <Text
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            /*fontFamily: "lm3",*/
            paddingHorizontal: 20,
            paddingTop: 5,
            color: colors.letras,
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Saldo Recaudación:{" "}
          <Text
            style={{
              /*fontFamily: "lm3",*/
              fontSize: 23,
              color: colors.primary,
            }}
          >
            s/. {toStrMoney(parseFloat(saldoColeccion.saldo.toString()))}
          </Text>
        </Text>
        {/* <Text
         style={{
          backgroundColor: "transparent",
          textAlign: "center",
          fontFamily: "lm3",
          paddingHorizontal: 20,
          paddingTop: 5,
          fontWeight: "bold",
          fontSize: 23,
        }}
        >Comisiones Adquiridas: {" "}
          <Text
            style={{
              fontFamily: "lm3",
              fontSize: 23,
              color: colors.primary,
            }}
          >
            s/. {comision}.00
          </Text>
        </Text>       */}
      </View>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              paddingHorizontal: 20,
              paddingTop: 10,
              fontWeight: "600",
              color: colors.primary,
              fontSize: 27,
            }}
          >
            Movimientos{" "}
          </Text>
        </View>
          <View style={{alignItems:'center'}}>
          {dataMovimientos != null &&
          dataMovimientos.map((prop, index)=>(
            <View key={index} style={{
              height: 70,
              width: "90%",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor:  theme.colors.primary,
              marginTop:10,}}>
              <View style={{flexDirection: "row", alignItems:"flex-end", justifyContent:"space-between", marginHorizontal:10}}>
                <Text style={{fontSize:20, fontWeight: "bold"}}>{prop.Des_Movimiento}</Text>
                <Text>{prop.Celular}</Text>
              </View>
              <View style={{flexDirection: "row-reverse", alignItems:"flex-end", justifyContent:"space-between", marginHorizontal:10}}>
                {/* <Text>Comision: s/. {prop.Comision} </Text> */}
                {/* <Text>Pago: s/. {prop.Monto} </Text> */}
                <Text>s/. {prop.Monto} </Text>
              </View>
              <View style={{flexDirection: "row", alignItems:"flex-end", justifyContent:"space-between", marginHorizontal:10}}>
              <Text>{esHoy(prop.FechaEmision)} </Text>
                <Text>ID: {prop.ID_Resultado} </Text>
              </View>
            </View>
          ))}
          </View>
      </View>
      
      </ScrollView>
      
      <View style={{backgroundColor:'blank'}}>
          <View style={{ height: 1 }}>
      <WebView
          automaticallyAdjustContentInsets={false}
          source={{ uri: url }}
          domStorageEnabled={true}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          injectedJavaScript={inject}
          onMessage={(e: {nativeEvent: {data?: string}}) => {      
            asignarsaldo(JSON.parse(e.nativeEvent.data));
          }}
        />
        </View>
        </View>
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
        <Snackbar            
        visible={visiblesb}
        onDismiss={() => setVisiblesb(false)}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
          },
        }}
      >
        {snack_message}
      </Snackbar>
     
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
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
});