import Api from "../lib/Api";
import { _host_base, apikeyrecargas, _host_sms_2 } from "../constans"
import { IRespuesta } from "../class/IRespuesta";

function buildParametersJSON(data) {
  var arrParamsJson = []
  for(var key in data) {
    var paramJson = {
      nom_parametro: key,
      valor_parametro: data[key]
    }
    arrParamsJson.push(paramJson)
  }
  return arrParamsJson
}

export function Post(procedure, params): Promise<IRespuesta> {
  let jsonData = {
    procedure: procedure,		
    parameters: buildParametersJSON(params)
  };
  console.log(buildParametersJSON(params));  
  return Api.post(_host_base,`/save`, jsonData, apikeyrecargas).then(resp => {
      return resp as Promise<IRespuesta>
  }).catch((error) => {
      throw new Error(error)
  })
}

export function Delete(procedure, params): Promise<IRespuesta> {
  let jsonData = {
    procedure: procedure,		
    parameters: buildParametersJSON(params)
  };
  console.log(jsonData);
  
  return Api.delete(_host_base,`/delete`, jsonData, apikeyrecargas).then(resp => {
      return resp as Promise<IRespuesta>
  }).catch((error) => {
      throw new Error(error)
  })
}

export function getLogin(numero, pin){
  // console.log(_host_base,`/login`,`/${numero}/${pin}`);  
  return Api.get(_host_base,`/login/${numero}/${pin}`, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getComision(params){
  let jsonData = {
    parameters: buildParametersJSON(params)
  };
  return Api.getpost(_host_base,`/getAll/CRL_MOVIMIENTOS_TxComisionMes`, jsonData ,apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getMovimientos(params){
  let jsonData = {
    parameters: buildParametersJSON(params)
  };
  return Api.getpost(_host_base,`/getAll/CRL_MOVIMIENTOS_TxId_Cliente`, jsonData ,apikeyrecargas).then(resp =>{
    
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getSaldos(params){
  let jsonData = {
    parameters: buildParametersJSON(params)
  };
  return Api.getpost(_host_base,`/getAll/USP_CRL_PRODUCTO_CLIENTE_SALDOS_TXPK`, jsonData ,apikeyrecargas).then(resp =>{
    
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getVendedor(params){
  let jsonData = {
    parameters: buildParametersJSON(params)
  };
  return Api.getpost(_host_base,`/getAll/USP_CRL_CLIENTES_TXPK`, jsonData ,apikeyrecargas).then(resp =>{    
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}


export function getDepartaments(){
  // console.log(_host_base,`/login`,`/${numero}/${pin}`);  
  return Api.get(_host_base,`/get/USP_PRI_DEPARTAMENTOS_TxDepartamentos`, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getProvince(cod){
  let jsonData = {
    parameters: buildParametersJSON(cod)
  };
  return Api.getpost(_host_base,`/getAll/USP_PRI_PROVINCIAS_TxProvincias`,jsonData, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getDistrict(codD){
  let jsonData = {
    parameters: buildParametersJSON(codD)
  };
  return Api.getpost(_host_base,`/getAll/USP_PRI_DISTRITOS_TxDistritos`,jsonData, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getRegistrado(cargador){
  let jsonData = {
    parameters: buildParametersJSON(cargador)
  };
  return Api.getpost(_host_base,`/getAll/USP_CRL_DATOS_CLIENTES_TxPIN`,jsonData, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getTraerxCargador(cargador){
  let jsonData = {
    parameters: buildParametersJSON(cargador)
  };
  return Api.getpost(_host_base,`/getAll/USP_CRL_DATOS_CLIENTES_TxCargador`,jsonData, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })

}


export function getDias(param){
  let jsonData = {
    parameters: buildParametersJSON(param)
  };
  return Api.getpost(_host_base,`/getAll/USP_CRL_CLIENTES_LOGIN_TDias`,jsonData, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

export function getDni(dni){
  return Api.get(`http://api.paleconsultores.com:3000`,`/reniec/?Token=399086&DNI=${dni}`, apikeyrecargas).then(resp =>{
    return resp 
  }).catch((error)=>{
    throw new Error(error);    
  })
}

// export function getTiposComercio(): Promise<ITipoComercio[]> {
//   return Api.get(_host_pidenos,`/get/USP_VIS_TIPO_COMERCIO_TT`, apikeypidenos).then(resp => {
//       return resp as Promise<ITipoComercio[]>
//   }).catch((error) => {
//     throw new Error(error)
//   })
// }

///revisar
// export function PostSms(params, pPIN_Telefono): Promise<IRespuesta> {
//   let isRelease = true
//   let hashCode = isRelease ? 'z2iaSbqrCSk' : 'GddOzeByom6'
//   params.Mensaje = `<#> su codigo de Pidenos es ${pPIN_Telefono}
//   ${hashCode}`;
  
//   let jsonData = params
//   return Api.post(_host_sms_2,`/smspidenos`, jsonData, apikeyrecargas).then(resp => {
//       return resp as Promise<IRespuesta>
//   }).catch((error) => {
//       throw new Error(error)
//   })
// }

// export function PostSmsMensaje(params): Promise<IRespuesta> {
//   let jsonData = params
//   return Api.post(_host_sms_2,`/smspidenos`, jsonData, apikeyrecargas).then(resp => {
//       return resp as Promise<IRespuesta>
//   }).catch((error) => {
//       throw new Error(error)
//   })
// }