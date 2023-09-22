export interface ISolicitudValeAprobar {
  codigoEmpleado: string;
  cantidadVales: number;
  fechaSolicitud: string;
  fechaSalida: string;
  fechaEntrada: string;
  cantidadPersonas: number;
  unidadSolicitante: string;
  estadoSolicitudVehiculo: number;
  mision: string;
  estadoSolicitud: number;
  direccionMision: string;
  nombreMotorista: string;
  correoEmpleado: string;
  modeloVehiculo: string;
  placaVehiculo: string;
  codigoSolicitudVale: string;
  estadoEntradaSolicitudVale: number;
  nombreSolicitante: string;
  observacionesSolicitudVale: string;
  codigoSolicitudVehiculoS: string;
}

export interface ISolcitudAprobar {
  codigoSolicitudVale: string;
  cantidadVales: number;
  estadoSolicitudVale: number;
  observaciones: string;
}
