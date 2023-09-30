import { Proveedor } from "./Proveedor";

export interface Compra{
    id:string;
    factura:string;
    proveedor:Proveedor;
    descripcion:string;
    cantidad:number;
    codInicio:number;
    codFin:number;
    fechaCompra:Date;
    fechaVencimiento:Date;
    precioUnitario:number;
}
