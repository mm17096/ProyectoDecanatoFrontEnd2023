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
     departamento: IDepto
}

export interface ICargo {
    id: number,
    nombreCargo: string,
    descripcion: string,
    estado: number
}

export interface IDepto {
    codigoDepto ?: string;
    nombre :      string;
    descripcion : string;
    tipo :        string;
    estado :      number;
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