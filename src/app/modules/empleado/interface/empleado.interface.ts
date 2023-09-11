import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;
export interface IEmpleado {
     codigoEmpleado: string,
     dui: string,
     nombre: string,
     apellido: string,
     telefono: string,
     licencia: string,
     tipolicencia: string,
     fechalicencia: Date,
     estado: number,
     jefe: boolean,
     correo: string,
     nombrefoto: string,
     urlfoto: string,
     cargo: ICargo,
     departamento: IDepartamento
}

export interface ICargo {
    codigoCargo: number,
    nombreCargo: string,
    descripcion: string,
    estado: number
}

export interface IDepartamento {
    codigoDepto: number,
    nombre: string,
    estado: number
}

export interface IEmpleadoTabala {
    dui: string,
    nombre: string,
    apellido: string,
    telefono: string,
    licencia: string,
    tipolicencia: string,
    fechalicencia: Date,
    estado: string,
    jefeB: boolean,
    jefe: string,
    correo: string,
    nombrefoto: string,
    urlfoto: string,
    idcargo: number,
    cargo: string,
    idepartamento: number,
    departamento: string
}