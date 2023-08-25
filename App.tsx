import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import LottieLoader from './src/components/LottieLoader';
import { initialLottieProps, pauseAnimation, playAnimation } from './src/components/LottieLoader/LottieLoader';
import MainAppContainer from './src/navigation';
import LoadingScreen from './src/screen/LoadingScreen';
import {LogBox} from "react-native";
import { checkForUpdates } from './src/utils/config';


export default function App() {
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function loadAll() {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#212121");
    playAnimation(setLottieProps);
    // await loadFonts();
    await checkForUpdates();
    // await guardarDatoJSON('DATA_INI', dDataEmpresas)
    // // await eliminarDatoJSON('DATA_INI')
    // let token = await registerForPushNotifications();
    // console.log(token);
    setTimeout(() => {
      setIsAllLoaded(true);
      pauseAnimation(setLottieProps);
    }, 0);
  }

  useEffect(() => {
    loadAll();  
    LogBox.ignoreLogs([
      "ViewPropTypes will be removed",
      "ColorPropType will be removed" 
    ])  
  }, []);

  if (!isAllLoaded)
    return (
      <View style={{ flex:1, backgroundColor: 'white' }}>
        <LottieLoader lottieProps={lottieProps} />
        <LoadingScreen />
      </View>
    );
  return (
     <MainAppContainer />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

