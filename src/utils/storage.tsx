import AsyncStorage from '@react-native-async-storage/async-storage'

export async function recuperarDatoJSON(clave) {
  try {
    var pp = null;
    pp = await AsyncStorage.getItem(clave);
    return JSON.parse(pp);
  } catch (error) {}
}

export async function guardarDatoJSON(clave, valor) {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {}
}

export async function eliminarDatoJSON(clave) {
  try {
    await AsyncStorage.removeItem(clave);
    return null;
  } catch (error) {}
}

//====================================================================

export async function guardarDato(clave, valor) {
  try {
    await AsyncStorage.setItem(clave, valor);
  } catch (error) {}
}

export async function recuperarDato(clave) {
  try {
    var pp = null;
    pp = await AsyncStorage.getItem(clave);
    return pp;
  } catch (error) {}
}