export interface ISolicitudVehiculo {
  codigoSolicitudVehiculo: number,
  fechaSolicitud: string,
  fechaSalida: string,
  unidadSolicitante: any,
  vehiculo: Vehiculo,
  objetivoMision: string,
  lugarMision: string,
  direccion: string,
  horaEntrada: string,
  horaSalida: string,
  cantidadPersonas: number,
  listaPasajeros: any[],
  usuario: Usuario,
  jefeDepto: any,
  fechaEntrada: string,
  estado: number,
  motorista: Empleado,
  listDocumentos: any[],
}

export interface Vehiculo {
  codigoVehiculo: number
  modelo: string
  marca: string
  clase: string
  color: string
  year: string
  capacidad: string
  estado: string
  tipo: string
  foto: any
  n_chasis: string
  n_motor: string
}

export interface Usuario {
  codigoUsuario: number
  email: any
  password: string
  empleado: Empleado
}

export interface Empleado {
  dui: string
  nombre: string
  apellido: string
  telefono: string
  licencia: any
  tipolicencia: any
  fechalicencia: any
  estado: any
  jefe: boolean
  correo: string
  nombrefoto: any
  urlfoto: any
  cargo: Cargo
  departamento: Departamento
}

export interface Cargo {
  codigoCargo: number
  nombreCargo: string
  descripcion: string
  estado: number
}

export interface Departamento {
  codigoDepto: number
  nombre: string
  estado: number
}
