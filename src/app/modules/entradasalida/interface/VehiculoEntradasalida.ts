
export interface IsolicitudVehiculo{
    codigoSolicitudVehiculo: number;
    fechaSolicitud:string,
    fechaSalida?: string,
    unidadSolicitante: string,
    vehiculo: IVehiculoentradaSalida,
    objetivoMision: string,
    lugarMision: string,
    direccion: string,
    horaEntrada: string,
    horaSalida: string,
    cantidadPersonas:number,
    listaPasajeros: string,
    solicitante:ISolicitante,
    JefeDepto: string,//modificado
    fechaEntrada: string,
    estado: number,
    //estadoString: string,
    motorista: IMotorista,
    listDocumentos: string,
    horasValidas: boolean
}

export interface IVehiculoentradaSalida{
    codigoVehiculo: string;
    placa:string;
    modelo: string;
    marca: string;
    clase: string;
    color: string;
    year: string;
    fecha_tarjeta: string;
    capacidad: string;
    capacidadTanque: string;
    estado?: number;
    n_chasis: string;
    n_motor: string;
    tipo_gas: string;
    nombrefoto?: string;
    urlfoto: string;
}
export interface ISolicitante{
    codigoUsuario: string,
    nombre: string,
    clave: string,
    nuevo: number,
    token: string, //agregado
    empleado: string
}
export interface IMotorista{
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
    cargo: string,
    departamento: string,
}