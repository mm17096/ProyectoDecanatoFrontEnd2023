
export interface IEntradaSalida{
    id:string,
    fecha: string,
    hora:string,
    combustible:string,
    kilometraje:string,
    estado?: number,
    solicitudvehiculo: IsolicitudVehiculo
}
export interface IsolicitudVehiculo{
    codigoSolicitudVehiculo: number;
    fechaSolicitud:string,
    fechaSalida: string,
    unidadSolicitante: string,
    vehiculo: IVehiculo,
    objetivoMision: string,
    lugarMision: string,
    direccion: string,
    horaEntrada: string,
    horaSalida: string,
    cantidadPersonas:number,
    listaPasajeros: string,
    solicitante:ISolicitante,
    nombreJefeDepto: string
    fechaEntrada: string,
    estado: number,
    estadoString: string,
    motorista: IMotorista,
    listDocumentos: string,
    horasValidas: boolean

}
export interface IVehiculo{
    codigoVehiculo: string,
    placa: string,
    modelo: string,
    marca: string,
    clase: string,
    color: string,
    year: number,
    fecha_tarjeta: string,
    capacidad: string,
    capacidadTanque: string,
    estado: number,
    n_chasis: string,
    n_motor: string,
    tipo_gas: string,
    nombrefoto: string,
    urlfoto: string
}

export interface ISolicitante{
    codigoUsuario: string,
    nombre: string,
    clave: string,
    nuevo: number,
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

export class EntradaSalidaI {
    constructor(
        public tipo: string,
        public fecha: string,
        public hora:string,
        public combustible:string,
        public kilometraje:string,
        public estado?: number,
        public solicitudvehiculo?: IsolicitudVehiculo

){}
  }