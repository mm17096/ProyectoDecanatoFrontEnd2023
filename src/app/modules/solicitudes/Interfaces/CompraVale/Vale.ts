import { Compra } from "./Compra";


export interface Vale{
    id:string;
    estado:number;
    valor:number;
    compra:Compra;
    fecha_vencimiento:Date;
    correlativo:number;
}
