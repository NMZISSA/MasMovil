import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useState, useEffect, useRef }  from "react"
import { BackHandler, Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import LottieLoader from "../components/LottieLoader";
import { initialLottieProps, pauseAnimation, playAnimation } from "../components/LottieLoader/LottieLoader";
import { images, version } from "../constans";
import { guardarDatoJSON, recuperarDatoJSON } from "../utils/storage";
import { colors } from "../constans"
// import ModalAddNumber from "../modals/ModalAddNumber";
import { IRespuesta } from "../class/IRespuesta";
import ModalAddNumber from "../modals/ModalAddNumber/ModalAddNumber";

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
  
  interface LottieProps {
      speed: number,
      color: string,
      lottiecolor: string,
      zindex: number
  }
  
  const emptyFormaPago = null;

  export default function Home({navigation}){
    const modalAddNumberref = useRef();
    const [lottieProps, setLottieProps] = useState(initialLottieProps);
    const [visible, setVisible] = useState(false);
    const [formaPagoSelected, setFormaPagoSelected] = useState(emptyFormaPago)
    const [empresa, setEmpresa] = useState('');
    const [numero, setNumero] = useState('');
    const [dataEmpresas, setDataEmpresas] = useState([]);
    
      function openModalAddNumber() {
      modalAddNumberref.current.openModal()
    }
  
    function onSaveChangeUser(data: IRespuesta) {
      setVisible(true)
      setSnackMsg(data.mensaje)
    }
  
    async function loadEmpresa(){
      setDataEmpresas(await recuperarDatoJSON('DATA_INI'))
      console.log(dataEmpresas);
    }
  
    function changenumber(number){
      console.log(number);
  
      let secretNumber = number.slice(0, 1)+'** *** *'+number.slice(7, 9);
      
      return secretNumber
    }
  
    useEffect(()=>{    
      loadEmpresa();
      
    },[])
    
    async function ActualizarDATA_INI(dataEmpresas) {
      await guardarDatoJSON('DATA_INI', dataEmpresas);
    }
  
    useEffect(()=>{
      playAnimation(setLottieProps)
      if (dataEmpresas!= null) {
        dataEmpresas.forEach(empresa => {
          if (empresa.select == true) {
            setEmpresa(empresa.comercio);
            setNumero(empresa.cargador);
            setVisible(true)
          }
        }) 
      }    
      ActualizarDATA_INI(dataEmpresas);
      pauseAnimation(setLottieProps)
    },[dataEmpresas])
  
    // useEffect(()=>navigation.addListener('beforeRemove', (e) => {
    
    //   // Prevent default behavior of leaving the screen
    //   e.preventDefault();
    //   const isFocused = navigation.isFocused();
    //   // console.log(isFocused+'PrincipalStack');
    //   // if(isFocused){
    //     BackHandler.exitApp();
    //   // }
    //   // else{
    //   //   navigation.jumpTo('PrincipalStack')
    //   // }
    //   // Prompt the user before leaving the screen
      
      
    // }),
    // [navigation])
  
  
    return(
      <PaperProvider theme={theme}>
        <ModalAddNumber onSaveChangeUser={onSaveChangeUser} dataEmpresas={dataEmpresas} setDataEmpresas={setDataEmpresas} navigation={navigation} ref={modalAddNumberref} /> 
        <LottieLoader  lottieProps={lottieProps} />
        <View style={{flex:1, backgroundColor: theme.colors.background, justifyContent: "space-evenly"}}>
          <View style={{ height:'20%', width:'100%', backgroundColor: theme.colors.background, alignItems:'center', justifyContent:'center', marginTop: 10  }}>
            <Image style={{ height: 180, width: 180 }} source={images.pLogo} resizeMode='contain'/>
          </View>
          <View style={{
            alignItems:"center"
          }}>
            <TouchableOpacity style={styles.buttons} onPress={()=>openModalAddNumber()}>
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: 'row',
                  justifyContent: 'space-evenly'
                }}
              >
                <AntDesign name="user" size={24} color={theme.colors.primary} />
                <Text
                  style={{ fontSize: 13, color: theme.colors.letras, fontWeight: "bold" }}
                >
                  {empresa == '' ? 'Iniciar Sesion' : empresa}
                </Text>
                <Text
                  style={{ fontSize: 13, color: theme.colors.letras, fontWeight: "bold" }}
                >
                  {empresa == '' ? '' :changenumber(numero)}
                </Text>
                {empresa == '' ? <></> : <AntDesign name="caretdown" size={24} color={theme.colors.primary} />}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            alignItems:"center",
            paddingTop: 30,
            display: !visible ? 'none' : 'flex'
          }}        
          >          
            <TouchableOpacity style={{
              elevation: 5,
              height: 55,
              width: "80%",
              backgroundColor: theme.colors.primary,
              borderRadius: 10,            
              borderWidth: 1,
              borderColor: "white",
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",}} disabled={!visible} onPress={()=>navigation.navigate('EntryValidation',{celular:numero})}>
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 13, color: 'white', fontWeight: "bold" }} >
                  Entrar al Sistema
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={{backgroundColor: theme.colors.background, flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:10}}>
            <Text>{version}</Text>
        </View>
      </PaperProvider>
    )
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
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
    countContainer: {},
  });