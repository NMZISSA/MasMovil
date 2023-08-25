import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Text, View, Modal, Pressable, StyleSheet, Linking, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { DefaultTheme, Provider } from "react-native-paper";
import { SafeAreaView,SafeAreaProvider,} from "react-native-safe-area-context";
import WebView from "react-native-webview";
import {captureRef} from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Deudas } from "../class/lDeudas";
import LottieLoader, { initialLottieProps, playAnimation, pauseAnimation } from '../components/LottieLoader/LottieLoader';
import { colors } from "../constans";
import { images } from "../constans";

const theme = {
    ...DefaultTheme,
    roundness: 10,
    dark: true,      
    colors: {
      ...DefaultTheme.colors,    
      accent: colors.primary, //for the fab button 201 - 19 - 64 141 - 21 - 50
      background: "#F4F5FA",
      placeholder: "#00000080", // border color y placeholder
      button: colors.button,
      letras: "#666666",
    },
    fonts: {
      //medium: 'lm3',
      //regular: 'lm3',
      //light: 'lm3',
      //thin: 'lm3'
    },
  };

export default function Registration ({navigation}){
    const [isValid,setIsValid]=useState(true);
    const [pin,setPin]=useState('○○○○');
    const [userWeb,setUserWeb]=useState('DCTBOD22354');
    return(
        <SafeAreaView   style={{
            flex: 1,
            flexWrap: 'nowrap',
            flexDirection: 'row',
            width: '100%',
          }}>
            <ScrollView>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text
                        style={{
                        backgroundColor: "transparent",
                        textAlign: "center",
                        /*fontFamily: "lm3",*/
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        fontWeight: "bold",
                        color: colors.primary,
                        fontSize: 30,
                        }}
                    >
                        USUARIO
                    </Text>
                    <TouchableOpacity 
                    style={{
                        height:40,                 
                        marginTop:10,
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
                    </TouchableOpacity>
                </View>
                <View
                    style={{marginTop:1,justifyContent:'space-around',flexDirection:'column', }}
                >
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Nombre Comercial:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                            <TextInput 
                                style={styles.textInput}
                                placeholder={'Nombre del Comercio'}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>DNI o Pasaporte:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder={'DNI O Pasaporte'}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                    <Text style={styles.textstyle}>Nombre:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder={'Nombre'}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                    <Text style={styles.textstyle}>Celular de Contacto:</Text>
                    <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:37}}>
                            <TextInput 
                                style={[styles.textInput,{width:'60%',marginRight:5}]}
                                placeholder={'Nro Celular'}>
                            </TextInput>
                            <TouchableOpacity
                                disabled={isValid}
                                style={{
                                minWidth: "19%",
                                height: 40,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 10,
                                backgroundColor: !isValid ? colors.button : '#C6C6C6',
                                elevation: 2
                            }}>
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
                                        Confirmar
                                    </Text>
                                </View>
                            </TouchableOpacity>   
                        </View>
                        <View style={{alignItems:'center', width:'100%',flexDirection:'row',marginLeft:37}}>
                            <TextInput 
                            style={[styles.textInput,{marginTop:10,width:'40%',marginRight:20}]}
                            placeholder={'Ingrese Código'}
                            ></TextInput>
                            <Pressable
                            >
                                <Text style={{marginTop:15}}>Reenviar código</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                    <Text style={styles.textstyle}>Correo Electrónico</Text>
                        <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:37}}>
                            <TextInput 
                                style={[styles.textInput,{width:'60%',marginRight:5}]}
                                placeholder={'Email'}>
                            </TextInput>
                            <TouchableOpacity
                                disabled={isValid}
                                style={{
                                minWidth: "19%",
                                height: 40,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 10,
                                backgroundColor: !isValid ? colors.button : '#C6C6C6',
                                elevation: 2
                            }}>
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
                                        Confirmar
                                    </Text>
                                </View>
                            </TouchableOpacity>   
                        </View>
                        <View style={{alignItems:'center', width:'100%',flexDirection:'row',marginLeft:37}}>
                            <TextInput 
                            style={[styles.textInput,{marginTop:10,width:'40%',marginRight:20}]}
                            placeholder={'Ingrese Código'}
                            ></TextInput>
                            <Pressable
                            >
                                <Text style={{marginTop:15}}>Reenviar código</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.conten1}>
                        <View style={{ 
                            flexDirection:'row', 
                            alignItems:'flex-start',
                            width:'100%',}}>
                            <Text style={styles.textstyle}>Usuario Web:</Text><Text style={styles.textstyle}>{userWeb}</Text>
                        </View>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder={'Contraseña'}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={{ 
                        flexDirection:'row', 
                        alignItems:'flex-start',
                        width:'100%',
                        marginTop:20}}>
                        <Text style={[styles.textstyle]}>PIN Claro:</Text> 
                        <Text style={[styles.textstyle]}>{pin}</Text> 
                    </View>
                </View>
                <View><Text>   </Text></View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    textstyle:{
        marginLeft:20,
        fontSize:13,
        marginBottom:5
    },
    textInput:{
        borderRadius:5,
        width:'80%',
        backgroundColor:'white',
        height:40,
        // borderWidth:0.4,
        // borderColor:'#c9c9c9',
        elevation:2,
        paddingLeft:15
    },
    conten1:{
        flexDirection:'column', 
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:'100%',
        marginTop:20
    }
})