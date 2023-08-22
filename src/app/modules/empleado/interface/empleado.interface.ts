export interface IEmpleado {
    dui: string,
    nombre: string,
    apellido: string,
    telefono: string,
    licencia: string,
    tipo_licencia: string,
    fecha_licencia: Date,
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
    tipo_licencia: string,
    fecha_licencia: Date,
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