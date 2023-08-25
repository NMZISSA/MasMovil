import { _host_sms, apikeysms, _host_sms_2 } from "../constans"
import Api from "../lib/Api";


export function enviarSms(pCelular, pPIN_Telefono) {
  let isRelease = true
  let hashCode = isRelease ? 'z2iaSbqrCSk' : 'GddOzeByom6'

  let jsonData = {
    "messages": [
      {
        "from": "Cobertura",
        "destinations": [
          {
            "to": "51"+pCelular
          }
        ],
        "text" : `PC-${pPIN_Telefono} es tu código de confirmación de Mas Movil`,
        "flash": false
      }
    ]
  }

  let jsonData2 = {
    "Token": '484848',
    "Celular": pCelular,
    "Mensaje": `PC-${pPIN_Telefono} es tu código de confirmación de Mas Movil`,
    "Cod_TipoSMS": "COD",
    "Cod_FuenteSMS": "CoberturaTotal",
    "Cod_Usuario": "APP"
  }

  return Api.post(_host_sms_2,`/smsCobertura`, jsonData2, apikeysms).then(resp => {
      return resp
  }).catch((error) => {
      throw new Error(error)
  })
}

export function enviarRecarga(pCelular, pMonto) {
  let isRelease = true
  let hashCode = isRelease ? 'z2iaSbqrCSk' : 'GddOzeByom6'

  let jsonData = {
    "messages": [
      {
        "from": "CoberturaTotal",
        "destinations": [
          {
            "to": pCelular
          }
        ],
        "text" : `Se realizo su recarga con exito de S/.  ${pMonto}.00
        `,
        "flash": false
      }
    ]
  }

  let jsonData2 = {
    "Token": '484848',
    "Celular": pCelular,
    "Mensaje": `Se realizo su recarga con exito de S/.  ${pMonto}.00`,
    "Cod_TipoSMS": "SMS",
    "Cod_FuenteSMS": "CoberturaTotal",
    "Cod_Usuario": "APP"
  }
  return Api.post(_host_sms_2,`/smsCobertura`, jsonData2, apikeysms).then(resp => {
      return resp
  }).catch((error) => {
      throw new Error(error)
  })
}

export function enviarRecaudacion(pCelular, pMonto, pFactura) {
  let isRelease = true
  let hashCode = isRelease ? 'z2iaSbqrCSk' : 'GddOzeByom6'

  let jsonData = {
    "messages": [
      {
        "from": "CoberturaTotal",
        "destinations": [
          {
            "to": "51"+pCelular
          }
        ],
        "text" : `Se realizo su recaudacion con exito de S/.  ${pMonto}.00 abonado a la ${pFactura}
        `,
        "flash": false
      }
    ]
  }

  let jsonData2 = {
    "Token": '484848',
    "Celular": pCelular,
    "Mensaje": `Se realizo su recaudacion con exito de S/.  ${pMonto}.00 abonado a la ${pFactura}`,
    "Cod_TipoSMS": "SMS",
    "Cod_FuenteSMS": "CoberturaTotal",
    "Cod_Usuario": "APP"
  }

  return Api.post(_host_sms_2,`/smsCobertura`, jsonData2, apikeysms).then(resp => {
      return resp
  }).catch((error) => {
      throw new Error(error)
  })
}