

export interface SolicitudVale{
    idSolicitudVale: string,
    cantidadVale?: number,
    estadoEntrada: string,
    solicitudVehiculo: SolicitudVehiculo,

}

export interface SolicitudVehiculo{
    codigoSolicitudVehiculo: string,
    fechaSolicitud:string,
    fechaSalida: string,
    unidadSolicitante: string,
    vehiculo: Vehiculo,
    objetivoMision: string,
    lugarMision: string,
    direccion: string,
    horaEntrada: string,
    horaSalida: string,
    cantidadPersonas:number,
    listaPasajeros: string,
    usuario:null,
    jefeDepto: null
    fechaEntrada: string,
    estado: number,
    estadoString: string,
    motorista: Motorista,
    listDocumentos: string,
    horasValidas: boolean

}

export interface Vehiculo{
    codigoVehiculo: string,
    placa:string,
    modelo: string,
    marca: string,
    clase: string,
    color: string,
    year: string,
    fecha_tarjeta: string,
    capacidad: string,
    capacidadTanque: string,
    estado?: number,
    n_chasis: string,
    n_motor: string,
    tipo_gas: string,
    nombrefoto?: string,
    urlfoto: string

}

export interface Motorista{
    codigoEmpleado: String,
    dui: string,
    nombre: string,
    apellido: string,
    telefono: string,
    licencia: string,
    tipolicencia: string,
    fechalicencia: string,
    estado: number,
    jefe: boolean,
    correo: string,
    nombrefoto: string,
    urlfoto: string,
    cargo: Cargo,
    departamento: Departamento,

}

export interface Cargo{
    id: string,
    nombreCargo: string,
    descripcion: string,
    estado: string
}

export interface Departamento{
    codigoDepto: string,
    nombre: string,
    descripcion: string,
    tipo: string,
    estado: string
}