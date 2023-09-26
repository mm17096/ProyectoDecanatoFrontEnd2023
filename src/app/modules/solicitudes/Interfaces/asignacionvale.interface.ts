export interface IAsignacionVale {
  estadoAsignacion: number;
  fechaAsignacion: string;
  solicitudVale: string;
  cantidadVales: number;
}

export interface IValesAsignar {
  idVale: string;
  correlativoVale: number;
  valorVale: number;
}

export interface ICodigoAsignacion{
  codigoAsignacion:string;
}
