import { Empleado } from "../../solicitudes/Interfaces/Empleado";
import { Solicitante } from "../../solicitudes/Interfaces/Solicitante";
import { Vehiculo } from "../../solicitudes/Interfaces/Vehiculo";




export interface SolicitudVv{
    codigoSolicitudVehiculo?:string;
    fechaSolicitud?:Date;
    fechaSalida?:Date;
    unidadSolicitante?:string;
    vehiculo?:Vehiculo;
    objetivoMision?: string;
    lugarMision?: string;
    direccion?: string;
    horaEntrada?: string;
    horaSalida?: string;
    cantidadPersonas?: number;
    solicitante?: Solicitante;
    nombreJefeDepto?: string;
    fechaEntrada?: Date;
    estado?: number;
    estadoString?: string;
    motorista?: Empleado;
}
