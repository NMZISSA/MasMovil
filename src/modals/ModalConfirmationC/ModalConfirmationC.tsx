import React, {useRef,forwardRef,useImperativeHandle, useState, useEffect} from 'react';
import { Text, View,Dimensions,TouchableOpacity, } from 'react-native';
import Modal from 'react-native-modalbox'
import { DefaultTheme, TextInput,  } from 'react-native-paper';
import Fontisto from  'react-native-vector-icons/Fontisto'
import AntDesign from  'react-native-vector-icons/AntDesign'
import { initialLottieProps, playAnimation, pauseAnimation } from '../../components/LottieLoader/LottieLoader';
import { colors } from '../../constans';
import { recuperarDatoJSON } from '../../utils/storage';
var screen = Dimensions.get('window');

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

export default forwardRef((props, ref) => {
  const [customHeight, setCustomHeight] = useState(0);
  const [canTouch, setCanTouch] = useState(true);
  const [correo, setCorreo] = useState("");
  const [correoColor, setCorreoColor] = useState("");
  const [correo_error, setCorreoError] = useState(true);
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const dataEmpresas = props.dataEmpresas;
  const setDataEmpresas = props.setDataEmpresas;
  const mRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      setCustomHeight(220);
      setCorreo("");
      setCorreoError(true);
      setCorreoColor("");
      setCanTouch(true);
      console.log('dataEmpresas');
      console.log(dataEmpresas);
      
      // setDataEmpresas(dDataEmpresas);
      mRef.current.open();
    },
  }));

  function cerrarModal() {
    mRef.current.close();
  }

  async function loadData() {
    setDataEmpresas(await recuperarDatoJSON('DATA_INI'))
  }
  useEffect(() => {  
    loadData()
    // console.log(props);
    
  }, []);

  const dDataEmpresas = [
    {
      number: "910258516",
      business: "Botica San Juan",
      select: false
    },
    {
      number: "923768516",
      business: "Multiservicios Milagros",
      select: true
    },
    {
      number: "945612378",
      business: "La Farmacia Milagros",
      select: false
    }
  ]

  function changenumber(number){
    let secretNumber = number.slice(0, 1)+'** *** *'+number.slice(7, 9);
    return secretNumber
  }

  function selectPrincipalNumber(index){
    // console.log(index);
    dataEmpresas.forEach(empresa => {
      empresa.select = false        
    });
    dataEmpresas[index].select = true;      
    let copy = [...dataEmpresas]
    setDataEmpresas(copy); 
    cerrarModal()
  }

  return (
    <Modal
      ref={mRef}
      style={{
        alignItems: "center",
        borderWidth: 0.2,
        elevation: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowRadius: 10,
        width: screen.width - 20,
        height: 350,
        marginBottom: 0,
      }}
      position={"bottom"}
      backdrop={true}
      swipeToClose={false}
      backdropPressToClose={true}
      onClosed={() => {
        //alert('Modal Close')
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: colors.header,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <Text style={{ color: "white", /*fontFamily: "lm3"*/ }}>
            Bodegas Registradas
          </Text>          
          <TouchableOpacity
            onPress={() => cerrarModal()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 50,
              height: 50,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fontisto name="close" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 6 }}>
          {dataEmpresas != null &&
          dataEmpresas.map((prop, index) => (
            <View
              key={index}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: 10,
                marginHorizontal: 8,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: colors.primary,
              }}
            >
              <TouchableOpacity  onPress={()=>selectPrincipalNumber(index)}>
                <View
                  style={{
                    flex: -.5,
                    backgroundColor: "transparent",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <AntDesign
                    name="user"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: theme.colors.letras,
                      fontWeight: "bold",
                    }}
                  >
                    {prop.comercio}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: theme.colors.letras,
                      fontWeight: "bold",
                    }}
                  >
                    {changenumber(prop.cargador)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View
          style={{
            zIndex: 1,
            width: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            bottom: 0,
            paddingHorizontal: 10,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              elevation: 2,
              height: 55,
              width: "50%",
              backgroundColor: colors.button,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "white",
              marginTop: 10,
            }}
            onPress={() => props.navigation.push("CellValidation")}
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
                Agregar Bodega
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});
