import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert,Dimensions,TouchableOpacity, Pressable } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { colors } from "../constans";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { guardarDatoJSON } from '../utils/storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const theme = {
    ...DefaultTheme,
    roundness: 10,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      secondary: colors.secondary,
      accent: "rgba(201,19,64,1)", //for the fab button 201 - 19 - 64 141 - 21 - 50
      background: colors.background,
      placeholder: "#00000080", // border color y placeholder
      button: "rgba(0, 115, 140, 55)",
      letras: "#666666",
      txt:colors.txt,
      href:colors.href,
    },
    fonts: {
      //medium: 'lm3',
      //regular: 'lm3',
      //light: 'lm3',
      //thin: 'lm3'
    },
  };

  export default function DirectionMap ({ route ,navigation }) {
    const [conti,setConti] = useState(true);


  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Ingrese Dirección'
  );
  const {userbd} = route.params

  const[lt,setLt]=useState(0)
  const[lg,setLg]=useState(0)

  const [origin,setOrigin] = useState({
    latitude: -13.52507145927508,
    longitude: -71.94903868559611
  })

  const mapRef =useRef(null);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  let { coords } = await Location.getCurrentPositionAsync();
 
  setOrigin(current)
  // setLg(coords.longitude)
  // setLt(coords.latitude)
  // if (coords) {
  //     const { latitude, longitude } = coords;
  //     let response = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude
  //     });
  // for (let item of response) {
  //       let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  // setDisplayCurrentAddress(address);
  //     }
  //   }
  };
 const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

   const [pin,setPin]=useState({ 
    latitude:-13.52507145927508,
    longitude:-71.94903868559611,})

   const [region,setRegion]=useState({ 
       latitude:lt,
       longitude:lg,
       latitudeDelta:0.05,
       longitudeDelta:0.05
    })


    async function envDatos(dat) {
      await guardarDatoJSON('MAP',dat);
    }

    const goDirect = () =>{
      mapRef.current.animateToRegion(region,1*1000);
    }

return (
    <View style={styles.container}>
        <View style={{flex:0,flexDirection:'row',borderWidth:0,}}>
              <GooglePlacesAutocomplete
                  placeholder={displayCurrentAddress}
                  fetchDetails={true} 
                  GooglePlacesSearchQuery={{
                      rankby:'distance'
                  }}
                  onPress={(data, details = null)=>{
                      console.log(data, details);
                      setRegion({
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng,
                          latitudeDelta:0.05,
                          longitudeDelta:0.05
                      })
                  }}
                  query={{
                      key:'AIzaSyAdl_M4J3rTcX_-P2bKp3boX6CiwJOGFyI',
                      language: 'es',
                      components:'country:pe',
                      type:'address',
                      radius:1000,
                      location: `${region.latitude}, ${region.longitude}`

                                      
                  }}
                  styles={{
                      container:{flex:0,position:'relative',width:'90%',zIndex:1,alignItems:'flex-start',justifyContent:'flex-start'},
                      listView:{backgroundColor:"white"}
                  }}
              >
              </GooglePlacesAutocomplete>
              <View style={{
                  alignItems:'flex-start',
                  }}>
                  <TouchableOpacity 
                      style={{
                        minWidth:'10%',
                        backgroundColor:'red',
                        height:49,
                        elevation:2,
                        paddingLeft:0,}}
                      onPress={()=>{goDirect()}}
                  >
                  <View
                      style={{
                      backgroundColor: "transparent",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      }}
                  >
                      <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>   Ir   </Text>
                  </View>
                  </TouchableOpacity>
              </View>
        </View>

        <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
                latitude:-13.52507145927508,
                longitude:-71.94903868559611,
                latitudeDelta:0.05,
                longitudeDelta:0.05
            }}
            provider="google"
        >
            {/* <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/> */}
            <Marker 
                coordinate={{latitude: region.latitude, longitude: region.longitude}}
                // coordinate={{
                //     latitude:-13.52507145927508,
                //     longitude:-71.94903868559611
                // }}
                draggable={true}
                onDragStart={(e)=>{
                    console.log(lt+' '+lg)
                    console.log("Drag start",e.nativeEvent.coordinate)
                }}
                onDragEnd={(e)=>{
                    setPin({
                        latitude:e.nativeEvent.coordinate.latitude,
                        longitude:e.nativeEvent.coordinate.longitude
                    })
                    console.log(pin)
                    setConti(false)
                }}
            >
                    <Callout>
                        <Text>Aquí</Text>
                    </Callout>
            </Marker>
            {/* <Circle
                center={pin}
                radius={1000}
                /> */}
        </MapView>
        <View style={{
            alignItems:"center",
            paddingTop: 3
            }}>
            <TouchableOpacity 
            style={[styles.btn,{ backgroundColor: !conti ? colors.button : '#C6C6C6'}]} 
            disabled={conti}
            onPress={()=>{envDatos(pin),navigation.navigate('UserWeb', {userbd:userbd})}}
            >
            <View
                style={{
                backgroundColor: "transparent",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Continuar</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 0,
    marginTop:0,
  },
  map:{
    width:WIDTH-10,
    height:'80%',//HEIGHT/1.5
    justifyContent:'flex-start'
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black'
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000'
  },
  btn: {
    borderRadius:5,
    minWidth:'89%',
    backgroundColor:'red',
    height:40,
    elevation:2,
    paddingLeft:15,
  },
});
