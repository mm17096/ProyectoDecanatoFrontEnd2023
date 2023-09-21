import { Vale } from "./Vale";

export interface IConsultaExcelTabla{
    tablaConsulta: ITablaConsulta[];
}

export interface ITablaConsulta{
    codigoVale?:number;
    entradasCant?:number;
    entradasPU?:number;
    entradasTotal?:number;
    solidasCant?:number;
    salidasPU?:number;
    salidadTotal?:number;
    ExistCant?:number;
    ExistPU?:number;
    ExistTotal?:number;
    fecha?:Date;
    estado?:number;
    fechacompra?:Date;
    precio?:number;
    cantidad?:number;
    idcompra:string;
}

export interface IConsultaExcelTablaC{
    tablaConsultaC: ITablaConsultaC[];
}

export interface ITablaConsultaC{
    id:string;
    cantidad:number;
    cod_inicio:number;
    cod_fin:number;
    fecha_compra:Date;
    fecha_vencimiento:Date;
    precio_unitario:number;
}

export interface IConsultaExcelTablaDto{
    tablaConsultaConsulta: ITablaConsultaDto[];
}

export interface ITablaConsultaDto{
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
    idasignacionvale:String;
    valeid:String;
}

export interface IConsultaExcelTablaCompraDto{
    tablaConsultaCompra: ITablaConsultaCompraDto[];
}

export interface ITablaConsultaCompraDto{
    cantidad:number;
    codigofin:number;
    fechacompra:Date;
    codigocompra:String;
    preciounitario:number;
    codigoinicio:number;
    fechavencimientovale:Date;
}