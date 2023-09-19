import { SolicitudVale } from "./SolicitudVale";
import { Vale } from "./Vale";

export interface Consulta{
    idDetalleAsignacionVale:string;
    asignacionVale:string;
    valeid:String;
    vale:Vale;
    estado:number;
    fecha:Date;
    solicitudVale:SolicitudVale;
}
