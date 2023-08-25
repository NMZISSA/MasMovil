import React, {useCallback, useEffect,useState} from "react";
import {StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import { getDepartaments } from "../services";
import { guardarDato,recuperarDato } from "../utils/storage";

const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;
const ModalPickerDepartment = (props) =>{

    const onPressItem = (option) => {
        props.cambioVisible(false);
        props.setData(option);
    }

    const [ddd,setDdd] = useState({});
    const [departs,setDeparts] = useState([]);
    const [cods,setCods] = useState(['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25']);
    let depar;
    let map = new Map<string, string>() 

    async function Depar() {
        //setDdd(await getDepartaments())
        
        const response = await getDepartaments()
        depar =response.resultado     
        //console.log(depar);

        for (var value in depar) {  
            map.set(value,depar[value])  
            }  

        for (let i = 0; i <= map.size; i++) {
            const element = depar[i];
            setDeparts([...departs,element.Departamento[i]])
            departs.push(element.Departamento)
        }
        console.log(map.size)
        
    }

    async function envCod(cod) {
        await guardarDato('DPTO',cod.toString());
    }

    useEffect(() => {
        Depar()
    },[])

    const [codigo,setCodigo]=useState('');
    const option = departs.map((item,index)=>{
        const x = cods[index]
        return(
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={()=>{onPressItem(item),envCod(x),console.log(x)}}
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

const dep01 = React.createContext({ 
    codD: recuperarDato('DPTO')    
  });

export {ModalPickerDepartment,dep01}

