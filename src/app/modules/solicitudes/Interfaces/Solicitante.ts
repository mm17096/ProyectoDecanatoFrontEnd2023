import { Empleado } from "./Empleado";

export interface Solicitante{
    codigoUsuario?:number;
    email?:string;
    password?:string;
    empleado?:Empleado;
}
