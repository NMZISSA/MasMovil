import React, { useState, useEffect, useRef } from 'react';
import { TextInput as TextIn,  Alert, Platform,Linking,Keyboard,AsyncStorage, StyleSheet, ActivityIndicator, Text, View ,ImageBackground,Image,Dimensions,TouchableOpacity,Header, StatusBar,KeyboardAvoidingView,ScrollView } from 'react-native';

import { List, Checkbox,Divider, TextInput, Button, HelperText,DefaultTheme,
   Provider as PaperProvider, FAB, Portal, Snackbar  } from 'react-native-paper';
var {width,height} = Dimensions.get('window')
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import { useFocusEffect } from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  dark : true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000', 
    accent: 'rgba(201,19,64,1)',//for the fab button 201 - 19 - 64 141 - 21 - 50
    
    //background: 'green',
    placeholder: '#00000080',// border color y placeholder
  },
  fonts: {
    //medium: 'lm3',
    //regular: 'lm3',
    //light: 'lm3',
    //thin: 'lm3'
  }
  
};

interface LottieProps {
    speed: number,
    color: string,
    lottiecolor: string,
    zindex: number
}

export default function Bienvenido({navigation}) {

    const [isShowed, setIsShowed] = useState(false)
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [snack_message, setSnackMsg] = useState('')
    const [can_touch, setCanTouch] = useState(true)
    const [correo_color, setCorreoColor] = useState('black')
    const [password_color, setPassColor] = useState('black')
    const [numero, setNumero] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const [checked, setChecked] = useState(false)

    async function guardarUserDataPidenos(userData) {
      
      navigation.navigate('Dashboard');
    }

    function login() {
      
      if(correo.length == 0 && password.length == 0) return;
      //this.setState({ visible: !this.state.visible })
      //return;
      if(can_touch) {
        //this.openModalRecuperarPass();
        //newUserLoginPTP2(correo.trim(), password);
        //this.socket.emit('chat message', this.state.password)
      }
      
    }   

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          console.log('The screen is focused login ')
          //StatusBar.setBarStyle('light-content');
          //StatusBar.setBackgroundColor('#333')
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            console.log('The screen is unfocused login')
            
            setCanTouch(true)  
          };
        }, [])
      );

    useEffect(()=>{
    },[])
  

    return(
      <PaperProvider>
          <KeyboardAvoidingView behavior="height"  style={{flex:1, backgroundColor: 'white',}}>
          
         
          <View style={{flex:1, backgroundColor: 'rgba(244,245,250,1)'}}>

            <View style={{ height:'20%', width:'100%', backgroundColor: 'rgba(244,245,250,1)', alignItems:'center', justifyContent:'center', marginTop: 10  }}>
                  {/* <Image style={{ height: 100, width: 150 }} source={require('../../../assets/shop.png')} resizeMode='contain'/> */}
                  {/* <Image style={{ height: 180, width: 180 }} source={images.secondaryLogo} resizeMode='contain'/> */}
            </View>

            
         
            <ScrollView  style={{height:undefined}} showsVerticalScrollIndicator={false}>
            
                 
                  <View style={{ marginHorizontal: 0, backgroundColor: 'rgba(244,245,250,1)', alignItems: 'center', paddingVertical: 15, }}>

                   
                    <View style={{ height: 50, width: '80%', marginBottom:20, marginTop: 7 }}>
                      <View>
                        <TextInput
                            placeholderTextColor = "red"
                            label='Celular'
                            mode='outlined'
                            multiline={false}
                            placeholder='Numero de celular'
                            keyboardType={"numeric"}
                            value={correo}
                            disabled={!can_touch}
                            onFocus={()=>setCorreoColor('#000000')}
                            onBlur={()=>setCorreoColor('#00000080')}
                            onChangeText={correo => setCorreo(correo)}
                            theme={{ colors: { text: 'black' } }}
                            style={{ backgroundColor: 'white' }}
                            render = { props => 
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
                            }
                           /* onSubmitEditing={ ()=> this.canLogin() }*/
                            
                        >          
                        </TextInput>
                        <MaterialIcons
                          style={{position: 'absolute',top: 20,right: 10}}
                          name={'person-outline'}
                          size={25}
                          color={correo_color}
                          
                        />
                      </View>
                    </View>    
                    
                  
                    <View style={{ height: 50, width: '80%', marginBottom:25 }}>
                      <View>
                        <TextInput
                           
                            label='Contraseña'
                            mode='outlined'
                            multiline={false}
                            placeholder='Contraseña'
                            value={password}
                            secureTextEntry={!isShowed}
                            disabled={!can_touch}
                            onFocus={()=>setPassColor('#000000')}
                            onBlur={()=>setPassColor('#00000080')}
                            onChangeText={password => setPassword(password)}
                            theme={{ colors: { text: 'black' } }}
                            style={{ backgroundColor: 'white' }}
                            /*onSubmitEditing={()=>this.canLogin()}*/
  
                            
                        >          
                        </TextInput>
                        <TouchableOpacity onPress={()=>setIsShowed(!isShowed)} style={{position: 'absolute',top: 20,right: 10, zIndex:1, padding:2}}>
                          <Ionicons
                            
                            name={!isShowed ? 'ios-eye-off':'ios-eye'}
                            size={25}
                            color={password_color}
                            
                          />
                        </TouchableOpacity>
                      </View>
                    </View> 

                    <View style={{ height: 50, width: '80%', marginBottom:0, flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => { setChecked(!checked); }}
                        />
                        <Text style={{ marginLeft: 15, /*fontFamily: 'lm3'*/ }}>Recuerda mis datos</Text>
                    </View>

                    
  
                    <TouchableOpacity style={{ elevation:5 , height: 55, width: '80%', backgroundColor: "blue", borderRadius: 10 , borderWidth: 1, borderColor: 'white', flexDirection: 'row', marginVertical: 20 }}
                        onPress={()=>login()}
                    >
                        
                        <View style={{ backgroundColor: 'transparent', flex:1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 13, color: 'white', fontWeight: 'bold' }}>INGRESAR</Text>
                        </View>
                        
                    </TouchableOpacity>

                 

                    <View style={{ marginTop: 20, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ /*fontFamily: 'lm3'*/ }}>¿ Erses usuario nuevo ?</Text>
                        <Text onPress={()=>navigation.navigate('ValidacionCelular')} style={{ /*fontFamily: 'lm3',*/ fontSize: 14, marginTop:5, color: "blue", textDecorationLine: 'underline' }}>Registrate</Text>
                    </View>
                    
                 
                    <View style={{ marginTop: 20, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ /*fontFamily: 'lm3'*/ }}>¿Olvidaste tu contrasenia?</Text>
                        <Text   style={{ /*fontFamily: 'lm3',*/ fontSize: 14, marginTop:5, color: "blue", textDecorationLine: 'underline' }}>Recuperelo aqui</Text>
                    </View>

                    <View style={{height:20, width:'100%'}}></View>
  
                 
  
                  </View>
               
  
              
            
            </ScrollView>
            <Text style={{ /*fontFamily: 'lm3'*/ ,textAlign: 'right', padding: 10, fontSize: 15}}>V 1.0</Text>
            </View>
            
            <Snackbar
            
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: 'OK',
              onPress: () => {
                // Do something
              },
            }}
          >
            {snack_message}
          </Snackbar>
            

         
          </KeyboardAvoidingView>
        </PaperProvider>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  