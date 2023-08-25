import * as Notifications from 'expo-notifications'
import * as Updates from 'expo-updates'
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

export async function loadFonts() {
  await Font.loadAsync({
    'lm1':require('../../assets/fonts/Montserrat-Light.ttf'),
    'lm2':require('../../assets/fonts/Montserrat-Regular.ttf'),
    'lm3':require('../../assets/fonts/Montserrat-Medium.ttf'),
    'UberMoveMedium': require('../../assets/fonts/UberMoveMedium.ttf'),
    'UberMoveRegular': require('../../assets/fonts/UberMoveRegular.ttf'),
  });
}
export async function registerForPushNotifications() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          'Mas Movil',
          'Tenemos una nueva version para ti!! 😀',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
    }
}

export const handleNotificationData = notification => {
    let { origin, data } = notification;
    var msg = "";
    if(data.cnombres.length == 0) {
      msg = data.cmensaje;
    } else {
      msg = data.cnombres + " : " + data.cmensaje
    } 
  
    Alert.alert(
      data.ctitulo,
      msg,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
    //this.playSound();  
} 