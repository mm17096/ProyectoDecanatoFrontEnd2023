export interface IAsignacionVale {
  estadoAsignacion: number;
  fechaAsignacion: string;
  solicitudVale: string;
  cantidadVales: number;
}

export interface IValesAsignar {
  idVale: string;
  codigoVale: number;
  correlativoVale: number;
}

export interface ICodigoAsignacion{
  codigoAsignacion:string;
}
