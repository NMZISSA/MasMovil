import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import arrayShuffle from "array-shuffle";
import {
  Provider as PaperProvider,
  DefaultTheme,
  IconButton,
  Modal,
} from "react-native-paper";
import { colors } from "../constans";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import { guardarDato, recuperarDato, recuperarDatoJSON } from "../utils/storage";
import { Post } from "../services";
import { IRespuesta } from "../class/IRespuesta";
var md5 = require('md5');

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

export default function PasswordChange({ navigation }) {
  const [pin, setPin] = useState("");
  const [lpin, setLPin] = useState("");
  const [npin, setNPin] = useState("");
  const [cpin, setCPin] = useState("");
  const [login, setLogin] = useState({});
  const [arrayNumero, setArrayNumero] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ]);
  const [modalVisible, setModalVisible] = useState(false)
  // const [arrayNumero,setArrayNumero] =useState([{item:1},{item:2},{item:3},{item:4},{item:5},{item:6},{item:7},{item:8},{item:9},{item:0}]);
  const [isVisibleButton, setIsVisibleButton] = useState(true);
  const [isVisiblePIN, setIsVisiblePIN] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snack_message, setSnackMsg] = useState("");
  const [color, setColor] = "#C6C6C6";
  const [opc, setOpc] = useState(1)
  const [nButton, setNButton] = useState('Continuar')
  const [nTitle, setNTitle] = useState('Ingresa tu\nclase de acceso')
  let ntpin = ''; 
  useEffect(() => {
    const shuffle = arrayShuffle(arrayNumero);
    setArrayNumero(shuffle);
    traeData();
  }, []);

  useEffect(() => {
    if (pin.length === 6) {
      setIsVisibleButton(false);
      setIsVisiblePIN(true);
    }
    if (pin.length < 6) {
      setIsVisibleButton(true);
      setIsVisiblePIN(false);
    }
  }, [pin]);

  async function traeData() {
    setLogin(await recuperarDatoJSON('LOGIN'));    
  }

  async function check() { 
    
    switch (opc) {
      case 1:
        var tpin = pin.slice(0,6)        
        setPin("")
        const shuffle1 = arrayShuffle(arrayNumero);
        setArrayNumero(shuffle1);
        if (tpin === login.PIN) {
          setOpc(2)
          setNButton('Confirmar Clave')
          setNTitle('Ingresa tu nueva\nclave de acceso')
        } else {
          Alert.alert('','Clave de Acceso Incorrecta\nVuelva a intentarlo')
        }
        break;
      case 2:
        ntpin = pin.slice(0,6)
        setNPin( pin.slice(0,6))
        setPin("")
        const shuffle2 = arrayShuffle(arrayNumero);
        setArrayNumero(shuffle2);
        setNTitle('Reingresa tu nueva\nclave de acceso')
        setNButton('Cambiar Clave')
        setOpc(3)
        break;
      case 3:  
        var tpin = pin.slice(0,6)    
        setCPin(pin)
        setPin("")
        if (npin === tpin) {
          setModalVisible(!modalVisible)            
          var nuevo = {
            Cargador : login.Cargador,
            PIN_CLARO : login.PIN_Claro,
            PIN : npin
          }
          
          Post('USP_CRL_DATOS_CLIENTES_G_ActualizarPIN',nuevo).then((data: IRespuesta)=>{
            // Alert.alert(JSON.stringify(data))
            setModalVisible(!modalVisible)
            navigation.navigate('MainApp')
          }).catch((e)=>{
            // alert(e)
          })
        } else {
          Alert.alert('','Las Claves de Acceso son diferentes\nVuelva a intentarlo')
        }
        break;    
      default:
        
        break;
    }
  }

  return (
    <PaperProvider>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={styles.title}>{nTitle}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <FontAwesome
            style={{ marginRight: 10 }}
            name={pin.length > 0 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
          <FontAwesome
            style={{ marginRight: 10 }}
            name={pin.length > 1 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
          <FontAwesome
            style={{ marginRight: 10 }}
            name={pin.length > 2 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
          <FontAwesome
            style={{ marginRight: 10 }}
            name={pin.length > 3 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
          <FontAwesome
            style={{ marginRight: 10 }}
            name={pin.length > 4 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
          <FontAwesome
            name={pin.length > 5 ? "circle" : "circle-o"}
            size={20}
            color={"rgba(178, 8, 8, 0.78)"}
          />
        </View>
        <View style={styles.gallery}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[0]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[1]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[2]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[3]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[3]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[4]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[4]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[5]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[5]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[6]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[6]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[7]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[7]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[8]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[8]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnErase} onPress={() => setPin("")}>
            <Fontisto name="trash" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPin(pin + arrayNumero[9]);
            }}
            disabled={isVisiblePIN}
          >
            <Text style={styles.nmr}>{arrayNumero[9]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnErase}
            onPress={() => setPin((pin) => pin.slice(0, pin.length - 1))}
          >
            <FontAwesome5 name="backspace" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              elevation: 5,
              height: 55,
              width: "80%",
              backgroundColor: !isVisibleButton ? "red" : "#C6C6C6", //theme.colors.button,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "white",
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
            }}
            disabled={isVisibleButton}
            onPress={()=>check()}
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
                {nButton}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    <Modal
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
              {/* <Text style={{fontSize:25, color:'red', fontWeight:'800', paddingTop:20}}>BIENVENIDO</Text> */}
              
              <Image style={{ height: 180, width: 180 }} source={require('../../assets/check.png')} resizeMode='contain'/>

              <Text style={{fontSize:20,paddingBottom:30}}>Cambio de Contraseña Exitoso </Text>   
              </View>
          </View>
        </View>
    </Modal>  
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 57,
    height: 57,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 50,
  },
  btnErase: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 10,
    width: 57,
    height: 57,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 50,
  },
  caja: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  gallery: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    padding: 15,
  },
  img: {
    width: 37,
    height: 20,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  title: {
    fontSize: 25,
    color: "red",
    fontWeight: "600",
    padding: 25,
    width: 350,
    textAlign: "center",
  },
  pwd: {
    fontSize: 18,
    color: "#DDDDDD",
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
  nmr: {
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
