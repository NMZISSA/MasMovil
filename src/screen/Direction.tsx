import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Alert, Text, View, Modal, Pressable, StyleSheet, Linking, Image, TextInput,  Dimensions,TouchableOpacity} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaView,SafeAreaProvider,} from "react-native-safe-area-context";
import WebView from "react-native-webview";
import {captureRef} from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Deudas } from "../class/lDeudas";
import LottieLoader, { initialLottieProps, playAnimation, pauseAnimation } from '../components/LottieLoader/LottieLoader';
import { colors } from "../constans";
import { images } from "../constans";
import { setvisible } from "../redux/ActionCreators/TabVisible";
import UserStackNavigation from "../navigation/stack/UserStackNavigation";
// import {ModalPickerProvince} from '../modals/ModalPickerProvince'
// import {ModalPickerDepartment} from '../modals/ModalPickerDepartment'
// import {ModalPickerDistrict} from '../modals/ModalPickerDistrict'
import Ionicons from "react-native-vector-icons/Ionicons"
import { PostSmsMensaje } from "../services"; 
import { getProvince,getDepartaments,getDistrict } from "../services";
import { guardarDatoJSON, recuperarDato } from "../utils/storage";

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
      txt:colors.txt,
      href:colors.href,
    },
    fonts: {
      //medium: 'lm3',
      //regular: 'lm3',
      //light: 'lm3',
      //thin: 'lm3'
    },
  };

export default function Direction ({route, navigation}){
    const [conti,setConti] = useState(true);
    const [habil,setHabil]=useState(false);
    const [userWeb,setUserWeb]=useState('DCTBOD22354');
    const [renv, setRenv] = useState(true);
    const [cod,setCod] = useState(false);
    const [isValid,setIsValid]=useState(true);
    const [modalProvince,setModalProvince] = useState(false);
    const [modalDepartment,setModalDepartment] = useState(false);
    const [modalDistrict,setModalDistrict] = useState(false);
    const [direccion,setDireccion] = useState('');
    const [referencia,setReferencia] = useState('');
    const [provincia,setProvincia]=useState('Provincia');
    const [departamento,setDepartamento]=useState('Departamento');
    const [distrito,setDistrito]=useState('Distrito');
    const [ubigeo,setUbigeo] = useState('')
    const [number_color, setNumberColor] = useState("red");
    const {userbd} = route.params
    const codUbi = userbd.resultado[0].Cod_Ubigeo;
    let cdep = codUbi.slice(0,-4)
    let cpro = codUbi.slice(2,-2)

    const [tCel, setTCel] = useState(120)
    const [tEmail, setTEmail] = useState(120)

    const [time,setTime]=useState(20);
    const [startTimer,setStartTimer]=useState(false);

    function continuar(){
        if (
            direccion != '' && referencia != '' && departamento != 'departamento' && provincia != 'provincia' && distrito != 'distrito'
        ) {
            setConti(false)
            
        }
        else{
            Alert.alert('Campos Requeridos','Complete todos los campos por favor');
        }
    }
    
    
    
    let interval = useRef();

    useEffect(() => {
        setDireccion(userbd.resultado[0].Dir_Cliente)
        setReferencia(userbd.resultado[0].Ref_Cliente)
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


    async function getDepartments() {
        try {
            const url='http://localhost:3000/api/recargas/USP_PRI_DEPARTAMENTOS_TxDepartamentos'
            const response = await fetch(url,{
                method : 'GET'
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const ListDepartments= () => {
        const [isLoading,setIsLoading] = useState(true)
        const [departments,serDepartments] = useState([])

        useEffect(async function loadDepartments() {
            const response = await getDepartments()
            console.log(response)
            return response
        })
    }


    async function envDatos(dat) {
        await guardarDatoJSON('DIREC',dat);
    }

    const [datos,setDatos]=useState({direcc:'',refe:'',ubi:''});
    const asignar =()=>{
        setDatos({direcc:direccion,refe:referencia,ubi:ubigeo})
    }

//==========================================================================================================================
const [district,setDistrict]=useState([]);
const [ubig,setUbig]=useState([]);
const [prov,setProv] = useState('000');
let distri;
let mapDis = new Map<string, string>() 

async function District(codD,codP) {
    var codigo={Cod_Departamento:codD,Cod_Provincia:codP}
    const response = await getDistrict(codigo)
    distri =response.resultado     
    // console.log(distri)
    for (var value in distri) {  
        mapDis.set(value,distri[value])  
        }  
    for (let i = 0; i < mapDis.size; i++) {
        const element = distri[i];
        district.push(element.Distrito)

        ubig.push(element.Ubigeo)
    }
    console.log(mapDis.size)
    console.log(district)
    console.log(ubig)
}

async function DistCarga() {
    var codigo={Cod_Departamento:cdep,Cod_Provincia:cpro}
    const response = await getDistrict(codigo)
    const districarga =response.resultado
    
    for (var value in districarga) {  
        mapDe.set(value,districarga[value])  
    } 

    for (let i = 0; i <= mapDe.size; i++) {
        if (codUbi == districarga[i].Ubigeo) {
            setDistrito(districarga[i].Distrito)
        }
    }     
}


//==========================================================================================================================

    const [province,setProvince] = useState([]);
    const [dpto,setDpto]=useState('')
    let provi;
    let map = new Map<string, string>() 

    async function Provin(cod) {
        var codigo={Cod_Departamento:cod}
        const response = await getProvince(codigo)
        provi =response.resultado     

        for (var value in provi) {  
            map.set(value,provi[value])  
            }  

        for (let i = 0; i < map.size; i++) {
            const element = provi[i];
            province.push(element.Provincia)
        }
        
        console.log(map.size)
        console.log(map)
        console.log(province)
    }

    function clear(){
        setProvince([]);
    }

    async function ProvCarga() {
        var codigo={Cod_Departamento:cdep}
        const response = await getProvince(codigo)
        const provcarga =response.resultado  
        
        for (var value in provcarga) {  
            mapDe.set(value,provcarga[value])  
        } 

        for (let i = 0; i <= mapDe.size; i++) {
            if (cpro == provcarga[i].Cod) {
                setProvincia(provcarga[i].Provincia)
            }
        }  

    }
//=============================================================================================================================
    const [departs,setDeparts] = useState([]);
    const [cods,setCods] = useState(['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25']);
    let depar;
    let depcarga;
    let mapDe = new Map<string, string>() 

    async function Depar() {
        //setDdd(await getDepartaments())
        const response = await getDepartaments()
        depar =response.resultado  
        
            for (var value in depar) {  
                mapDe.set(value,depar[value])  
            }
            for (let i = 0; i <= mapDe.size; i++) {
                const element = depar[i];
                departs.push(element.Departamento)
            }
            console.log(mapDe.size)
        }         

    async function DeparCarga() {
        const response = await getDepartaments()
        const depcarga =response.resultado  
        
        for (var value in depcarga) {  
            mapDe.set(value,depcarga[value])  
        } 

        for (let i = 0; i <= mapDe.size; i++) {
            if (cdep == depcarga[i].Cod) {
                setDepartamento(depcarga[i].Departamento)
            }
        }  
    }


    function cd(a){
        const x = cods[a]
        return x
    }
    useEffect(() => {
        // DeparCarga()
        Depar()   
        // DistCarga()        
        // ProvCarga()    
              
    },[])



//=============================================================================================================================

//=============================================================================================================================
    return(
        <PaperProvider theme={theme}>
            <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
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
                        Dirección
                    </Text>
                </View>
                <View
                    style={{marginTop:1,justifyContent:'space-around',flexDirection:'column', }}
                >
                    
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Dirección:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                            <TextInput 
                                style={styles.textInput}
                                placeholder={'Referencia'}
                                selectTextOnFocus={true}
                                onChangeText={(direccion)=>{setDireccion(direccion)}}
                                onEndEditing={()=>{setDireccion(direccion)}}
                                defaultValue={direccion}
                                value={direccion}>
                            </TextInput>
                        </View>
                    </View>

                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Referencia:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                            <TextInput 
                               style={styles.textInput}
                               placeholder={'Referencia'}
                               selectTextOnFocus={true}
                               onChangeText={(referencia)=>{setReferencia(referencia)}}
                               onEndEditing={()=>{setReferencia(referencia)}}
                               defaultValue={referencia}
                               value={referencia}>

                            </TextInput>
                        </View>
                    </View>

{/*======================================================================================================================================================================*/}
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Departamento:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TouchableOpacity 
                            style={styles.bun}
                            onPress={()=>{setModalDepartment(!modalDepartment)}}
                        >
                            <Text style={{paddingTop:10, color:'gray'}}>{departamento}</Text>
                            <Ionicons
                                style={{ position: "absolute", top: 6, right: 10 }}
                                name={"chevron-down-circle"}
                                size={25}
                                color={number_color}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>

                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={modalDepartment}
                            onRequestClose={()=>{setModalDepartment(!modalDepartment)}}
                        >
                            <TouchableOpacity
                                onPress = {()=>{setModalDepartment(!modalDepartment)}}
                                style= {styles.ccontainer}
                            >
                                <View style={[styles.modal,{width: WIDTH-20, height:HEIGHT/2}]}>
                                    <ScrollView>
                                        {departs.map((item,index)=>(
                                            
                                                <TouchableOpacity
                                                    style={styles.option}
                                                    key={index}
                                                    onPress={()=>{console.log(cd(index)),setModalDepartment(!modalDepartment)}}
                                                    onPressIn={()=>{setProvince([]),setDistrict([])}}
                                                    onPressOut={()=>{setDepartamento(item),Provin(cd(index)),setDpto(cd(index))}}
                                                >
                                                    <Text style={styles.text}>
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        )}
                                    </ScrollView>
                                </View>
                                </TouchableOpacity>
                        </Modal>

{/*=======================================================================================================================================================================*/}
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Provincia:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TouchableOpacity 
                            style={styles.bun}
                            onPress={()=>{setModalProvince(!modalProvince)}}
                        >
                            <Text style={{paddingTop:10, color:'gray'}}>{provincia}</Text>
                            <Ionicons
                                style={{ position: "absolute", top: 6, right: 10 }}
                                name={"chevron-down-circle"}
                                size={25}
                                color={number_color}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>

                        <Modal
                           transparent={true}
                           animationType='fade'
                           visible={modalProvince}
                           onRequestClose={()=>{setModalProvince(!modalProvince)}}
                        >
                            <TouchableOpacity
                                onPress = {()=>{setModalProvince(!modalProvince)}}
                                style= {styles.ccontainer}
                            >
                                <View style={[styles.modal,{width: WIDTH-20, height:HEIGHT/2}]}>
                                    <ScrollView>
                                        {province.map((item,index)=>{
                                            return(
                                                <TouchableOpacity
                                                    style={styles.option}
                                                    key={index}
                                                    onPress={()=>{setModalProvince(!modalProvince)}}
                                                    onPressIn={()=>{setDistrict([])}}
                                                    onPressOut={()=>{setProvincia(item),District(dpto,cd(index))}}
                                                >
                                                    <Text style={styles.text}>
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                             </TouchableOpacity>
                        </Modal>
                    
{/*======================================================================================================================================================================*/}
                    <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Distrito:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TouchableOpacity 
                            style={styles.bun}
                            onPress={()=>{setModalDistrict(!modalDistrict)}}
                        >
                            <Text style={{paddingTop:10, color:'gray'}}>{distrito}</Text>
                            <Ionicons
                                style={{ position: "absolute", top: 6, right: 10 }}
                                name={"chevron-down-circle"}
                                size={25}
                                color={number_color}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                        <Modal
                           transparent={true}
                           animationType='fade'
                           visible={modalDistrict}
                           onRequestClose={()=>{setModalDistrict(!modalDistrict)}}
                        >
                            <TouchableOpacity
                                onPress = {()=>{setModalDistrict(!modalDistrict)}}
                                style= {styles.ccontainer}
                            >
                                <View style={[styles.modal,{width: WIDTH-20, height:HEIGHT/2}]}>
                                    <ScrollView>
                                        {district.map((item,index)=>{
                                            return(
                                                <TouchableOpacity
                                                    style={styles.option}
                                                    key={index}
                                                    onPress={()=>{setDistrito(item),setUbigeo(ubig[index]),setModalDistrict(!modalDistrict),setTimeout(() => {
                                                        continuar()
                                                    }, 2000),setTimeout(()=>{setDatos({direcc:direccion,refe:referencia,ubi:ubig[index]})},2500)}}
                                                >
                                                    <Text style={styles.text}>
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                             </TouchableOpacity>
                        </Modal>
                    
{/*======================================================================================================================================================================*/}
                    {/* <View style={styles.conten1}>
                        <Text style={styles.textstyle}>Distrito:</Text>
                        <View style={{alignItems:'center',width:'100%'}}>
                        <TouchableOpacity 
                            style={styles.bun}
                            onPress={()=>{districtVisible(true)}}
                        >
                            <Text style={{paddingTop:10, color:'gray'}}>{distrito}</Text>
                            <Ionicons
                                style={{ position: "absolute", top: 6, right: 10 }}
                                name={"chevron-down-circle"}
                                size={25}
                                color={number_color}
                            />
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={modalDistrict} 
                            onRequestClose={()=>{districtVisible(false)}}
                            onShow={()=>{setTimeout(()=>{continuar()},4000)}}
                        >
                            <ModalPickerDistrict 
                                cambioVisible={districtVisible}
                                setData={setDataDi}
                            />
                        </Modal>
                        </View>
                    </View> */}

                    <View style={{
                        alignItems:"center",
                        paddingTop: 15
                        }}>
                        <TouchableOpacity 
                        style={[styles.btn,{ backgroundColor: !conti ? colors.button : '#C6C6C6'}]} 
                        disabled={conti}
                        onPress={()=>{navigation.navigate('UserWeb', {userbd:userbd}),envDatos(datos)}}
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
            </View>
        </PaperProvider> 
    );
}
const styles=StyleSheet.create({
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
        paddingLeft:15,
        color:'gray'
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
      bun: {
        borderRadius:5,
        minWidth:'89%',
        backgroundColor:'white',
        height:40,
        elevation:2,
        paddingLeft:15,
      },
      btn: {
        borderRadius:5,
        minWidth:'89%',
        backgroundColor:'red',
        height:40,
        elevation:2,
        paddingLeft:15,
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
      ccontainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    modal:{
        backgroundColor: 'white',
        borderRadius:10,
    },
    option:{
        alignItems:'flex-start',
    },
    text:{
        margin:20,
        fontSize:20,
        fontWeight:'bold'
    }
})