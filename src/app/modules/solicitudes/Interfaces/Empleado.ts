import { Cargo } from "./Cargo";
import { Departamento } from "./Departamento";

export interface Empleado{
    codigoEmpleado?:string;
    dui?:string;
    nombre?:string;
    apellido?:string;
    telefono?:string;
    licencia?:string;
    tipo_licencia?:string;
    fecha_licencia?: Date;
    estado?: number;
    jefe?: boolean;
    correo?: string;
    nombrefoto?: string;
    urlfoto?: string;
    cargo?: Cargo;
    departamento?: Departamento;
}
