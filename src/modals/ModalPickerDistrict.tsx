import React,{useEffect,useState} from "react";
import {StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import { getDistrict } from "../services";
import { recuperarDato } from "../utils/storage";

const OPTIONS = ['San jeronimo','Wanchaq','Santiago','San Sebastian','etc..'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const ModalPickerDistrict = (props) =>{
    
    const onPressItem = (option) => {
        props.cambioVisible(false);
        props.setData(option);
    }
    
    async function traerDistric() {
        setDpto(await recuperarDato('DPTO'))
      }
    
    function timer(){
        setTimeout(() => {
            District(dpto,prov)
        }, 2000);
    }
      useEffect(()=>{
        //traerDepto()   
        District('15','01')
      },[])    


    const [district,setDistrict]=useState([]);
    const [prov,setProv] = useState('000');
    const [dpto,setDpto]=useState('123')
    let distri;
    let map = new Map<string, string>() 

    async function District(codD,codP) {
        var codigo={Cod_Departamento:codD,Cod_Provincia:codP}
        const response = await getDistrict(codigo)
        distri =response.resultado     
        console.log(distri)
        for (var value in distri) {  
            map.set(value,distri[value])  
            }  

        for (let i = 0; i < map.size; i++) {
            const element = distri[i];
            setDistrict([...district,element.Distrito[i]])
            district.push(element.Distrito)
        }
        console.log(map.size)
        console.log(map)
        console.log(district)
    }


    const option = district.map((item,index)=>{
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
            onPress = {()=> props.cambioVisible(false)}
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
export {ModalPickerDistrict}