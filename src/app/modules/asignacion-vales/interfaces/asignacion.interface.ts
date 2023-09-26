import { SolicitudVale } from "../interface/IsolicitudvaleDocument";

export interface IAsignacionDetalle {
  idAsignacionVale: string;
  fechaAsignacion: string;
  mision: string;
  vales: [
    {
      idVale: string;
      correlativo: number;
    }
  ];
}

export interface IAsignacionValeSolicitud{
  codigoAsignacion:string;
  solicitudVale:SolicitudVale;
}
export interface IValesADevolver {
  valesDevueltos:string [];
  estadoVales: number;
}

export interface ILiquidacion{
  idAsignacionVale: string;
  valesLiquidar:string [];
}

export interface IAnularMision{
  cosdigoAsignacion: string;
  valesAsignacion: string [];
}
