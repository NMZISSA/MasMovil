import React, {useState,useEffect,useImperativeHandle, useMemo} from "react";
import {StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import { getProvince } from "../services";
import { recuperarDato } from "../utils/storage";

const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const ModalPickerProvince = (props) =>{
    
    const onPressItem = (option) => {
        props.cambioVisible(false);
        props.setData(option);
    }
    
    async function traerDepto() {
        setDpto(await recuperarDato('DPTO'))
      }
    
    function timer(){
        setTimeout(() => {
            Provin(dpto)
        }, 2000);
    }
      useEffect(()=>{
        traerDepto()   
       // console.log(dpto)
//        Provin('15')
      },[])    

      useMemo(()=>{
        console.log(dpto)
        //Provin(dpto)
      },[])    

    const [province,setProvince] = useState([]);
    const [dpto,setDpto]=useState('84646')
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
            setProvince([...province,element.Provincia[i]])
            province.push(element.Provincia)
        }
        console.log(map.size)
        console.log(map)
        console.log(province)
    }

    const option = province.map((item,index)=>{
        return(
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={()=>{onPressItem(item)}}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })


    return(
        <TouchableOpacity
            onPress = {()=>{ props.cambioVisible(false)}}
            style= {styles.container}
        >
            <View style={[styles.modal,{width: WIDTH-20, height:HEIGHT/2}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
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
export {ModalPickerProvince}