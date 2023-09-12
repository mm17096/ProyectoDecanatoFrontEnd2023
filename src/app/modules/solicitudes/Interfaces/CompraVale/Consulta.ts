import { Vale } from "./Vale";

export interface Consulta{
    idDetalleAsignacionVale:string;
    valeId:string;
    fechaAsignacion:Date;
    estadoAsignacion:number;
    cantidad:number;
    estadoSolicitud:number;
    vale:Vale[];
    idAsignacionVale:string;
}
