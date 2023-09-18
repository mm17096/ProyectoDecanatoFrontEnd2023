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