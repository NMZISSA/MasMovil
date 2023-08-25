import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { LottieProps } from "../../class/lottieProps";

export const initialLottieProps: LottieProps = {
  speed: 0,
  color: "transparent",
  lottiecolor: "transparent",
  zindex: 0,
};

export function pauseAnimation(setLottieProps) {
  setLottieProps({
    speed: 0,
    color: "transparent",
    lottiecolor: "transparent",
    zindex: 0,
  });
}

export function playAnimation(setLottieProps) {
  setLottieProps({
    speed: 1,
    color: "#E31F12",
    lottiecolor: "transparent", 
    zindex: 1,
  });
}

export default (props) => {
  const animation = useRef();
  const { zindex, speed, color, lottiecolor } = props.lottieProps;

  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <View style={{height:'100%', width:'100%', position:'absolute', left:0, top: 0, zIndex:zindex}}>

<View style={{height:'100%', width: '100%', backgroundColor: 'transparent', position: 'absolute', left:0, top:0}}>
            </View>
        
        <View style={{height:'100%', width: '100%', backgroundColor: 'transparent', position: 'absolute', left:0, top:0}}>

                <View style={{flex:1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                   
                      <LottieView
                          speed={speed}
                          ref={animation}
                          source={require('../../../assets/loading.json')}
                          style={{
                          width: 128,
                          height: 220,
                          backgroundColor: 'transparent'
                          }}
                      /> 
                 
                </View>
        </View>
    </View>
  );
};
