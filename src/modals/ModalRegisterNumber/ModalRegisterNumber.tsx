import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { Modal } from "react-native-modalbox";
import Constants from 'expo-constants';

var screen = Dimensions.get('window');

export default forwardRef((props, ref) => {
    const [customHeight, setCustomHeight] = useState(0);
    const mRef = useRef()

    useImperativeHandle(ref, () => ({         
        openModal(){
        //    setMontoError(false)
        //    setCuantoPagasColor('black')
        //    setMontoColor('black')
           setCustomHeight(220)
        //    setCuantoPagas('')
        //    setTotalMaximo(total)
        //    alert(total)
            mRef.current.open()           
        },
        closeModal(){    
            mRef.current.close()           
        }
    }));

    function closeModal(){
        mRef.current.close()
    }

    useEffect(()=>{},[])
    return(
        <Modal
            ref = {mRef}
            style={{ alignItems:'center',
                    borderWidth: 0.2, elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    shadowRadius:10,width:screen.width-30,height:customHeight, marginBottom: 0, marginTop: Constants.statusBarHeight}}
            position={'center'} 
            backdrop={true}
            swipeToClose={false}
            backdropPressToClose={false}
            onClosed={()=>{
                //alert('Modal Close')  
            }}
            >
                <View>
                    <Text>{ 'Con cuanto pagas' }</Text>
                </View>
        </Modal>
    )
})