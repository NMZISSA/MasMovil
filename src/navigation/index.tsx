import React, {useEffect, useRef, useState} from 'react';
import {Text, View, Image, ImageComponent} from 'react-native';
import {
  initialLottieProps,
  pauseAnimation,
  playAnimation,
} from '../components/LottieLoader/LottieLoader';
import LottieLoader from '../components/LottieLoader';
import LoadingScreen from '../screen/LoadingScreen';
import {recuperarDatoJSON} from '../utils/storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Validation from '../screen/Validation';
import CellValidation from '../screen/CellValidation';
import {colors} from '../constans';
import Dashboard from '../screen/Dashboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MainStackNavigation from './stack/MainStackNavigation';
import RechargeStackNavigation from './stack/RechargeStackNavigation';
import CollectionsStackNavigation from './stack/CollectionsStackNavigation';
import PaymentsStackNavigationc from './stack/PaymentsStackNavigationc';
import UserStackNavigation from './stack/UserStackNavigation';
import User from '../screen/User';
import Verificacion from '../screen/Verification';
import Direction from '../screen/Direction';
import DirectionMap from '../screen/DirectionMap';
import EntryValidation from '../screen/EntryValidation';
import UserWeb from '../screen/UserWeb';
import Revalidation from '../screen/Revalidation';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Direccion from '../screen/Direccion';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSupport from '../modals/ModalSupport';
import PasswordChange from '../screen/PasswordChange';
import ChangePinSms from '../screen/ChangePinSms';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function isUserLoggedIn() {
  var res = await recuperarDatoJSON('login');
  return res;
}

function AppTabNavigator({navigation}) {
  const [loading, setLoading] = useState(true);
  const [lottieProps, setLottieProps] = useState(initialLottieProps);

  useEffect(() => {
    setLoading(false);
    playAnimation(setLottieProps);
  }, []);
  
  if (loading)
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <LottieLoader lottieProps={lottieProps} />
        <LoadingScreen />
      </View>
    );

  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        initialRouteName="PrincipalStack"
        screenOptions={{
          tabBarActiveTintColor: '#ff0000',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            backgroundColor: 'white',
            height: 55,
            paddingBottom: 1,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="PrincipalStack"
          component={MainStackNavigation}
          options={{
            headerShown: true,
            headerTitleContainerStyle: {width: '100%'},
            headerTitle: () => (
              <Image
                style={{width: '100%', height: '70%'}}
                source={require('../../assets/cabecera-blanca.png')}
              />
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                style={{marginTop: 0}}
                name="home-outline"
                color={color}
                size={23}
              />
            ),
            tabBarLabel: ({color, focused}) => (
              <Text
                style={{
                  color: color,
                  marginBottom: 0,
                  fontSize: 11,
                  /*fontFamily: 'lm3',*/
                }}>
                Inicio
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="RechargeStack"
          component={RechargeStackNavigation}
          options={{
            headerShown: true,
            headerTitleContainerStyle: {width: '100%'},
            headerTitle: () => (
              <Image
                style={{width: '100%', height: '70%'}}
                source={require('../../assets/cabecera-blanca.png')}
              />
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                style={{marginTop: 0}}
                name="cellphone"
                color={color}
                size={23}
              />
            ),
            tabBarLabel: ({color, focused}) => (
              <Text
                style={{
                  color: color,
                  marginBottom: 0,
                  fontSize: 11,
                  /*fontFamily: 'lm3',*/
                }}>
                Recargas
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="CollectionsStack"
          component={CollectionsStackNavigation}
          options={{
            headerShown: true,
            headerTitleContainerStyle: {width: '100%'},
            headerTitle: () => (
              <Image
                style={{width: '100%', height: '70%'}}
                source={require('../../assets/cabecera-blanca.png')}
              />
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                style={{marginTop: 0}}
                name="hand-coin"
                color={color}
                size={23}
              />
            ),
            tabBarLabel: ({color, focused}) => (
              <Text
                style={{
                  color: color,
                  marginBottom: 0,
                  fontSize: 11,
                  /*fontFamily: 'lm3',*/
                }}>
                Recaudación
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="UserStack"
          component={UserStackNavigation}
          options={{
            headerShown: true,
            headerTitleContainerStyle: {width: '100%'},
            headerTitle: () => (
              <Image
                style={{width: '100%', height: '70%'}}
                source={require('../../assets/cabecera-blanca.png')}
              />
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTitleStyle: {
              color: 'white',
            },
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                style={{marginTop: 0}}
                name="account"
                color={color}
                size={23}
              />
            ),
            tabBarLabel: ({color, focused}) => (
              <Text
                style={{
                  color: color,
                  marginBottom: 0,
                  fontSize: 11,
                  /*fontFamily: 'lm3',*/
                }}>
                Usuario
              </Text>
            ),
          }}
        />
        {/* <Tab.Screen
          name='PaymentsStack'
          component={PaymentsStackNavigationc}
          options={{
            headerShown: true,
            headerTitle:'Datos Personales',
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:'red',
            },
            headerTitleStyle:{
              color:'white'
            },
            tabBarIcon:({ color })=>(
              <MaterialCommunityIcons style={{ marginTop: 0 }} name='door-closed' color={color} size={23}/>
            ),
            tabBarLabel: ({ color, focused })=>(
              <Text style={{ color: color, marginBottom: 0, fontSize: 11, fontFamily: 'lm3'  }}>Cerrar Sesión</Text>
            )
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
}

export default function MainAppContainer() {
  const [lottieProps, setLottieProps] = useState(initialLottieProps);
  const data = 1;
  const modalSupportref = useRef();


  useEffect(() => {
    playAnimation(setLottieProps);
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await isUserLoggedIn();
      } catch (e) {}
      pauseAnimation(setLottieProps);
    };
    bootstrapAsync();
  }, []);

  function openModalSupport() {
    modalSupportref.current.openModal()
  }

  return (
    <View style={{flex: 1}}>
      <PaperProvider>
        <NavigationContainer>
          <ModalSupport ref={modalSupportref}/>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{
                title: 'Bienvenido a',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => openModalSupport()}
                    >
                    <View style={{flexDirection: 'row', alignItems:"center", marginRight:6, marginVertical:4}}>
                      <MaterialIcons
                        name="help-outline"
                        size={30}
                        color="red"
                        style={{marginRight: 10, marginLeft:10, elevation:5}}
                      />                      
                    </View>
                  </TouchableOpacity>
                ),
              }}
              component={Home}
            />
            <Stack.Screen
              name="CellValidation"
              options={{
                title: 'Validacion de Celular',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                  color: 'red',
                },
              }}
              component={CellValidation}
            />
            <Stack.Screen
              name="User"
              options={{
                title: 'Datos Personales',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={User}
            />
            <Stack.Screen
              name="UserWeb"
              options={{
                title: 'Datos Extra',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={UserWeb}
            />
            <Stack.Screen
              name="Direction"
              options={{
                title: 'Datos de Direccion',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={Direction}
            />
            <Stack.Screen
              name="DirectionMap"
              options={{
                title: 'Geolocalizacion',
                headerShown: true,
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {height: 50},
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={DirectionMap}
            />
            <Stack.Screen
              name="Validation"
              options={{
                title: 'Clave de Acceso',
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={Validation}
            />
            <Stack.Screen
              name="Revalidation"
              options={{
                title: 'Datos Personales',
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={Revalidation}
            />
            {/* </> 
             ) : (
               <> */}
            <Stack.Screen
              name="EntryValidation"
              options={{
                title: 'Clave de Acceso',
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={EntryValidation}
            />
            <Stack.Screen
              name="Verificacion"
              options={{
                title: 'Verificacion de Accesos',
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={Verificacion}
            />
            <Stack.Screen
              name="PasswordChange"
              options={{
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'white',
                  borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                  /*fontFamily: 'lm3',*/
                  fontSize: 15,
                },
              }}
              component={PasswordChange}
            />

            <Stack.Screen
              name='ChangePinSms'
              options={{
                headerShown: false,
              }}
              component={ChangePinSms}
            />

            <Stack.Screen
              name="MainApp"
              options={{
                headerShown: false,
              }}
              component={AppTabNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
