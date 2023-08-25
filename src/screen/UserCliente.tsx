import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState, useRef} from 'react';
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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Snackbar,
  TextInput as TxtInput,
} from 'react-native-paper';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LottieLoader, {
  initialLottieProps,
  playAnimation,
  pauseAnimation,
} from '../components/LottieLoader/LottieLoader';
import {colors, version} from '../constans';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Clientes} from '../class/IClientes';
import {recuperarDatoJSON} from '../utils/storage';
import { Post } from '../services';
import { IRespuesta } from '../class/IRespuesta';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    accent: colors.primary, //for the fab button 201 - 19 - 64 141 - 21 - 50
    background: '#F4F5FA',
    placeholder: '#00000080', // border color y placeholder
    button: colors.button,
    letras: '#666666',
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  },
};

const userCliente: Clientes = null;
const userVendedor: Clientes = null;

export default function UserCliente({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const [cliente, setCliente] = useState(userCliente);
  const [vendedor, setVendedor] = useState(userVendedor);
  const [visiblePwd, setVisiblePwd] = useState(true);
  const [visiblePIN, setVisiblePIN] = useState(true);
  const [edit, onEdit] = useState(false)
  const [comercio, setComercio] = useState('')
  const [direccion, setDireccion] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [pin, setPin] = useState('')
  const [visiblesb, setVisiblesb] = useState(false)
  const [snack_message, setSnackMsg] = useState('')

  async function traerData() {
    setCliente(await recuperarDatoJSON('LOGIN'));
    setVendedor(await recuperarDatoJSON('VENDEDOR'));
  }

  useEffect(() => {
    traerData();
      
  }, []);

  function actualizarCargador(){
    onEdit(!edit)
    var DatosClienteMovil: Clientes = {
      Cargador: cliente.Cargador,
      Des_Cliente: comercio,
      Dir_Cliente: direccion,
      Ref_Cliente: cliente.Ref_Cliente,
      Cod_Ubigeo: cliente.Cod_Ubigeo,
      Latitud: cliente.Latitud,
      Longitud: cliente.Longitud,
      DNI_Contacto: cliente.DNI_Contacto,
      Nombre_Contacto: cliente.Nombre_Contacto,
      Celular_Contacto: cliente.Celular_Contacto,
      Email_Contacto: cliente.Email_Contacto,
      CuentaWeb: cliente.CuentaWeb,
      Contraseña: contraseña,
      PIN_Claro: pin,
      PIN: cliente.PIN,
    }
    console.log(DatosClienteMovil);
    
    setVisiblesb(true)
    Post('USP_CRL_DATOS_CLIENTES_G_MOVIL',DatosClienteMovil).then((data: IRespuesta)=>{
      // Alert.alert(JSON.stringify(data))
      setSnackMsg('¡ Datos Actualizados !')
    }).catch((e)=>{
      // alert(e)
    })
  }

  useEffect(()=>{setComercio(cliente == null ? '' : cliente.Des_Cliente);
  setDireccion(cliente == null ? '' : cliente.Dir_Cliente);
  setContraseña(cliente == null ? '' : cliente.Contraseña);
  setPin(cliente == null ? '' : cliente.PIN_Claro); 
  }, [cliente])

  return (
    <PaperProvider theme={theme}>      
      <ScrollView>
        <View style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>        
          <View style={{flexDirection:'row', justifyContent: "space-between" }}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Cargador
            </Text>
            {edit ? <TouchableOpacity
               onPress={() => actualizarCargador()}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <FontAwesome name="save" color={'red'} size={25} />
                <Text style={{fontSize: 20, marginLeft: 5, color: 'red'}}>
                  Guardar
                </Text>
              </View>
            </TouchableOpacity> : 
            <TouchableOpacity
                onPress={() => onEdit(!edit)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 15,
                }}>
                <FontAwesome name="pencil-square-o" color={'red'} size={25} />
                <Text style={{fontSize: 20, marginLeft: 5, color: 'red'}}>
                  Editar
                </Text>
              </View>
            </TouchableOpacity>
            }
          </View>
          <View>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.Cargador}
              editable={false}></TextInput>
          </View>
        </View>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Comercio
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              defaultValue={comercio}
              value={comercio}
              onChangeText={(comercio)=>{setComercio(comercio)}}
              editable={edit}></TextInput>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Direccion
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={direccion}
              defaultValue={direccion}
              onChangeText={(direccion)=>{setDireccion(direccion)}}
              editable={edit}></TextInput>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              DNI
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.DNI_Contacto}
              editable={false}></TextInput>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Encargado
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.Nombre_Contacto}
              editable={false}></TextInput>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Celular
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.Celular_Contacto}
              editable={false}></TextInput>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              E-mail
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.Email_Contacto}
              editable={false}></TextInput>
          </View>

          {/* <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Cuenta Claro
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={cliente == null ? '' : cliente.CuentaWeb}
              editable={false}></TextInput>
          </View>
           <View style={{marginTop: 10}}> 
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Contraseña
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 10,
                  width: '90%',
                }}
                secureTextEntry={visiblePwd}
                value={contraseña}
                defaultValue={contraseña}
                onChangeText={(contraseña)=>{setContraseña(contraseña)}}                
                editable={edit}></TextInput>
              <TouchableOpacity onPress={() => setVisiblePwd(!visiblePwd)}>
                <Ionicons name={!visiblePwd ? 'eye-off' : 'eye'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Pin
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  width: '90%',
                }}
                secureTextEntry={visiblePIN}
                value={pin}
                defaultValue={pin}
                onChangeText={(pin)=>{setPin(pin)}}
                editable={edit}></TextInput>
              <TouchableOpacity onPress={() => setVisiblePIN(!visiblePIN)}>
                <Ionicons name={!visiblePIN ? 'eye-off' : 'eye'} size={25} />
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 15}}>
              Vendedor
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              }}
              value={vendedor == null ? '' : vendedor.Nombre_Contacto}
              editable={false}></TextInput>
          </View>
        </View> 
      </ScrollView>
      <View style={{zIndex:1,backgroundColor:'transparent', flexDirection:'row-reverse', paddingHorizontal:10, paddingBottom:0}}>
          <Text>{version}</Text>
      </View>
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
  textstyle: {
    marginLeft: 20,
    fontSize: 13,
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white',
    height: 40,
    // borderWidth:0.4,
    // borderColor:'#c9c9c9',
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
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
