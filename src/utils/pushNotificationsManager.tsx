import React from 'react';
import {Platform, View, Alert} from 'react-native';
import {Notifications} from 'react-native-notifications';
import { guardarDatoJSON } from './storage';
// import { guardarDatoJSON } from './src/utils/Storage';

export default class PushNotificationManager extends React.Component {
  componentDidMount() {
    console.log('entro');
    // this.registerNotificationEvents();
    this.registerDevice();
    //this.registerNotificationEvents();
  }

  async guardarToken(token: any) {
    var data = {
      'token_celular': token
    }
    console.log(data);
    
    await guardarDatoJSON('token', data);
  }

  registerDevice = () => {
    console.log('entrosss');    
    Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
      console.log(event.deviceToken);
    });
    // Notifications.events().registerRemoteNotificationsRegistrationFailed(
    //   (event) => {
    //     console.error(event);
    //   },
    // );

    // Notifications.registerRemoteNotifications();
  };

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.

        const date = new Date(Date.now() + 20 * (1 + 1) * 1000);

        const notificationData = {
          title: 'Local Notification',
          body: 'This is notificationg enrated by app',
          silent: true,
          userInfo: {},
          fireDate: date,
        };

        Notifications.postLocalNotification(
          notificationData,
          Math.floor(Math.random() * 100),
        );


        completion({alert: false, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened by device user', notification);
        console.log(
          `Notification opened with an action identifier: ${notification.identifier}`,
        );
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.getInitialNotification()
      .then((notification) => {
        console.log('Initial notification was:', notification || 'N/A');
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));
  };

  render() {
    const {children} = this.props;
    return <View style={{flex: 1}}>{children}</View>;
  }
}
