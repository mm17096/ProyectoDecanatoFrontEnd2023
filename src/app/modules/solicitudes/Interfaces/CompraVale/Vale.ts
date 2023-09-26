import { Compra } from "./Compra";


export interface Vale{
    id:string;
    codigoVale:number;
    estado:number;
    valor:number;
    compra:Compra[];
    correlativo:number;
}
