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

export interface CompraDto{
    cantidad:number;
    codigofin:number;
    fechacompra:Date;
    codigocompra:String;
    preciounitario:number;
    codigoinicio:number;
    fechavencimientovale:Date;
}

export interface ConsultaDto{
    valor:number;
    fecha:Date;
    correlativo:number;
    estadosv:number;
    estadoentrada:number;
    estadoav:number;
    cantidadvale:number;
    estadovale:number;
    fechavencimiento:Date;
    iddetalleasignacionvale:String;
}