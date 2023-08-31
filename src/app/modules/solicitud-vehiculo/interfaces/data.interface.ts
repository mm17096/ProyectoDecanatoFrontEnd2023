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
}

interface ISolicitante {
  codigoUsuario: string;
  email: string;
  password: string;
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
  codigoCargo: string;
  nombreCargo: string;
  descripcion: string;
  estado: number;
}

interface IDepartamento {
  codigoDepto: string;
  nombre: string;
  estado: number;
}

interface IPasajero {
  codigoUsuario: string;
  nombre: string;
  apellido: string;
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
