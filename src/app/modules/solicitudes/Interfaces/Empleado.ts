import { Cargo } from "./Cargo";
import { Departamento } from "./Departamento";

export interface Empleado{
    dui?:string;
    nombre?:string;
    apellido?:string;
    telefono?:string;
    licencia?:string;
    tipolicencia?:string;
    fechalicencia?: Date;
    estado?: number;
    jefe?: boolean;
    correo?: string;
    nombrefoto?: string;
    urlfoto?: string;
    cargo?: Cargo;
    departamento?: Departamento;
}

