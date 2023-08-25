import React, { useState, useEffect, useRef }  from "react"
import { Alert, ImageBackground } from "react-native";
/*import dings from '../../assets/sounds/claro.mp3';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var ding = new Sound(dings, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
  );
});*/


export default ()=>{

  /*useEffect(() => {
    ding.setVolume(10);
    ding.release();
    return () => {
      ding.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    };
  }, []);*/

    return(

        <ImageBackground
        source={require('../../assets/MasMovil.png')}
        resizeMode={'contain'}
        style={{width: '100%', height: '100%', position: 'absolute', opacity: .8}}
        >
        </ImageBackground>
    )
}
