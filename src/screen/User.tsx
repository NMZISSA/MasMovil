import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Alert, Text, View, Modal, Pressable, StyleSheet, Linking, Image, TextInput  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { Provider as PaperProvider, DefaultTheme, TextInput as TxtInput} from "react-native-paper";
import { colors,eleve, version } from "../constans";
import { enviarSms } from "../services/sms";
import { guardarDatoJSON } from "../utils/storage";
import { getDias, getDni } from "../services";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieLoader from "../components/LottieLoader";
import { initialLottieProps, pauseAnimation, playAnimation } from "../components/LottieLoader/LottieLoader";

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

export default function User ({route, navigation}){
    const [numberCelular, setNumberCelular] = useState('');
    const [can_touch, setCanTouch] = useState(true);
    const [number_color, setNumberColor] = useState("red");
    const [celular_error, setCelularError] = useState(false);

    const [habil,setHabil]=useState(true);
    const [renv, setRenv] = useState(true);
    const [cod,setCod] = useState(false);
    const [isValid,setIsValid]=useState(true);
    const [isValid2,setIsValid2]=useState(true);
    const [pin,setPin]=useState('○○○○');
    const [userWeb,setUserWeb]=useState('DCTBOD22354');
    const [conti,setConti] = useState(true);
    const [codigo,setCodigo] = useState('');
    const [sms,setSms] = useState(0);

    const [tCel, setTCel] = useState(120)
    const [tEmail, setTEmail] = useState(120)

    const [noComer,setNoComer] = useState('');
    const [noUser,setNoUser] = useState('');
    const [dni,setDni] = useState('');
    const [eMail,setEmail] = useState('');
    const [lottieProps, setLottieProps] = useState(initialLottieProps);
    const [time,setTime]=useState(30);
    const [startTimer,setStartTimer]=useState(false);
    const {userbd} = route.params
    let interval = useRef();

    const Tcount = () => {
        

    }

    const lleno = ()=>{if (numberCelular.length == 0 || numberCelular.length < 9 || numberCelular.startsWith('9') == false) {
        Alert.alert('Celular inválido','Por favor ingrese un celular válido');
        setNumberCelular('')
    }
    else{
        setNumberCelular(numberCelular)
        setIsValid2(false)
    }}


    function verificar(x,y){
        if (x == y) {
          if (noUser !== '') {
            setConti(false);              
          }
          else{
            Alert.alert('Nombre Erroneo','Nombre de Encargado inválido');    
          }
        }
        else{
          Alert.alert('Codigo Erroneo','Ingrese el codigo correcto');
        }
      }
    
      useEffect(()=>{
            setNoComer(userbd.resultado[0].Des_Cliente)
            setNoUser(userbd.resultado[0].Nombre_Contacto)

          setDni(userbd.resultado[0].DNI_Contacto)
          setEmail(userbd.resultado[0].Email_Contacto)
          setNumberCelular(userbd.resultado[0].Celular_Contacto)
        const x=setSms(Math.floor(Math.random() * (9999 - 1000)) + 1000)
      },[])
    

    useEffect(() => {
        if(startTimer==true){
             interval = setInterval(() => {
                  if (time == 0) {
                    clearInterval(interval.current)
                    setTime(20)
                    setStartTimer(false)  
                  }
                  else{
                    setTime(t => t - 1)
                  }
          }, 1000);
        };
        return () => {
            clearInterval(interval.current);
        }
      }, [startTimer])

    let nombre;
    let ap;
    let am;
    async function reniec(nn) {
        playAnimation(setLottieProps)
        const response = await getDni(nn)
        console.log('response');
        console.log(response);
        console.log('response');
        if(response == null){
            pauseAnimation(setLottieProps)
        }else{
        nombre = response.Nombres;
        ap=response.Apellido_Paterno;
        am=response.Apellido_Materno;
        setNoUser(nombre +" "+ap+" "+am )
        pauseAnimation(setLottieProps)
        }
    }

    async function cambiar() {
        
        envDatos(datos)
        navigation.push("Direction", {userbd:userbd})
    }
    async function envDatos(dat) {
        var param = {
            Id_Cliente:userbd.resultado[0].Id_Cliente
          }
          const dias = await getDias(param)
          await guardarDatoJSON('DAY',dias.resultado[0])
        await guardarDatoJSON('USR',dat);
    }

    const [datos,setDatos]=useState({comercio:'',nombre:'',dni:'',email:'',celu:''});
    const asignar =()=>{
        setDatos({comercio:noComer,nombre:noUser,dni:dni,email:eMail,celu:numberCelular})
    }

    const validateMail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          Alert.alert('Email Inválido','Por favor ingrese un correo válido')
          setEmail('');
          return false;
        }
        else {
          setEmail(text)
        }
      }
    return(
        <PaperProvider >
        <LottieLoader lottieProps={lottieProps}/>
        <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text
                        style={{
                        backgroundColor: "transparent",
                        textAlign: "center",
                        /*fontFamily: "lm3",*/
                        paddingHorizontal: 20,
                        fontWeight: "bold",
                        color: colors.primary,
                        fontSize: 30,
                        }}
                    >
                        Datos Personales
                    </Text>
                </View>
                <View
                    style={{marginTop:1,justifyContent:'space-around',flexDirection:'column', }}
                >                    
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Nombre Comercial:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                            <TextInput 
                                defaultValue={noComer}
                                value={noComer}
                                autoCapitalize='sentences'
                                multiline={false}
                                keyboardType='default'
                                selectTextOnFocus={true}
                                style={styles.textInput}
                                placeholder={'Nombre del Comercio'}
                                editable={habil}
                                onChangeText={(noComer)=>{setNoComer(noComer)}}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>DNI:</Text>
                        <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:20}}>
                            <TextInput 
                                defaultValue={dni}
                                value={dni}
                                selectTextOnFocus={true}
                                style={[styles.textInput,{width:'68%',marginRight:5}]}
                                placeholder={'DNI'}
                                editable={habil}
                                keyboardType={"numeric"}
                                maxLength={8}
                                onChangeText={(dni)=>{
                                        setDni(dni)
                                    }}>
                            </TextInput>
                            <TouchableOpacity
                               disabled={dni.length!=8 ? true : false}
                                style={{
                                minWidth: "19%",
                                height: 40,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 10,
                                backgroundColor: dni.length==8 ? colors.button : '#C6C6C6',
                                elevation: 2
                                }}
                                onPress={()=>{console.log(dni),reniec(dni)}}>
                                <View
                                    style={{
                                    backgroundColor: "transparent",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Text
                                        style={{ fontSize: 13, color: "white", fontWeight: "bold" }}
                                    >
                                        Buscar
                                    </Text>
                                </View>
                            </TouchableOpacity>   
                        </View>
                    </View>
                    <View style={styles.conten1}>
                    <Text style={styles.textstyle}>Nombre:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder={'Nombre'}
                            editable={false}
                            value={noUser}
                            defaultValue={noUser}

                            >
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                    <Text style={styles.textstyle}>Correo Electrónico:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TextInput 
                            style={styles.textInput}
                            defaultValue={eMail}
                            value={eMail}
                            placeholder={'Email'}
                            editable={habil}
                            textContentType='emailAddress'
                            onChangeText={(eMail)=>{setEmail(eMail)}}
                            onEndEditing={()=>{validateMail(eMail)}}>
                            </TextInput>
                        </View>
                    </View>
                
                        {/* <TextInput 
                            style={{width:'100%',color:'white',borderBottomWidth:0.5,borderTopWidth:0.5, borderColor:'red',textAlign:'center',marginTop:20, backgroundColor:'red',fontSize:18,fontWeight:'700'}}
                            editable={false}
                        >Validar Datos</TextInput> */}
                                
                    <View style={[styles.conten2,{}]}>
                    <Text style={styles.textstyle}>Celular de Contacto:</Text>
                    <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:20}}>
                            <TextInput
                                value={numberCelular}
                                defaultValue={numberCelular}
                                selectTextOnFocus={true}
                                placeholderTextColor={colors.letras}
                                multiline={false}
                                placeholder={'999 999 999'}
                                keyboardType={"numeric"}
                                disabled={!can_touch}
                                maxLength={9}
                                editable={habil}
                               
                                error={celular_error}
                                onChangeText={phone => {
                                    if(phone.length == 0 || phone.length < 9) {
                                    setCelularError(true)
                                    } else {
                                    setCelularError(false) 
                                    }  
                                    setNumberCelular(phone)
                                    }}
                                onEndEditing={()=>lleno()}
                                theme={{ colors: { text: "black" } }}
                                style={[styles.textInput,{width:'58%',marginRight:5}]}
                               >
                                </TextInput>
 
                            <TouchableOpacity
                                disabled={numberCelular.length != 9  ? true : false}
                                onPress={()=>{setCod(true),setRenv(false),console.log(sms),enviarSms(numberCelular, sms),asignar()}}
                                style={{
                                minWidth: "30%",
                                height: 40,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 10,
                                backgroundColor: numberCelular.length == 9   ? colors.button : '#C6C6C6',
                                elevation: 2
                                }}
                                >
                                <View
                                    style={{
                                    backgroundColor: "transparent",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Text
                                        style={{ fontSize: 13, color: "white", fontWeight: "bold" }}
                                    >
                                        Enviar código
                                    </Text>
                                </View>
                            </TouchableOpacity>   
                        </View>
                        <View style={{alignItems:'center', width:'100%',flexDirection:'column',marginLeft:20}}>
                        <TextInput 
                            style={[{color: habil ? colors.txt : 'white',fontSize:25,marginTop:20}]}
                            placeholder={cod ? '_ _ _ _' : '' }
                            keyboardType='numeric'
                            editable={cod}
                            maxLength={4}
                            onChangeText={(codigo)=>{setCodigo(codigo)}}
                            onEndEditing={()=>{setCodigo(codigo),verificar(codigo,sms)}}>
                        </TextInput>

                        <Text style={[styles.texto,{color: cod ? colors.txt : 'white',}]}>Ingrese código de validación</Text>

                        {/* <Pressable disabled={renv}>
                            <Text style={[styles.press,{color: !renv ? colors.href : 'white',}]}>Reenviar código en {time} seg</Text>
                        </Pressable> */}
                        </View>
                    </View>

                    <View style={{
                        alignItems:"center",
                        paddingTop: 15
                        }}>
                            <TouchableOpacity 
                            style={[styles.bun,{ backgroundColor: !conti ? colors.button : 'white', elevation: !conti ? eleve.button:0,marginTop:10}]} 
                            disabled={conti}
                            onPress={()=>cambiar()}
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
                <Text style={{fontSize:30}}></Text> 
                </View>

            </ScrollView>
            
        </PaperProvider> 
    );
}
const styles=StyleSheet.create({
    container: {
        paddingTop:30,
        flex: 1,
        backgroundColor: '#fff',
        //justifyContent: 'center',
      },
    textstyle:{
        marginLeft:20,
        fontSize:13,
        marginBottom:5,
        color:'red'
    },
    textInput:{
        borderRadius:5,
        width:'89%',
        backgroundColor:'white',
        height:40,
        elevation:2,
        paddingLeft:15
    },
    conten1:{
        flexDirection:'column', 
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:'100%',
        marginTop:20
    },
    conten2:{
        flexDirection:'column', 
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:'100%',
        marginTop:12,
      
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
    texto: {
        fontSize:13, 
        paddingTop:5,
        color:theme.colors.txt,
      },
      press:{
        marginTop:15,
        color:theme.colors.href,
        textDecorationLine:'underline',
        fontSize:11
      },
})