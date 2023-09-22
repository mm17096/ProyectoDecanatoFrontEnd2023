import {IVehiculos} from "../../vehiculo/interfaces/vehiculo-interface";

export interface ISolicitudVehiculo {
  codigoSolicitudVehiculo: string;
  fechaSolicitud: Date;
  fechaSalida: Date;
  unidadSolicitante: string;
  vehiculo: IVehiculos;
  objetivoMision: string;
  lugarMision: string;
  direccion: string;
  horaEntrada: Date;
  horaSalida: Date;
  cantidadPersonas: number;
  listaPasajeros: IPasajero[];
  solicitante:ISolicitante;
  nombreJefeDepto: string;
  fechaEntrada: Date;
  estado: number;
  estadoString: string;
  motorista: IMotorista;
  listDocumentos: IDocumento[];
  observaciones:string;
}

interface ISolicitante {
  codigoUsuario: string;
  clave: string;
  nombre: string;
  nuevo: boolean;
  empleado: IEmpleado;
}

interface IEmpleado {
  codigoEmpleado: string;
  dui: string;
  nombre: string;
  apellido: string;
  telefono: string;
  licencia: string;
  tipo_licencia: string;
  fecha_licencia: Date;
  estado: number;
  jefe: boolean;
  correo: string;
  nombrefoto: string;
  urlfoto: string;
  cargo: ICargo;
  departamento: IDepartamento;
}


interface ICargo {
  id: string;
  nombreCargo: string;
  descripcion: string;
  estado: number;
}

interface IDepartamento {
  codigoDepto: string;
  nombre: string;
  estado: number;
}

export interface IPasajero {
  id: string;
  nombrePasajero: string;
}

interface IMotorista {
  codigoEmpleado: string;
  dui: string;
  nombre: string;
  apellido: string;
  telefono: string;
  licencia: string;
  tipo_licencia: string;
  fecha_licencia: Date;
  estado: number;
  jefe: boolean;
  correo: string;
  nombrefoto: string;
  urlfoto: string;
  cargo: ICargo;
  departamento: IDepartamento;
}

interface IDocumento {
  codigoDocumento: string;
  nombre: string;
  descripcion: string;
  archivo: string;
  estado: number;
}

export interface IEstados {
  codigoEstado: number,
  nombreEstado: string
}

export interface IPais {
  codigo: string;
  nam: string;
  na2: string;
}
