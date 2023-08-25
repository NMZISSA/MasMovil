import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Alert,
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  Linking,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Provider,
} from 'react-native-paper';
import WebView from 'react-native-webview';
import LottieLoader, {
  initialLottieProps,
  playAnimation,
  pauseAnimation,
} from '../components/LottieLoader/LottieLoader';
import {colors} from '../constans';
import {eleve} from '../constans';
import {guardarDato, guardarDatoJSON, recuperarDato} from '../utils/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toStrMoney} from '../utils/convertion';
import { Post } from '../services';
import { IRespuesta } from '../class/IRespuesta';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: 'rgba(201,19,64,1)', //for the fab button 201 - 19 - 64 141 - 21 - 50
    background: colors.background,
    placeholder: '#00000080', // border color y placeholder
    button: 'rgba(0, 115, 140, 55)',
    letras: '#666666',
    txt: colors.txt,
    href: colors.href,
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  },
  eleve: {
    btn: eleve.button,
  },
};

export default function UserWeb({route, navigation}) {
  const datos = {cargador: '957764196', pin: '2581'};
  const [urls, setUrls] = useState('http://www.google.com/');
  const [temp, setTemp] = useState('');
  const [temp2, setTemp2] = useState('');
  const [op1, setOp1] = useState('');
  const [op2, setOp2] = useState('');
  const [op3, setOp3] = useState('');
  const [op4, setOp4] = useState('');
  const [erro, setErro] = useState('');
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const [conti, setConti] = useState(true);
  const [habil, setHabil] = useState(true);
  const [habil0, setHabil0] = useState(false);
  const [renv, setRenv] = useState(true);
  const [cod, setCod] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isPwd, setIsPwd] = useState(true);
  const [pin, setPin] = useState('');
  const [userWeb, setUserWeb] = useState('');
  const [pwd, setPwd] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const [visiblePwd, setVisiblePwd] = useState(true);
  const [visiblePIN, setVisiblePIN] = useState(true);
  const [colorWeb, setcolorWeb] = useState('white');
  const [colorPin, setcolorPIN] = useState('white');

  const [tCel, setTCel] = useState(120);
  const [tEmail, setTEmail] = useState(120);

  const [cargador, setCargador] = useState('');
  const [time, setTime] = useState(20);
  const [startTimer, setStartTimer] = useState(false);

  const {userbd} = route.params;
  const [comisionRecaudacion, setComisionRecaudacion] = useState('0');

  let interval = useRef();

  const Tcount = () => {};

  function validacion() {
    if (erro == 'El monto ingresado de S/.1 no es valido.') {
      setConti(false);
    } else if (erro == 'PIN Invalido.') {
      Alert.alert(
        'PIN Inválido',
        'Por favor ingrese su PIN válido, después de 3 intentos será bloqueado',
      );
    } else {
      Alert.alert('Falló Validación', 'reinicie la App');
    }
  }

  function vali() {
    setTimeout(() => {
      validacion();
    }, 5000);
  }

  let recuperar = dac => {
    console.log(dac);
    setErro(dac[0]);
  };

  const Comprobar = () => {
    playAnimation(setLottieProps);

    setUrls(
      'http://piloto.dacclaro.com.pe/PretupsIRIS/c2sRechargeAction?serviceName=Recarga%20Virtual&retailerMSISDN=' +
        cargador +
        '&subscriberMSISDN=51982348266&rechargeAmout=1&subscriberLang=sp&retailerLang=sp&subserviceName=CVG&languagelistsize=2&languagecode=No%20aplicable%20&retailerPIN=' +
        pin,
    );
    setTemp(inyeccion);
  };

  const rayos = () => {
    setOp1(
      'http://piloto.dacclaro.com.pe/PretupsIRIS/c2sRechargeAction?serviceName=Recarga%20Virtual&retailerMSISDN=' +
        cargador +
        '&subscriberMSISDN=51982348266&rechargeAmout=1&subscriberLang=sp&retailerLang=sp&subserviceName=CVG&languagelistsize=2&languagecode=No%20aplicable%20&retailerPIN=' +
        pin,
    );
    setOp2(
      'http://piloto.dacclaro.com.pe/PretupsIRIS/conformationAction?offerSelectedId=TopUp:1|' +
        cargador +
        '&redirect=YES',
    );
    setOp3(
      'http://piloto.dacclaro.com.pe/PretupsIRIS/conformationAction?offerSelectedId=TopUp%3A1%7C' +
        cargador,
    );
    setOp4(
      'http://piloto.dacclaro.com.pe/PretupsIRIS/finalPreviewAction?retailerMSISDN=' +
        cargador +
        '&offerId=TopUp:1',
    );
  };

  const inyeccion = `
      let a = window.location.href;
      var recuperar=[];
      var terro = '';
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
          setTimeout(rellenar,1000);
        }
      }
      else if(a == "${op1}" )
      {
        document.querySelector('input[name="btnSubmit"]').click();
      }
      
      function sendPostMessage(){
        window.ReactNativeWebView.postMessage(JSON.stringify(recuperar));
      }
      
      function errores(){
        terro = document.querySelector("body > table > tbody > tr:nth-child(1) > td").innerText;
        recuperar.push(terro);
        setTimeout(sendPostMessage,1000);
      }`;

  const inyeccion2 = `
      let a = window.location.href;
      var rpta = [];
      var b = '';
      if(window.location.href == "http://piloto.dacclaro.com.pe/pretups/"){
        document.querySelector('input[name="loginID"]').value = "${userWeb}";
        document.querySelector('input[name="password"]').value = "${pwd}";
        document.querySelector('input[name="submit1"]').click();
      }
      else if (window.location.href== "http://piloto.dacclaro.com.pe/pretups/login.do"){

        setTimeout(errores,1000);
      }
      else if(a == "http://piloto.dacclaro.com.pe/pretups/loggedin.do?method=homepage"){
        setTimeout(llenar,1000);
      }

      function sendPostMessage(){
        window.ReactNativeWebView.postMessage(JSON.stringify(rpta));
      }

      function llenar(){
        b = 'EXITO';
        rpta.push(b);
        setTimeout(sendPostMessage,1000);
      }

      function errores(){
        b = document.querySelector("body > form:nth-child(2) > table:nth-child(6) > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(1) > td > div > li").innerText;
        rpta.push(b);
        setTimeout(sendPostMessage,1000);
      }
      `;
  /*
   */

  const comprobarPwd = () => {
    playAnimation(setLottieProps);

    console.log(userWeb + ' ' + pwd);
    setUrls('http://piloto.dacclaro.com.pe/pretups/');
    setTemp(inyeccion2);
    // if (userWeb != '' && pwd != '') {

    // }
    // else if(userWeb == ''){
    //     Alert.alert('Datos Incompletos','Ingrese su Usuario Web')
    // }
    // else if(pwd == ''){
    //     Alert.alert('Datos Incompletos','Ingrese su Contraseña Web')
    // }
    // else{
    //     Alert.alert('Error Inesperado','Reinicie la aplicación')
    // }
  };
  async function tCargador() {
    setCargador(await recuperarDato('CARGA'));
  }

  async function guardarComision() {
    var comiPrepago = {
      Cod_Producto : '102',
      Id_Cliente : userbd.resultado[0].Id_Cliente,
      Comision : 0.0,
      Cod_Usuario : 'APP'
    }
    var comiRecaudacion = {
      Cod_Producto : '101',
      Id_Cliente : userbd.resultado[0].Id_Cliente,
      Comision : toStrMoney(parseFloat(comisionRecaudacion)),
      Cod_Usuario : 'APP'
    }
    console.log(comiPrepago);
    console.log(comiRecaudacion);
    
    Post('USP_CRL_PRODUCTO_CLIENTE_SALDOS_G_Comision',comiPrepago).then((data: IRespuesta)=>{
      // Alert.alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
    Post('USP_CRL_PRODUCTO_CLIENTE_SALDOS_G_Comision',comiRecaudacion).then((data: IRespuesta)=>{
      // Alert.alert(JSON.stringify(data))
    }).catch((e)=>{
      // alert(e)
    })
  }

  function enviardata(){
    asignar()
    envDatos(data)
    envPin(pin)
    guardarComision()
    navigation.navigate('Validation')
  }

  useEffect(() => {
    if (startTimer == true) {
      interval = setInterval(() => {
        if (time == 0) {
          clearInterval(interval.current);
          setTime(20);
          setStartTimer(false);
        } else {
          setTime(t => t - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [startTimer]);

  useEffect(() => {
    setUserWeb(userbd.resultado[0].CuentaWeb);
    setPwd(userbd.resultado[0].Contraseña);
    setPin(userbd.resultado[0].PIN_Claro);
    rayos();
    tCargador();
  }, []);

  async function envDatos(dat) {
    console.log(dat);
    console.log('//////////////////////////////////////');
    
    await guardarDatoJSON('WEB', dat);
  }

  async function envPin(pin) {
    await guardarDato('PIN', pin);
  }

  const [data, setData] = useState({usweb: '', contraseña: '', pinclaro: ''});
  const asignar = () => {
    setData({usweb: userWeb, contraseña: pwd, pinclaro: pin});
  };

  return (
    <Provider
      theme={theme}
      style={{
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'column',
        width: '100%',
      }}>
      <LottieLoader lottieProps={lottieProps} />
      <KeyboardAvoidingView
        behavior="height"
        style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{backgroundColor: theme.colors.background}}>
          <View style={{backgroundColor: 'red'}}>
            <View style={{height: 1}}>
              <WebView
                source={{uri: urls}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                injectedJavaScript={temp}
                style={{backgroundColor: '#00000000'}}
                automaticallyAdjustContentInsets={false}
                onMessage={(e: {nativeEvent}) => {
                  console.log(e.nativeEvent);
                  if (
                    JSON.parse(e.nativeEvent.data)[0] ==
                    'El monto ingresado de S/.1 no es valido.'
                  ) {
                    setConti(false);
                    setcolorPIN('green');
                    pauseAnimation(setLottieProps);
                  } else if (
                    JSON.parse(e.nativeEvent.data)[0] == 'PIN Invalido.'
                  ) {
                    Alert.alert(
                      'PIN Inválido',
                      'Por favor ingrese su PIN válido, después de 3 intentos será bloqueado',
                    );
                    setPin('');
                  } else if (JSON.parse(e.nativeEvent.data)[0] == 'EXITO') {
                    setIsPwd(!isPwd);
                    setcolorWeb('green');
                    setHabil0(false);
                    pauseAnimation(setLottieProps);
                  } else {
                    Alert.alert('Error de validación', e.nativeEvent.data);
                    setUrls('http://www.google.com/');
                    pauseAnimation(setLottieProps);
                  }
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
              Datos Web
            </Text>
            {/* <TouchableOpacity 
                        onPress={()=>{setHabil(!habil)}}
                        style={{
                        height:40,                 
                        borderColor:'red', 
                        borderBottomWidth:0.5,
                        justifyContent:'flex-end',
                        alignItems:'center',
                        }}>
                        <Ionicons                
                            name='pencil'
                            size={25}
                            color='red'
                        />
                    </TouchableOpacity> */}
          </View>
          <View
            style={{
              marginTop: 1,
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}>
            <View style={styles.conten1}>
              <Text style={styles.textstyle}>
                USUARIO WEB:{' '}
                <Ionicons
                  name="checkmark-done-sharp"
                  size={18}
                  color={colorWeb}
                />
              </Text>
            </View>
            <View style={[styles.conten2]}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  marginLeft: 20,
                }}>
                <TextInput
                  style={[styles.textInput, {width: '88%', marginRight: 5}]}
                  placeholder={'DCTBOD00001'}
                  editable={false}
                  onChangeText={userWeb => {
                    setUserWeb(userWeb);
                  }}
                  onEndEditing={() => {
                    if (userWeb != '') {
                      setUserWeb(userWeb);
                      setHabil0(!habil0);
                    }
                  }}
                  defaultValue={userWeb}
                  value={userWeb}></TextInput>
              </View>
            </View>
            <View style={styles.conten1}>
              <Text style={styles.textstyle}>
                CONTRASEÑA WEB:{' '}
                <Ionicons
                  name="checkmark-done-sharp"
                  size={18}
                  color={colorWeb}
                />
              </Text>
            </View>
            <View style={[styles.conten2]}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                  marginLeft: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '70%',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={[styles.textInput, {width: '85%', marginRight: 5}]}
                    placeholder={'Contraseña'}
                    editable={true}
                    secureTextEntry={visiblePwd}
                    onChangeText={pwd => {
                      setPwd(pwd);
                    }}
                    onEndEditing={() => {
                      setPwd(pwd), setIsPwd(!isPwd);
                    }}
                    defaultValue={pwd}
                    value={pwd}></TextInput>
                  <TouchableOpacity
                    style={{zIndex: 1, padding: 0}}
                    onPress={() => setVisiblePwd(!visiblePwd)}>
                    <Ionicons
                      name={!visiblePwd ? 'eye-off' : 'eye'}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  disabled={pwd.length > 5 ? false : true}
                  style={{
                    minWidth: '19%',
                    height: 40,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 10,
                    backgroundColor: pwd.length > 5 ? colors.button : '#C6C6C6',
                    elevation: 2,
                  }}
                  onPress={() => {
                    comprobarPwd(), rayos();
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
                      Validar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.conten1}>
              <Text style={styles.textstyle}>
                PIN CLARO:{' '}
                <Ionicons
                  name="checkmark-done-sharp"
                  size={18}
                  color={colorPin}
                />
              </Text>
              <View style={[styles.conten2]}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    marginLeft: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '70%',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      style={[
                        {
                          width: '68%',
                          backgroundColor: 'white',
                          height: 50,
                          paddingLeft: 4,
                          color: habil ? colors.txt : 'white',
                          marginRight: 5,
                          fontSize: 25,
                        },
                      ]}
                      placeholder={'_ _ _ _'}
                      keyboardType="numeric"
                      secureTextEntry={visiblePIN}
                      editable={habil}
                      onChangeText={pin => {
                        setPin(pin);
                      }}
                      onEndEditing={() => {
                        setPin(pin), setIsValid(!isValid);
                      }}
                      maxLength={4}
                      defaultValue={pin}
                      value={pin}></TextInput>
                    <TouchableOpacity
                      onPress={() => setVisiblePIN(!visiblePIN)}>
                      <Ionicons
                        name={!visiblePIN ? 'eye-off' : 'eye'}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    disabled={pin.length == 4 ? false : true}
                    style={{
                      minWidth: '19%',
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 10,
                      backgroundColor:
                        pin.length == 4 ? colors.button : '#C6C6C6',
                      elevation: 2,
                    }}
                    onPress={() => {
                      rayos(), asignar(), Comprobar();
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
                        Validar
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{paddingTop: 20}}>
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
                Comisiones
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 20,
                }}>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 13,
                    marginBottom: 5,
                    color: 'red',
                    width: '50%',
                  }}>
                  RECAUDACION{' '}
                </Text>
                <View
                  style={{
                    width: '40%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{paddingRight: 5, fontSize: 15}}>S/.</Text>
                  <TextInput
                    style={{
                      width: '80%',
                      borderColor: 'white',
                      borderRadius: 5,
                      backgroundColor: 'white',
                      height: 40,
                      elevation: 2,
                      paddingLeft: 15,
                      textAlign: 'right',
                    }}
                    keyboardType="numeric"
                    placeholder={'0.00'}
                    onChangeText={setComisionRecaudacion}
                    value={comisionRecaudacion}></TextInput>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: 15,
              }}>
              <TouchableOpacity
                style={[
                  styles.bun,
                  {
                    backgroundColor: colors.button ,
                    elevation: eleve.button,
                    marginTop: 10,
                  },
                ]}
                onPress={() => {
                  asignar(),enviardata()                  
                }}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                    Continuar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontSize: 30}}></Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  textstyle: {
    marginLeft: 20,
    fontSize: 13,
    marginBottom: 5,
    color: 'red',
  },
  textInput: {
    borderRadius: 5,
    width: '89%',
    backgroundColor: 'white',
    height: 40,
    elevation: 2,
    paddingLeft: 15,
  },
  conten1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
  },
  conten2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 5,
  },
  texto: {
    fontSize: 13,
    paddingTop: 5,
    color: theme.colors.txt,
  },
  press: {
    marginTop: 15,
    color: theme.colors.href,
    textDecorationLine: 'underline',
    fontSize: 11,
  },
  bun: {
    elevation: theme.eleve.btn,
    height: 45,
    width: '80%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
