import { Proveedor } from "./Proveedor";

export interface Compra{
    id:string;
    factura:string;
    proveedor:Proveedor;
    descripcion:string;
    cantidad:number;
    cod_inicio:number;
    cod_fin:number;
    fecha_compra:Date;
    fecha_vencimiento:Date;
    precio_unitario:number;
}
