import React, {useRef,forwardRef,useImperativeHandle, useState, useEffect} from 'react';
import { Text, View,Dimensions,TouchableOpacity, Linking, } from 'react-native';
import Modal from 'react-native-modalbox'
import { DefaultTheme, TextInput,  } from 'react-native-paper';
import Fontisto from  'react-native-vector-icons/Fontisto'
import { colors } from '../../constans';
var screen = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedLottieView from 'lottie-react-native';


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
  const mRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      setCustomHeight(220);
      setCanTouch(true);      
      // setDataEmpresas(dDataEmpresas);
      mRef.current.open();
    },
  }));

  function cerrarModal() {
    mRef.current.close();
  }

   useEffect(() => {  
    // console.log(props);
    
  }, []);

  function CallNumber(numberContacto) {
    Linking.openURL(`tel:${numberContacto}`);
    cerrarModal();
  }
  function WhatNumber(numberContacto) {
    Linking.openURL(
      `whatsapp://send?text=Tengo un problemas con el Sistema=51${numberContacto}`,
    );
    cerrarModal();
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowRadius: 10,
        width: screen.width - 20,
        height: 250,
        marginBottom: 0,
      }}
      position='center'
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
            Contactanos
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
          <View style={{flexDirection: 'row', width: '100%'}}>
            <AnimatedLottieView
              speed={1}
              autoPlay
              loop
              source={require('../../../assets/45933-callcenter.json')}
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'transparent',
              }}
            />
            <View style={{paddingLeft: 10, width: '75%'}}>
              <Text style={{fontSize: 18, color:'black', textAlign: 'center'}}>          
                Nuestro Horario de trabajo es de lunes a viernes de 9:00 AM a
                6:00 PM.
              </Text>
              <Text style={{fontSize: 18, color:'black', textAlign: 'center'}}> Puede comunicarse con:</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', alignSelf:'center', paddingTop:15, justifyContent: 'space-evenly'}}>
            <View style={{paddingRight:30}}>
              <Text style={{fontSize: 20, color: 'red'}}>+51 984 708 998</Text>
              <View style={{flexDirection: 'row', alignSelf:'center'}}>
                <TouchableOpacity onPress={() => CallNumber('984708998')} style={{paddingRight:15,position:'relative'}}>
                  <Ionicons name="call" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => WhatNumber('984709076')}>
                  <Ionicons name="logo-whatsapp" size={30} color="green" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={{fontSize: 20, color: 'red'}}>+51 984 709 076</Text>
              <View style={{flexDirection: 'row',alignSelf:'center'}} >
                <TouchableOpacity onPress={() => CallNumber('984709076')} style={{paddingRight:15}}>
                  <Ionicons name="call" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => WhatNumber('984709076')} >
                  <Ionicons name="logo-whatsapp" size={30} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});
